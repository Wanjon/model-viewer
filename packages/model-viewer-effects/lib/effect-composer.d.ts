import { ModelViewerElement } from '@google/model-viewer';
import { ModelScene } from '@google/model-viewer/lib/three-components/ModelScene.js';
import { ReactiveElement } from 'lit';
import { EffectComposer as PPEffectComposer, EffectPass, NormalPass, Pass, RenderPass, Selection } from 'postprocessing';
import { Camera, ToneMapping, WebGLRenderer } from 'three';
import { IMVEffect, IntegrationOptions } from './effects/mixins/effect-base.js';
export declare const $scene: unique symbol;
export declare const $composer: unique symbol;
export declare const $modelViewerElement: unique symbol;
export declare const $effectComposer: unique symbol;
export declare const $renderPass: unique symbol;
export declare const $normalPass: unique symbol;
export declare const $effectPasses: unique symbol;
export declare const $requires: unique symbol;
export declare const $effects: unique symbol;
export declare const $selection: unique symbol;
export declare const $onSceneLoad: unique symbol;
export declare const $resetEffectPasses: unique symbol;
export declare const $userEffectCount: unique symbol;
export declare const $tonemapping: unique symbol;
declare const $updateProperties: unique symbol;
/**
 * Light wrapper around {@link EffectComposer} for storing the `scene` and
 * `camera at a top level, and setting them for every {@link Pass} added.
 */
export declare class EffectComposer extends PPEffectComposer {
    camera?: Camera;
    scene?: ModelScene;
    dirtyRender?: boolean;
    [$tonemapping]: ToneMapping;
    constructor(renderer?: WebGLRenderer, options?: {
        depthBuffer?: boolean;
        stencilBuffer?: boolean;
        alpha?: boolean;
        multisampling?: number;
        frameBufferType?: number;
    });
    private preRender;
    private postRender;
    render(deltaTime?: number | undefined): void;
    /**
     * Adds a pass, optionally at a specific index.
     * Additionally sets `scene` and `camera`.
     * @param pass A new pass.
     * @param index An index at which the pass should be inserted.
     */
    addPass(pass: Pass, index?: number): void;
    setMainCamera(camera: Camera): void;
    setMainScene(scene: ModelScene): void;
    /**
     * Effect Materials that use the camera need to be manually updated whenever
     * the camera settings update.
     */
    refresh(): void;
    beforeRender(_time: DOMHighResTimeStamp, _delta: DOMHighResTimeStamp): void;
}
export type MVPass = Pass & IntegrationOptions;
export declare const RENDER_MODES: readonly ["performance", "quality"];
export type RenderMode = typeof RENDER_MODES[number];
export declare class MVEffectComposer extends ReactiveElement {
    static get is(): string;
    /**
     * `quality` | `performance`. Changing this after the element was constructed
     * has no effect.
     *
     * Using `quality` improves banding on certain effects, at a memory cost. Use
     * in HDR scenarios.
     *
     * `performance` should be sufficient for most use-cases.
     * @default 'performance'
     */
    renderMode: RenderMode;
    /**
     * Anti-Aliasing using the MSAA algorithm. Doesn't work well with depth-based
     * effects.
     *
     * Recommended to use with a factor of 2.
     * @default 0
     */
    msaa: number;
    protected [$composer]?: EffectComposer;
    protected [$modelViewerElement]?: ModelViewerElement;
    protected [$renderPass]: RenderPass;
    protected [$normalPass]: NormalPass;
    protected [$selection]: Selection;
    protected [$userEffectCount]: number;
    get [$effectComposer](): EffectComposer;
    /**
     * Array of custom {@link MVPass}'s added with {@link addPass}.
     */
    get userPasses(): MVPass[];
    get modelViewerElement(): import("@google/model-viewer/lib/features/annotation.js").AnnotationInterface & import("@google/model-viewer/lib/features/scene-graph.js").SceneGraphInterface & import("@google/model-viewer/lib/features/staging.js").StagingInterface & import("@google/model-viewer/lib/features/environment.js").EnvironmentInterface & import("@google/model-viewer/lib/features/controls.js").ControlsInterface & import("@google/model-viewer/lib/features/ar.js").ARInterface & import("@google/model-viewer/lib/features/loading.js").LoadingInterface & import("@google/model-viewer/lib/features/animation.js").AnimationInterface & import("@google/model-viewer/lib/model-viewer-base.js").default;
    /**
     * The Texture buffer of the inbuilt {@link NormalPass}.
     */
    get normalBuffer(): import("three").Texture<unknown>;
    /**
     * A selection of all {@link Mesh}'s in the ModelScene.
     */
    get selection(): Selection;
    /**
     * Creates a new MVEffectComposer element.
     *
     * @warning The EffectComposer instance is created only on connection with the
     * DOM, so that the renderMode is properly taken into account. Do not interact
     * with this class if it is not mounted to the DOM.
     */
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    /**
     * Adds a custom Pass that extends the {@link Pass} class.
     * All passes added through this method will be prepended before all other
     * web-component effects.
     *
     * This method automatically sets the `mainScene` and `mainCamera` of the
     * pass.
     * @param {Pass} pass Custom Pass to add. The camera and scene are set
     *     automatically.
     * @param {boolean} requireNormals Whether any effect in this pass uses
     *     the {@link normalBuffer}
     * @param {boolean} requireDirtyRender Enable this if the effect requires a
     *     render frame every frame. Significant performance impact from enabling
     *     this.
     */
    addPass(pass: Pass, requireNormals?: boolean, requireDirtyRender?: boolean): void;
    /**
     * Removes and optionally disposes of a previously added Pass.
     * @param pass Custom Pass to remove
     * @param {Boolean} dispose Disposes of the Pass properties and effects.
     *     Default is `true`.
     */
    removePass(pass: Pass, dispose?: boolean): void;
    /**
     * Updates all existing EffectPasses, adding any new `<model-viewer-effects>`
     * Effects in the order they were added, after any custom Passes added
     * with {@link addPass}.
     *
     * Runs automatically whenever a new Effect is added.
     */
    updateEffects(): void;
    /**
     * Request a render-frame manually.
     */
    queueRender(): void;
    get [$scene](): ModelScene | undefined;
    /**
     * Gets child effects
     */
    get [$effects](): IMVEffect[];
    /**
     * Gets effectPasses of child effects
     */
    get [$effectPasses](): EffectPass[];
    [$onSceneLoad]: () => void;
    [$updateProperties](): void;
    [$requires](property: 'requireNormals' | 'requireSeparatePass' | 'requireDirtyRender'): boolean;
    [$resetEffectPasses](): void;
}
export {};
