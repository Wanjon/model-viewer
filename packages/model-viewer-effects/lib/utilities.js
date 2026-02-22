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
import { EffectAttribute, Pass } from 'postprocessing';
/**
 * Get symbol of given key if exists on object.
 * @param object Object to retrieve symbol from
 * @param key Key to search for (case sensitive)
 * @returns `Symbol(key)`
 */
export function getOwnPropertySymbol(object, key) {
    while (object) {
        const symbol = Object.getOwnPropertySymbols(object).find((symbol) => symbol.description === key);
        if (symbol)
            return symbol;
        // Search further up in prototype chain
        object = Object.getPrototypeOf(object);
    }
    return;
}
/**
 * Determines whether an object has a Symbol property with the specified key.
 * @param object Object to retrieve symbol from
 * @param key Key to search for (case sensitive)
 */
export function hasOwnPropertySymbol(object, key) {
    return getOwnPropertySymbol(object, key) !== undefined;
}
/**
 * Get value of symbol of given key if exists on object.
 * @param object Object to retrieve key value from
 * @param key Key to search for (case sensitive)
 * @returns `object[Symbol(key)]`
 */
export function getOwnPropertySymbolValue(object, key) {
    const symbol = getOwnPropertySymbol(object, key);
    return symbol && object[symbol];
}
/**
 * @param {Number} value
 * @param {Number} lowerLimit
 * @param {Number} upperLimit
 * @return {Number} value clamped within `lowerLimit - upperLimit`
 */
export function clamp(value, lowerLimit, upperLimit) {
    return Math.max(lowerLimit, Math.min(upperLimit, value));
}
/**
 * @param {Number} value
 * @returns value clamped between `0 - 1`
 */
export function clampNormal(value) {
    return clamp(value, 0, 1);
}
/**
 * @param {Number} value
 * @param {Number} lowerLimit
 * @param {Number} upperLimit
 * @return {Number} wraps value between `lowerLimit - upperLimit`
 */
export function wrapClamp(value, lowerLimit, upperLimit) {
    if (value > upperLimit)
        return lowerLimit;
    if (value < lowerLimit)
        return upperLimit;
    return value;
}
/**
 * Searches through hierarchy of HTMLElement until an element with a non-transparent background is found
 * @param elem The element background to get
 * @returns The backgroundColor
 */
export function getBackgroundColor(elem) {
    let currElem = elem;
    while (currElem && isTransparent(getComputedStyle(currElem))) {
        currElem = currElem.parentElement;
    }
    if (!currElem)
        return;
    return getComputedStyle(currElem).backgroundColor;
}
/**
 * Determines whether an Element's backgroundColor is transparent
 * @param style The CSS properties of an Element
 */
function isTransparent(style) {
    return style.backgroundColor === 'transparent' || style.backgroundColor === 'rgba(0, 0, 0, 0)' || !style.backgroundColor;
}
/**
 * Determines whether the given Effect uses Convolution.
 * @param effect The effect to check.
 */
export function isConvolution(effect) {
    return (effect.getAttributes() & EffectAttribute.CONVOLUTION) != 0;
}
/**
 * Disposes of Pass properties without disposing of the Effects.
 * @param pass Pass to dispose of
 */
export function disposeEffectPass(pass) {
    Pass.prototype.dispose.call(pass);
    if (!pass.listener)
        return;
    for (const effect of pass.effects) {
        effect.removeEventListener('change', pass.listener);
    }
}
export function getValueOfEnum(Enum, key) {
    const index = Object.keys(Enum)
        .filter((v) => !isNaN(Number(v)))
        .indexOf(key);
    return Enum[index];
}
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
export function validateLiteralType(options, value) {
    if (!options.includes(value))
        throw new TypeError(`Validation Error: ${value} is not a valid value. Expected ${options.join(' | ')}`);
}
//# sourceMappingURL=utilities.js.map