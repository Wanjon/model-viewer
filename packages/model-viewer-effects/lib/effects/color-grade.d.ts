import { ToneMappingMode as PPToneMappingMode } from 'postprocessing';
import { $updateProperties, MVEffectBase } from './mixins/effect-base.js';
export type ToneMappingMode = keyof typeof PPToneMappingMode;
export declare const TONEMAPPING_MODES: ToneMappingMode[];
export declare class MVColorGradeEffect extends MVEffectBase {
    static get is(): string;
    /**
     * `reinhard | reinhard2 | reinhard_adaptive | optimized_cineon | aces_filmic
     * | linear`
     * @default 'aces_filmic'
     */
    tonemapping: ToneMappingMode;
    /**
     * Value in the range of (-1, 1).
     */
    brightness: number;
    /**
     * Value in the range of (-1, 1).
     */
    contrast: number;
    /**
     * Value in the range of (-1, 1).
     */
    saturation: number;
    /**
     * Value in the range of (0, 2 * PI).
     *
     * This property is wrapping, meaning that if you set it above the max it
     * resets to the minimum and vice-versa.
     */
    hue: number;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
}
