import { OutlineEffect } from 'postprocessing';
import { ColorRepresentation } from 'three';
import { $updateProperties, $effectOptions } from './mixins/effect-base.js';
declare const MVOutlineEffect_base: {
    new (...args: any[]): import("./mixins/selective.js").ISelectiveMixin;
    prototype: import("./mixins/selective.js").ISelectiveMixin;
} & object & {
    new (...args: any[]): import("./mixins/blend-mode.js").IBlendModeMixin;
    prototype: import("./mixins/blend-mode.js").IBlendModeMixin;
} & {
    new (...args: any[]): import("./mixins/effect-base.js").IEffectBaseMixin;
    prototype: import("./mixins/effect-base.js").IEffectBaseMixin;
} & typeof import("lit").LitElement;
export declare class MVOutlineEffect extends MVOutlineEffect_base {
    static get is(): string;
    /**
     * String or RGB #-hexadecimal Color.
     * @default 'white'
     */
    color: ColorRepresentation;
    /**
     * A larger value denotes a thicker edge.
     * @default 1
     */
    strength: number;
    /**
     * Value in the range of (0, 6). Controls the edge blur strength.
     * @default 1
     */
    smoothing: number;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, any>): void;
    [$updateProperties](): void;
    get [$effectOptions](): ConstructorParameters<typeof OutlineEffect>[2];
}
export {};
