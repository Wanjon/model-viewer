import { Object3D, Scene, WebGLRenderer } from 'three';
import { ModelScene } from './ModelScene.js';
export type Side = 'back' | 'bottom';
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
export declare class Shadow extends Object3D {
    private camera;
    private renderTarget;
    private renderTargetBlur;
    private depthMaterial;
    private horizontalBlurMaterial;
    private verticalBlurMaterial;
    private intensity;
    private softness;
    private floor;
    private blurPlane;
    private boundingBox;
    private size;
    private maxDimension;
    private isAnimated;
    needsUpdate: boolean;
    constructor(scene: ModelScene, softness: number, side: Side);
    setScene(scene: ModelScene, softness: number, side: Side): void;
    setSoftness(softness: number): void;
    setMapSize(maxMapSize: number): void;
    setIntensity(intensity: number): void;
    getIntensity(): number;
    setOffset(offset: number): void;
    gap(): number;
    render(renderer: WebGLRenderer, scene: Scene): void;
    blurShadow(renderer: WebGLRenderer): void;
    dispose(): void;
}
