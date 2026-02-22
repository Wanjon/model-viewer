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
import { SSAOEffect } from 'postprocessing';
import { $updateProperties, $effectOptions, MVEffectBase } from './mixins/effect-base.js';
import { property } from 'lit/decorators.js';
import { TEMP_CAMERA } from './utilities.js';
import { $setDefaultProperties } from './mixins/blend-mode.js';
export class MVSSAOEffect extends MVEffectBase {
    static get is() {
        return 'ssao-effect';
    }
    constructor() {
        super();
        /**
         * The strength of the shadow occlusions. Higher value means darker shadows.
         */
        this.strength = 2;
        this.effects = [new SSAOEffect(TEMP_CAMERA, undefined, this[$effectOptions])];
        this.effects[0].requireNormals = true;
    }
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this[$setDefaultProperties]();
        this[$updateProperties]();
    }
    update(changedProperties) {
        super.update && super.update(changedProperties);
        if (changedProperties.has('strength')) {
            this[$updateProperties]();
        }
    }
    [$updateProperties]() {
        this.effects[0].intensity = this.strength;
        this.effectComposer.queueRender();
    }
    [$setDefaultProperties]() {
        super[$setDefaultProperties]();
        this.effects[0].normalBuffer = this.effectComposer.normalBuffer;
    }
    get [$effectOptions]() {
        return {
            worldDistanceThreshold: 1000,
            worldDistanceFalloff: 1000,
            worldProximityThreshold: 1000,
            worldProximityFalloff: 1000,
            luminanceInfluence: 0.7,
            samples: 16,
            fade: 0.05,
            radius: 0.05,
            intensity: this.strength,
        };
    }
}
__decorate([
    property({ type: Number, attribute: 'strength', reflect: true })
], MVSSAOEffect.prototype, "strength", void 0);
//# sourceMappingURL=ssao.js.map