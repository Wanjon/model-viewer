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
import { BlendFunction, BrightnessContrastEffect, HueSaturationEffect, ToneMappingEffect, ToneMappingMode as PPToneMappingMode } from 'postprocessing';
import { NeutralToneMapping, NoToneMapping } from 'three';
import { $effectComposer, $tonemapping } from '../effect-composer.js';
import { clamp, validateLiteralType, wrapClamp } from '../utilities.js';
import { $updateProperties, MVEffectBase } from './mixins/effect-base.js';
const TWO_PI = Math.PI * 2;
;
export const TONEMAPPING_MODES = Object.keys(PPToneMappingMode);
export class MVColorGradeEffect extends MVEffectBase {
    static get is() {
        return 'color-grade-effect';
    }
    constructor() {
        super();
        /**
         * `reinhard | reinhard2 | reinhard_adaptive | optimized_cineon | aces_filmic
         * | linear`
         * @default 'aces_filmic'
         */
        this.tonemapping = 'ACES_FILMIC';
        /**
         * Value in the range of (-1, 1).
         */
        this.brightness = 0;
        /**
         * Value in the range of (-1, 1).
         */
        this.contrast = 0;
        /**
         * Value in the range of (-1, 1).
         */
        this.saturation = 0;
        /**
         * Value in the range of (0, 2 * PI).
         *
         * This property is wrapping, meaning that if you set it above the max it
         * resets to the minimum and vice-versa.
         */
        this.hue = 0;
        this.effects = [
            new ToneMappingEffect({
                mode: PPToneMappingMode.ACES_FILMIC,
            }),
            new HueSaturationEffect({
                hue: wrapClamp(this.hue, 0, TWO_PI),
                saturation: clamp(this.saturation, -1, 1),
                blendFunction: BlendFunction.SRC,
            }),
            new BrightnessContrastEffect({
                brightness: clamp(this.brightness, -1, 1),
                contrast: clamp(this.contrast, -1, 1),
                blendFunction: BlendFunction.SRC,
            }),
        ];
    }
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this[$updateProperties]();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('tonemapping') ||
            changedProperties.has('brightness') ||
            changedProperties.has('contrast') || changedProperties.has('hue') ||
            changedProperties.has('saturation') ||
            changedProperties.has('blendMode')) {
            this[$updateProperties]();
        }
    }
    [$updateProperties]() {
        if (this.blendMode === 'SKIP') {
            this.effectComposer[$effectComposer][$tonemapping] = NeutralToneMapping;
        }
        else {
            this.effectComposer[$effectComposer][$tonemapping] = NoToneMapping;
        }
        this.saturation = clamp(this.saturation, -1, 1);
        this.hue = wrapClamp(this.hue, 0, TWO_PI);
        this.brightness = clamp(this.brightness, -1, 1);
        this.contrast = clamp(this.contrast, -1, 1);
        this.effects[1].saturation = this.saturation;
        this.effects[1].hue = this.hue;
        this.effects[2].brightness = this.brightness;
        this.effects[2].contrast = this.contrast;
        try {
            this.tonemapping = this.tonemapping.toUpperCase();
            validateLiteralType(TONEMAPPING_MODES, this.tonemapping);
            this.effects[0].mode =
                PPToneMappingMode[this.tonemapping];
        }
        finally {
            this.effectComposer.queueRender();
        }
    }
}
__decorate([
    property({ type: String, attribute: 'tonemapping', reflect: true })
], MVColorGradeEffect.prototype, "tonemapping", void 0);
__decorate([
    property({ type: Number, attribute: 'brightness', reflect: true })
], MVColorGradeEffect.prototype, "brightness", void 0);
__decorate([
    property({ type: Number, attribute: 'contrast', reflect: true })
], MVColorGradeEffect.prototype, "contrast", void 0);
__decorate([
    property({ type: Number, attribute: 'saturation', reflect: true })
], MVColorGradeEffect.prototype, "saturation", void 0);
__decorate([
    property({ type: Number, attribute: 'hue', reflect: true })
], MVColorGradeEffect.prototype, "hue", void 0);
//# sourceMappingURL=color-grade.js.map