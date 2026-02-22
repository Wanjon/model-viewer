import { ModelViewerElement } from '@google/model-viewer';
import { HSL } from 'three';
export declare const timePasses: (ms?: number) => Promise<void>;
/**
 * Converts a partial URL string to a fully qualified URL string.
 *
 * @param {String} url
 * @return {String}
 */
export declare const toFullUrl: (partialUrl: string) => string;
export declare const deserializeUrl: (url: string | null) => string | null;
export declare const elementFromLocalPoint: (document: Document | ShadowRoot, x: number, y: number) => Element | null;
export declare const pickShadowDescendant: (element: Element, x?: number, y?: number) => Element | null;
export declare const rafPasses: () => Promise<void>;
export interface SyntheticEventProperties {
    clientX?: number;
    clientY?: number;
    deltaY?: number;
    key?: string;
    shiftKey?: boolean;
}
/**
 * Dispatch a synthetic event on a given element with a given type, and
 * optionally with custom event properties. Returns the dispatched event.
 *
 * @param {HTMLElement} element
 * @param {type} string
 * @param {*} properties
 */
export declare const dispatchSyntheticEvent: (target: EventTarget, type: string, properties?: SyntheticEventProperties) => CustomEvent;
export declare const ASSETS_DIRECTORY = "packages/shared-assets/";
/**
 * Returns the full path for an asset by name. This is a convenience helper so
 * that we don't need to change paths throughout all test suites if we ever
 * decide to move files around.
 *
 * @param {string} name
 * @return {string}
 */
export declare const assetPath: (name: string) => string;
/**
 * Returns true if the given element is in the tree of the document of the
 * current frame.
 *
 * @param {HTMLElement} element
 * @return {boolean}
 */
export declare const isInDocumentTree: (node: Node) => boolean;
/**
 * "Spies" on a particular object by replacing a specified part of its
 * implementation with a custom version. Returns a function that restores the
 * original implementation to the object when invoked.
 */
export declare const spy: (object: Object, property: string, descriptor: PropertyDescriptor) => (() => void);
/**
 * Creates a ModelViewerElement with a given src, attaches to document as first
 * child and returns
 * @param src Model to load
 * @returns element
 */
export declare const createModelViewerElement: (src: string | null) => ModelViewerElement;
export type PredicateFunction<T = void> = (value: T) => boolean;
/**
 * @param {EventTarget|EventDispatcher} target
 * @param {string} eventName
 * @param {?Function} predicate
 */
export declare const waitForEvent: <T>(target: any, eventName: string, predicate?: PredicateFunction<T> | null) => Promise<T>;
export interface TypedArray<T = unknown> {
    readonly BYTES_PER_ELEMENT: number;
    length: number;
    [n: number]: T;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: TypedArray<number>) => number, initialValue?: number): number;
}
export declare function screenshot(element: ModelViewerElement): Uint8Array;
export declare function ArraysAreEqual(arr1: TypedArray, arr2: TypedArray): boolean;
export declare function CompareArrays(arr1: TypedArray<number>, arr2: TypedArray<number>): number;
export declare function AverageHSL(arr: TypedArray<number>): HSL;
