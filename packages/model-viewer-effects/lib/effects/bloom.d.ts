import { BloomEffect } from 'postprocessing';
import { $updateProperties, $effectOptions, MVEffectBase } from './mixins/effect-base.js';
export declare class MVBloomEffect extends MVEffectBase {
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
    radius: number;
    /**
     * Value in the range of (0, 1).
     */
    smoothing: number;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
    get [$effectOptions](): ConstructorParameters<typeof BloomEffect>[0];
}
