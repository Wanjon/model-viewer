import { ChromaticAberrationEffect, GlitchEffect } from 'postprocessing';
import { $updateProperties, $effectOptions, MVEffectBase } from './mixins/effect-base.js';
export declare const GLITCH_MODES: readonly ["sporadic", "constant"];
export type GlitchMode = typeof GLITCH_MODES[number];
export declare class MVGlitchEffect extends MVEffectBase {
    static get is(): string;
    /**
     * Value in the range of (0, 1).
     */
    strength: number;
    /**
     * `sporadic` | `constant`
     * @default 'sporadic'
     */
    mode: GlitchMode;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
    [$effectOptions](chromaticAberrationEffect: ChromaticAberrationEffect): ConstructorParameters<typeof GlitchEffect>[0];
}
