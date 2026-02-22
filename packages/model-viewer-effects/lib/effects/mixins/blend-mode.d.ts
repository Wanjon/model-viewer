import { ReactiveElement } from 'lit';
import { BlendFunction } from 'postprocessing';
import { Constructor } from '../../utilities.js';
import { IEffectBaseMixin } from './effect-base.js';
export declare const $setDefaultProperties: unique symbol;
export type BlendMode = keyof typeof BlendFunction;
export declare const BLEND_MODES: BlendMode[];
export interface IBlendModeMixin {
    opacity: number;
    blendMode: BlendMode;
    [$setDefaultProperties](): void;
}
export declare const BlendModeMixin: <T extends Constructor<IEffectBaseMixin & ReactiveElement>>(EffectClass: T) => Constructor<IBlendModeMixin> & T;
