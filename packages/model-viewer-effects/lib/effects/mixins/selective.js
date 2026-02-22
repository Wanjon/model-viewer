/* @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from 'lit/decorators.js';
import { $selection, $scene } from '../../effect-composer.js';
export const $setSelection = Symbol('setSelection');
export const SelectiveMixin = (EffectClass) => {
    var _a;
    class SelectiveEffectElement extends EffectClass {
        constructor() {
            super(...arguments);
            /**
             * The objects to attemp to place into the effect selection. Can be either the 'name' or the actual objects themselves.
             *
             * Note that since this is an array property, it must be set using the '=' operator in order to properly update.
             */
            this.selection = [];
            this[_a] = () => {
                var _b;
                const { effectComposer } = this;
                if (!effectComposer)
                    return;
                if (((_b = this.selection) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    const selection = [];
                    const scene = effectComposer[$scene];
                    scene === null || scene === void 0 ? void 0 : scene.traverse((obj) => (this.selection.includes(obj.name) || this.selection.includes(obj)) && selection.push(obj));
                    this.effects.forEach((effect) => { var _b; return (_b = effect.selection) === null || _b === void 0 ? void 0 : _b.set(selection); });
                }
                else {
                    this.effects.forEach((effect) => { var _b; return (_b = effect.selection) === null || _b === void 0 ? void 0 : _b.set(effectComposer[$selection].values()); });
                }
            };
        }
        connectedCallback() {
            super.connectedCallback && super.connectedCallback();
            this[$setSelection]();
            this.effectComposer.addEventListener('updated-selection', this[$setSelection]);
        }
        disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback();
            this.effectComposer.removeEventListener('updated-selection', this[$setSelection]);
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('selection')) {
                this[$setSelection]();
                this.effectComposer.queueRender();
            }
        }
    }
    _a = $setSelection;
    __decorate([
        property({ type: Array })
    ], SelectiveEffectElement.prototype, "selection", void 0);
    return SelectiveEffectElement;
};
//# sourceMappingURL=selective.js.map