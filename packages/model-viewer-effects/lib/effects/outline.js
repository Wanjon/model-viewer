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
import { BlendFunction, OutlineEffect } from 'postprocessing';
import { Color } from 'three';
import { $updateProperties, $effectOptions, MVEffectBase } from './mixins/effect-base.js';
import { SelectiveMixin } from './mixins/selective.js';
import { getKernelSize, TEMP_CAMERA } from './utilities.js';
export class MVOutlineEffect extends SelectiveMixin(MVEffectBase) {
    static get is() {
        return 'outline-effect';
    }
    constructor() {
        super();
        /**
         * String or RGB #-hexadecimal Color.
         * @default 'white'
         */
        this.color = 'white';
        /**
         * A larger value denotes a thicker edge.
         * @default 1
         */
        this.strength = 1;
        /**
         * Value in the range of (0, 6). Controls the edge blur strength.
         * @default 1
         */
        this.smoothing = 1;
        this.effects = [new OutlineEffect(undefined, TEMP_CAMERA, this[$effectOptions])];
    }
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this[$updateProperties]();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('color') || changedProperties.has('smoothing') || changedProperties.has('strength')) {
            this[$updateProperties]();
        }
    }
    [$updateProperties]() {
        this.effects[0].edgeStrength = this.strength;
        this.effects[0].visibleEdgeColor = new Color(this.color);
        this.effects[0].hiddenEdgeColor = new Color(this.color);
        this.effects[0].blurPass.enabled = Math.round(this.smoothing) > 0;
        this.effects[0].blurPass.kernelSize = getKernelSize(this.smoothing);
        this.effectComposer.queueRender();
    }
    get [$effectOptions]() {
        return {
            blendFunction: BlendFunction.SCREEN,
            edgeStrength: this.strength,
            pulseSpeed: 0.0,
            visibleEdgeColor: new Color(this.color).getHex(),
            hiddenEdgeColor: new Color(this.color).getHex(),
            blur: Math.round(this.smoothing) > 0,
            kernelSize: getKernelSize(this.smoothing),
            xRay: true,
            resolutionScale: 1,
        };
    }
}
__decorate([
    property({ type: String || Number, attribute: 'color', reflect: true })
], MVOutlineEffect.prototype, "color", void 0);
__decorate([
    property({ type: Number, attribute: 'strength', reflect: true })
], MVOutlineEffect.prototype, "strength", void 0);
__decorate([
    property({ type: Number, attribute: 'smoothing', reflect: true })
], MVOutlineEffect.prototype, "smoothing", void 0);
//# sourceMappingURL=outline.js.map