/* @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BackSide, Color, DoubleSide, Box3, Mesh, MeshBasicMaterial, NoToneMapping, Object3D, OrthographicCamera, PlaneGeometry, RGBAFormat, ShaderMaterial, Vector3, WebGLRenderTarget } from 'three';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { lerp } from 'three/src/math/MathUtils.js';
// The softness [0, 1] of the shadow is mapped to a resolution between
// 2^LOG_MAX_RESOLUTION and 2^LOG_MIN_RESOLUTION.
const LOG_MAX_RESOLUTION = 9;
const LOG_MIN_RESOLUTION = 6;
// Animated models are not in general contained in their bounding box, as this
// is calculated only for their resting pose. We create a cubic shadow volume
// for animated models sized to their largest bounding box dimension multiplied
// by this scale factor.
const ANIMATION_SCALING = 2;
// Since hard shadows are not lightened by blurring and depth, set a lower
// default intensity to make them more perceptually similar to the intensity of
// the soft shadows.
const DEFAULT_HARD_INTENSITY = 0.3;
/**
 * The Shadow class creates a shadow that fits a given scene and follows a
 * target. This shadow will follow the scene without any updates needed so long
 * as the shadow and scene are both parented to the same object (call it the
 * scene) and this scene is passed as the target parameter to the shadow's
 * constructor. We also must constrain the scene to motion within the horizontal
 * plane and call the setRotation() method whenever the scene's Y-axis rotation
 * changes. For motion outside of the horizontal plane, this.needsUpdate must be
 * set to true.
 *
 * The softness of the shadow is controlled by changing its resolution, making
 * softer shadows faster, but less precise.
 */
export class Shadow extends Object3D {
    constructor(scene, softness, side) {
        super();
        this.camera = new OrthographicCamera();
        this.renderTarget = null;
        this.renderTargetBlur = null;
        this.horizontalBlurMaterial = new ShaderMaterial(HorizontalBlurShader);
        this.verticalBlurMaterial = new ShaderMaterial(VerticalBlurShader);
        this.intensity = 0;
        this.softness = 1;
        this.boundingBox = new Box3;
        this.size = new Vector3;
        this.maxDimension = 0;
        this.isAnimated = false;
        this.needsUpdate = false;
        const { camera } = this;
        camera.rotation.x = Math.PI / 2;
        camera.left = -0.5;
        camera.right = 0.5;
        camera.bottom = -0.5;
        camera.top = 0.5;
        this.add(camera);
        const plane = new PlaneGeometry();
        const shadowMaterial = new MeshBasicMaterial({
            opacity: 1,
            transparent: true,
            side: BackSide,
        });
        this.floor = new Mesh(plane, shadowMaterial);
        this.floor.userData.noHit = true;
        camera.add(this.floor);
        this.blurPlane = new Mesh(plane);
        this.blurPlane.visible = false;
        camera.add(this.blurPlane);
        scene.target.add(this);
        this.depthMaterial = new MeshBasicMaterial({
            color: 0x000000,
            side: DoubleSide,
        });
        this.horizontalBlurMaterial.depthTest = false;
        this.verticalBlurMaterial.depthTest = false;
        this.setScene(scene, softness, side);
    }
    setScene(scene, softness, side) {
        const { boundingBox, size, rotation, position } = this;
        this.isAnimated = scene.animationNames.length > 0;
        this.boundingBox.copy(scene.boundingBox);
        this.size.copy(scene.size);
        this.maxDimension = Math.max(size.x, size.y, size.z) *
            (this.isAnimated ? ANIMATION_SCALING : 1);
        this.boundingBox.getCenter(position);
        if (side === 'back') {
            const { min, max } = boundingBox;
            [min.y, min.z] = [min.z, min.y];
            [max.y, max.z] = [max.z, max.y];
            [size.y, size.z] = [size.z, size.y];
            rotation.x = Math.PI / 2;
            rotation.y = Math.PI;
        }
        else {
            rotation.x = 0;
            rotation.y = 0;
        }
        if (this.isAnimated) {
            const minY = boundingBox.min.y;
            const maxY = boundingBox.max.y;
            size.y = this.maxDimension;
            boundingBox.expandByVector(size.subScalar(this.maxDimension).multiplyScalar(-0.5));
            boundingBox.min.y = minY;
            boundingBox.max.y = maxY;
            size.set(this.maxDimension, maxY - minY, this.maxDimension);
        }
        if (side === 'bottom') {
            position.y = boundingBox.min.y;
        }
        else {
            position.z = boundingBox.min.y;
        }
        this.setSoftness(softness);
    }
    setSoftness(softness) {
        this.softness = softness;
        const { size, camera } = this;
        const scaleY = (this.isAnimated ? ANIMATION_SCALING : 1);
        const resolution = scaleY *
            Math.pow(2, LOG_MAX_RESOLUTION -
                softness * (LOG_MAX_RESOLUTION - LOG_MIN_RESOLUTION));
        this.setMapSize(resolution);
        const softFar = size.y / 2;
        const hardFar = size.y * scaleY;
        camera.near = 0;
        camera.far = lerp(hardFar, softFar, softness);
        camera.updateProjectionMatrix();
        this.setIntensity(this.intensity);
        this.setOffset(0);
    }
    setMapSize(maxMapSize) {
        const { size } = this;
        if (this.isAnimated) {
            maxMapSize *= ANIMATION_SCALING;
        }
        const baseWidth = Math.floor(size.x > size.z ? maxMapSize : maxMapSize * size.x / size.z);
        const baseHeight = Math.floor(size.x > size.z ? maxMapSize * size.z / size.x : maxMapSize);
        const TAP_WIDTH = 10;
        const width = TAP_WIDTH + baseWidth;
        const height = TAP_WIDTH + baseHeight;
        if (this.renderTarget != null &&
            (this.renderTarget.width !== width ||
                this.renderTarget.height !== height)) {
            this.renderTarget.dispose();
            this.renderTarget = null;
            this.renderTargetBlur.dispose();
            this.renderTargetBlur = null;
        }
        if (this.renderTarget == null) {
            const params = { format: RGBAFormat };
            this.renderTarget = new WebGLRenderTarget(width, height, params);
            this.renderTargetBlur = new WebGLRenderTarget(width, height, params);
            this.floor.material.map =
                this.renderTarget.texture;
        }
        this.camera.scale.set(size.x * (1 + TAP_WIDTH / baseWidth), size.z * (1 + TAP_WIDTH / baseHeight), 1);
        this.needsUpdate = true;
    }
    setIntensity(intensity) {
        this.intensity = intensity;
        if (intensity > 0) {
            this.visible = true;
            this.floor.visible = true;
            this.floor.material.opacity = intensity *
                lerp(DEFAULT_HARD_INTENSITY, 1, this.softness * this.softness);
        }
        else {
            this.visible = false;
            this.floor.visible = false;
        }
    }
    getIntensity() {
        return this.intensity;
    }
    setOffset(offset) {
        this.floor.position.z = -offset + this.gap();
    }
    gap() {
        return 0.001 * this.maxDimension;
    }
    render(renderer, scene) {
        const initialClearColor = new Color();
        renderer.getClearColor(initialClearColor);
        const initialClearAlpha = renderer.getClearAlpha();
        const initialAutoClear = renderer.autoClear;
        const initialBackground = scene.background;
        const initialEnvironment = scene.environment;
        const initialToneMapping = renderer.toneMapping;
        const xrEnabled = renderer.xr.enabled;
        const oldRenderTarget = renderer.getRenderTarget();
        scene.overrideMaterial = this.depthMaterial;
        this.floor.visible = false;
        scene.background = null;
        scene.environment = null;
        renderer.toneMapping = NoToneMapping;
        renderer.xr.enabled = false;
        // Hide all meshes marked with userData.noHit (GroundedSkybox, hotspots, etc.)
        // to prevent them from appearing in the shadow map as solid rectangles
        const noHitMeshes = [];
        scene.traverse((object) => {
            if (object.userData.noHit) {
                noHitMeshes.push({ mesh: object, visible: object.visible });
                object.visible = false;
            }
        });
        renderer.autoClear = false;
        const gl = renderer.getContext();
        gl.colorMask(true, true, true, true);
        gl.depthMask(true);
        renderer.setClearColor(0x000000, 0);
        renderer.setRenderTarget(this.renderTarget);
        renderer.clear();
        renderer.render(scene, this.camera);
        // Restore visibility of noHit meshes
        for (const { mesh, visible } of noHitMeshes) {
            mesh.visible = visible;
        }
        scene.overrideMaterial = null;
        this.floor.visible = true;
        this.blurShadow(renderer);
        renderer.xr.enabled = xrEnabled;
        renderer.setRenderTarget(oldRenderTarget);
        renderer.setClearColor(initialClearColor, initialClearAlpha);
        renderer.autoClear = initialAutoClear;
        scene.background = initialBackground;
        scene.environment = initialEnvironment;
        renderer.toneMapping = initialToneMapping;
    }
    blurShadow(renderer) {
        const { camera, horizontalBlurMaterial, verticalBlurMaterial, renderTarget, renderTargetBlur, blurPlane } = this;
        blurPlane.visible = true;
        blurPlane.material = horizontalBlurMaterial;
        horizontalBlurMaterial.uniforms.h.value = 1 / this.renderTarget.width;
        horizontalBlurMaterial.uniforms.tDiffuse.value = this.renderTarget.texture;
        renderer.setRenderTarget(renderTargetBlur);
        renderer.getContext().colorMask(true, true, true, true);
        renderer.clear();
        renderer.render(blurPlane, camera);
        blurPlane.material = verticalBlurMaterial;
        verticalBlurMaterial.uniforms.v.value = 1 / this.renderTarget.height;
        verticalBlurMaterial.uniforms.tDiffuse.value =
            this.renderTargetBlur.texture;
        renderer.setRenderTarget(renderTarget);
        renderer.getContext().colorMask(true, true, true, true);
        renderer.clear();
        renderer.render(blurPlane, camera);
        blurPlane.visible = false;
    }
    dispose() {
        if (this.renderTarget != null) {
            this.renderTarget.dispose();
        }
        if (this.renderTargetBlur != null) {
            this.renderTargetBlur.dispose();
        }
        this.depthMaterial.dispose();
        this.horizontalBlurMaterial.dispose();
        this.verticalBlurMaterial.dispose();
        this.floor.material.dispose();
        this.floor.geometry.dispose();
        this.blurPlane.geometry.dispose();
        this.removeFromParent();
    }
}
//# sourceMappingURL=Shadow.js.map