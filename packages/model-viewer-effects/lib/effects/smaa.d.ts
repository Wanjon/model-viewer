import { SMAAPreset } from 'postprocessing';
import { $updateProperties, MVEffectBase } from './mixins/effect-base.js';
export type SMAAQuality = keyof typeof SMAAPreset;
export declare const SMAA_QUALITIES: SMAAQuality[];
export declare class MVSMAAEffect extends MVEffectBase {
    static get is(): string;
    /**
     * `low | medium | high | ultra`
     * @default 'medium'
     */
    quality: SMAAQuality;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
}
