import { Effect, EffectPass } from 'postprocessing';
import { ColorRepresentation } from 'three';
export type Constructor<T = object, U = object> = {
    new (...args: any[]): T;
    prototype: T;
} & U;
/**
 * Get symbol of given key if exists on object.
 * @param object Object to retrieve symbol from
 * @param key Key to search for (case sensitive)
 * @returns `Symbol(key)`
 */
export declare function getOwnPropertySymbol(object: any, key: string): symbol | undefined;
/**
 * Determines whether an object has a Symbol property with the specified key.
 * @param object Object to retrieve symbol from
 * @param key Key to search for (case sensitive)
 */
export declare function hasOwnPropertySymbol(object: any, key: string): boolean;
/**
 * Get value of symbol of given key if exists on object.
 * @param object Object to retrieve key value from
 * @param key Key to search for (case sensitive)
 * @returns `object[Symbol(key)]`
 */
export declare function getOwnPropertySymbolValue<T = unknown>(object: any, key: string): T | undefined;
/**
 * @param {Number} value
 * @param {Number} lowerLimit
 * @param {Number} upperLimit
 * @return {Number} value clamped within `lowerLimit - upperLimit`
 */
export declare function clamp(value: number, lowerLimit: number, upperLimit: number): number;
/**
 * @param {Number} value
 * @returns value clamped between `0 - 1`
 */
export declare function clampNormal(value: number): number;
/**
 * @param {Number} value
 * @param {Number} lowerLimit
 * @param {Number} upperLimit
 * @return {Number} wraps value between `lowerLimit - upperLimit`
 */
export declare function wrapClamp(value: number, lowerLimit: number, upperLimit: number): number;
/**
 * Searches through hierarchy of HTMLElement until an element with a non-transparent background is found
 * @param elem The element background to get
 * @returns The backgroundColor
 */
export declare function getBackgroundColor(elem: HTMLElement): ColorRepresentation | undefined;
/**
 * Determines whether the given Effect uses Convolution.
 * @param effect The effect to check.
 */
export declare function isConvolution(effect: Effect): boolean;
/**
 * Disposes of Pass properties without disposing of the Effects.
 * @param pass Pass to dispose of
 */
export declare function disposeEffectPass(pass: EffectPass): void;
export declare function getValueOfEnum<T extends Object>(Enum: T, key: string): T;
/**
 * Helper function to validate whether a value is in-fact a valid option of a literal type.
 *
 * Requires the type to be defined as follows:
 * @code
 * `const TOptions = [...] as const;`
 *
 * `type T = typeof TOptions[number];`
 * @param options `TOptions`
 * @param value `value: T`
 * @throws TypeError
 */
export declare function validateLiteralType<TOptions extends readonly unknown[]>(options: TOptions, value: typeof options[number]): void;
