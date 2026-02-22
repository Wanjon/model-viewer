import { MVBloomEffect } from './effects/bloom.js';
import { MVColorGradeEffect } from './effects/color-grade.js';
import { MVGlitchEffect } from './effects/glitch.js';
import { MVOutlineEffect } from './effects/outline.js';
import { MVPixelateEffect } from './effects/pixelate.js';
import { MVSMAAEffect } from './effects/smaa.js';
import { MVSSAOEffect } from './effects/ssao.js';
import { MVEffectComposer } from './effect-composer.js';
import { MVEffectBase } from './effects/mixins/effect-base.js';
import { SelectiveMixin } from './effects/mixins/selective.js';
import { MVSelectiveBloomEffect } from './effects/selective-bloom.js';
declare global {
    interface HTMLElementTagNameMap {
        'effect-composer': MVEffectComposer;
        'pixelate-effect': MVPixelateEffect;
        'bloom-effect': MVBloomEffect;
        'selective-bloom-effect': MVSelectiveBloomEffect;
        'color-grade-effect': MVColorGradeEffect;
        'outline-effect': MVOutlineEffect;
        'ssao-effect': MVSSAOEffect;
        'smaa-effect': MVSMAAEffect;
        'glitch-effect': MVGlitchEffect;
    }
}
export { MVEffectComposer as EffectComposer, MVPixelateEffect as PixelateEffect, MVBloomEffect as BloomEffect, MVSelectiveBloomEffect as SelectiveBloomEffect, MVColorGradeEffect as ColorGradeEffect, MVOutlineEffect as OutlineEffect, MVSSAOEffect as SSAOEffect, MVSMAAEffect as SMAAEffect, MVGlitchEffect as GlitchEffect, MVEffectBase as EffectBase, SelectiveMixin, };
