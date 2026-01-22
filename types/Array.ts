/* eslint-disable no-extend-native */

type ArrayRevolvingMethod<T> = (current?: T) => T;

declare global {
  interface Array<T> {
    nextOrFirst: ArrayRevolvingMethod<T>;
    previousOrLast: ArrayRevolvingMethod<T>;
  }

  interface ReadonlyArray<T> {
    nextOrFirst: ArrayRevolvingMethod<T>;
    previousOrLast: ArrayRevolvingMethod<T>;
  }
}

Array.prototype.nextOrFirst = function <T>(this: T[], current?: T) {
  if (this.length === 0 || current === undefined) return this[0];
  return this[this.indexOf(current) + 1] ?? this[0];
};

Array.prototype.previousOrLast = function <T>(this: T[], current?: T) {
  if (this.length === 0) return this[0];
  if (current === undefined) return this[0];
  return this[this.indexOf(current) - 1] ?? this[this.length - 1];
};
