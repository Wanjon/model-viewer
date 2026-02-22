import { PerspectiveCamera } from 'three';
import { MVEffectBase } from './mixins/effect-base.js';
/**
 * Helper function for calculating the Kernel Size
 * @param n Range(0, 6)
 * @returns The relative Kernel Size
 */
export declare function getKernelSize(n: number): number;
export declare function getComponentName(obj: MVEffectBase): string;
export declare const TEMP_CAMERA: PerspectiveCamera;
