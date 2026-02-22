import { SelectiveBloomEffect } from 'postprocessing';
import { $updateProperties, $effectOptions } from './mixins/effect-base.js';
declare const MVSelectiveBloomEffect_base: {
    new (...args: any[]): import("./mixins/selective.js").ISelectiveMixin;
    prototype: import("./mixins/selective.js").ISelectiveMixin;
} & object & {
    new (...args: any[]): import("./mixins/blend-mode.js").IBlendModeMixin;
    prototype: import("./mixins/blend-mode.js").IBlendModeMixin;
} & {
    new (...args: any[]): import("./mixins/effect-base.js").IEffectBaseMixin;
    prototype: import("./mixins/effect-base.js").IEffectBaseMixin;
} & typeof import("lit").LitElement;
export declare class MVSelectiveBloomEffect extends MVSelectiveBloomEffect_base {
    static get is(): string;
    /**
     * The strength of the bloom effect.
     */
    strength: number;
    /**
     * Value in the range of (0, 1). Pixels with a brightness above this will bloom.
     */
    threshold: number;
    /**
     * Value in the range of (0, 1).
     */
    smoothing: number;
    /**
     * Value in the range of (0, 1).
     */
    radius: number;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
    get [$effectOptions](): ConstructorParameters<typeof SelectiveBloomEffect>[2];
}
export {};
