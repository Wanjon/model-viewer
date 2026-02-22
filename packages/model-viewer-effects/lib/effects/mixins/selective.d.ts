import { ReactiveElement } from 'lit';
import { Selection } from 'postprocessing';
import { Constructor } from '../../utilities.js';
import { IEffectBaseMixin, IMVEffect } from './effect-base.js';
import { Object3D } from 'three';
export declare const $setSelection: unique symbol;
export interface ISelectionEffect extends IMVEffect {
    selection?: Selection;
}
export interface ISelectiveMixin {
    selection: Array<string | Object3D>;
}
export declare const SelectiveMixin: <T extends Constructor<IEffectBaseMixin & ReactiveElement>>(EffectClass: T) => Constructor<ISelectiveMixin> & T;
