import { SSAOEffect } from 'postprocessing';
import { $updateProperties, $effectOptions, MVEffectBase } from './mixins/effect-base.js';
import { $setDefaultProperties } from './mixins/blend-mode.js';
export declare class MVSSAOEffect extends MVEffectBase {
    static get is(): string;
    /**
     * The strength of the shadow occlusions. Higher value means darker shadows.
     */
    strength: number;
    constructor();
    connectedCallback(): void;
    update(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
    [$setDefaultProperties](): void;
    get [$effectOptions](): ConstructorParameters<typeof SSAOEffect>[2];
}
