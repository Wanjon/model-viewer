import { $updateProperties, MVEffectBase } from './mixins/effect-base.js';
export declare class MVPixelateEffect extends MVEffectBase {
    static get is(): string;
    /**
     * The pixel granularity. Higher value = lower resolution.
     * @default 10
     */
    granularity: number;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
}
