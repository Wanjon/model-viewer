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
import { BlendFunction, SelectiveBloomEffect } from 'postprocessing';
import { $updateProperties, $effectOptions, MVEffectBase } from './mixins/effect-base.js';
import { SelectiveMixin } from './mixins/selective.js';
import { TEMP_CAMERA } from './utilities.js';
export class MVSelectiveBloomEffect extends SelectiveMixin(MVEffectBase) {
    static get is() {
        return 'selective-bloom-effect';
    }
    constructor() {
        super();
        /**
         * The strength of the bloom effect.
         */
        this.strength = 1;
        /**
         * Value in the range of (0, 1). Pixels with a brightness above this will bloom.
         */
        this.threshold = 0.85;
        /**
         * Value in the range of (0, 1).
         */
        this.smoothing = 0.025;
        /**
         * Value in the range of (0, 1).
         */
        this.radius = 0.85;
        this.effects = [new SelectiveBloomEffect(undefined, TEMP_CAMERA, this[$effectOptions])];
    }
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this[$updateProperties]();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('strength') ||
            changedProperties.has('threshold') ||
            changedProperties.has('smoothing') ||
            changedProperties.has('radius')) {
            this[$updateProperties]();
        }
    }
    [$updateProperties]() {
        this.effects[0].luminanceMaterial.threshold = this.threshold;
        this.effects[0].luminanceMaterial.smoothing = this.smoothing;
        this.effects[0].intensity = this.strength;
        this.effects[0].mipmapBlurPass.radius = this.radius;
        this.effectComposer.queueRender();
    }
    get [$effectOptions]() {
        return {
            blendFunction: BlendFunction.ADD,
            mipmapBlur: true,
            radius: this.radius,
            luminanceThreshold: this.threshold,
            luminanceSmoothing: this.smoothing,
            intensity: this.strength,
        };
    }
}
__decorate([
    property({ type: Number, attribute: 'strength', reflect: true })
], MVSelectiveBloomEffect.prototype, "strength", void 0);
__decorate([
    property({ type: Number, attribute: 'threshold', reflect: true })
], MVSelectiveBloomEffect.prototype, "threshold", void 0);
__decorate([
    property({ type: Number, attribute: 'smoothing', reflect: true })
], MVSelectiveBloomEffect.prototype, "smoothing", void 0);
__decorate([
    property({ type: Number, attribute: 'radius', reflect: true })
], MVSelectiveBloomEffect.prototype, "radius", void 0);
//# sourceMappingURL=selective-bloom.js.map