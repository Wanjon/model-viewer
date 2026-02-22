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
import { PixelationEffect } from 'postprocessing';
import { $updateProperties, MVEffectBase } from './mixins/effect-base.js';
export class MVPixelateEffect extends MVEffectBase {
    static get is() {
        return 'pixelate-effect';
    }
    constructor() {
        super();
        /**
         * The pixel granularity. Higher value = lower resolution.
         * @default 10
         */
        this.granularity = 10.0;
        this.effects = [new PixelationEffect(this.granularity)];
    }
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this[$updateProperties]();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('granularity')) {
            this[$updateProperties]();
        }
    }
    [$updateProperties]() {
        this.effects[0].granularity = this.granularity;
        this.effectComposer.queueRender();
    }
}
__decorate([
    property({ type: Number, attribute: 'granularity', reflect: true })
], MVPixelateEffect.prototype, "granularity", void 0);
//# sourceMappingURL=pixelate.js.map