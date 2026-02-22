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
import { BlendFunction } from 'postprocessing';
import { clampNormal, validateLiteralType } from '../../utilities.js';
export const $setDefaultProperties = Symbol('setDefaultProperties');
export const BLEND_MODES = Object.keys(BlendFunction);
export const BlendModeMixin = (EffectClass) => {
    class BlendEffectElement extends EffectClass {
        constructor() {
            super(...arguments);
            /**
             * The function to use to blend the effect with the base render.
             */
            this.blendMode = 'DEFAULT';
            /**
             * The opacity of the effect that will be blended with the base render.
             */
            this.opacity = 1;
        }
        connectedCallback() {
            super.connectedCallback && super.connectedCallback();
            this[$setDefaultProperties]();
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('blendMode') || changedProperties.has('opacity')) {
                this.opacity = clampNormal(this.opacity);
                this.blendMode = this.blendMode.toUpperCase();
                this.effects.forEach((effect) => {
                    if (this.blendMode === 'DEFAULT') {
                        if (effect.blendMode.defaultBlendFunction === undefined)
                            throw new Error(`${effect.name} has no default blend function`);
                        effect.blendMode.blendFunction = effect.blendMode.defaultBlendFunction;
                    }
                    else {
                        validateLiteralType(BLEND_MODES, this.blendMode);
                        effect.blendMode.blendFunction = BlendFunction[this.blendMode];
                    }
                    effect.disabled = this.blendMode === 'SKIP';
                    effect.blendMode.setOpacity(this.opacity);
                });
                // Recreate EffectPasses if the new or old value was 'skip'
                if (this.blendMode === 'SKIP' || changedProperties.get('blendMode') === 'SKIP') {
                    this.effectComposer.updateEffects();
                }
                this.effectComposer.queueRender();
            }
        }
        [$setDefaultProperties]() {
            this.effects.forEach((effect) => {
                effect.blendMode.defaultBlendFunction = effect.blendMode.blendFunction;
            });
        }
    }
    __decorate([
        property({ type: String, attribute: 'blend-mode', reflect: true })
    ], BlendEffectElement.prototype, "blendMode", void 0);
    __decorate([
        property({ type: Number, attribute: 'opacity', reflect: true })
    ], BlendEffectElement.prototype, "opacity", void 0);
    return BlendEffectElement;
};
//# sourceMappingURL=blend-mode.js.map