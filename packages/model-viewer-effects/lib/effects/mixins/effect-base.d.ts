import { LitElement, ReactiveElement } from 'lit';
import { BlendFunction, BlendMode, Effect } from 'postprocessing';
import { MVEffectComposer } from '../../effect-composer.js';
import { Constructor } from '../../utilities.js';
export declare const $updateProperties: unique symbol;
export declare const $effectOptions: unique symbol;
export interface IMVBlendMode extends BlendMode {
    defaultBlendFunction?: BlendFunction;
}
export interface IntegrationOptions {
    /**
     * Enable this if effect uses the built-in {@link NormalPass}
     */
    requireNormals?: boolean;
    /**
     * Enable this if the effect requires a render frame every frame.
     * @warning Significant performance impact from enabling this
     */
    requireDirtyRender?: boolean;
}
export interface IMVEffect extends Effect, IntegrationOptions {
    readonly blendMode: IMVBlendMode;
    /**
     * Enable this if the effect doesn't play well when used with other effects.
     */
    requireSeparatePass?: boolean;
    disabled?: boolean;
}
export interface IEffectBaseMixin {
    effects: IMVEffect[];
    effectComposer: MVEffectComposer;
}
export declare const EffectBaseMixin: <T extends Constructor<ReactiveElement>>(EffectClass: T) => Constructor<IEffectBaseMixin> & T;
export declare const MVEffectBase: {
    new (...args: any[]): import("./blend-mode.js").IBlendModeMixin;
    prototype: import("./blend-mode.js").IBlendModeMixin;
} & object & {
    new (...args: any[]): IEffectBaseMixin;
    prototype: IEffectBaseMixin;
} & typeof LitElement;
export type MVEffectBase = InstanceType<typeof MVEffectBase>;
