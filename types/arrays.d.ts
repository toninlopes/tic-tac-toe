type ArrayLengthMutationKeys = "splice" | "push" | "pop" | "shift" | "unshift";

/**
 * A fixed-length array type that prevents length-mutating operations.
 * Available globally without imports.
 */
type FixedLengthArray<
  Length extends number,
  Element = unknown,
  ArrayPrototype = [Element, ...Element[]]
> = Pick<
  ArrayPrototype,
  Exclude<keyof ArrayPrototype, ArrayLengthMutationKeys>
> & {
  [index: number]: Element;
  [Symbol.iterator]: () => IterableIterator<Element>;
  readonly length: Length;
};
