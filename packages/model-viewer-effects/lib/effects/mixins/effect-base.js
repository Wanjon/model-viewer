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
import { LitElement } from 'lit';
import { $effectComposer } from '../../effect-composer.js';
import { BlendModeMixin } from './blend-mode.js';
import { getComponentName } from '../utilities.js';
export const $updateProperties = Symbol('updateProperties');
export const $effectOptions = Symbol('effectOptions');
export const EffectBaseMixin = (EffectClass) => {
    class EffectBaseElement extends EffectClass {
        /**
         * The parent {@link MVEffectComposer} element.
         */
        get effectComposer() {
            if (!this[$effectComposer])
                throw new Error(`${getComponentName(this)} must be a child of a <model-viewer> component.`);
            return this[$effectComposer];
        }
        connectedCallback() {
            var _a;
            super.connectedCallback && super.connectedCallback();
            if (((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) === 'effect-composer') {
                this[$effectComposer] = this.parentNode;
            }
            this.effectComposer.updateEffects();
        }
        disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback();
            this.effects.forEach((effect) => effect.dispose());
            this.effectComposer.updateEffects();
        }
    }
    return EffectBaseElement;
};
export const MVEffectBase = BlendModeMixin(EffectBaseMixin(LitElement));
//# sourceMappingURL=effect-base.js.map