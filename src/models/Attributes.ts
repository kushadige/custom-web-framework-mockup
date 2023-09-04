/**
 * Gives us the ability to store and retrieve data from an object
 * - T is constrained to be an object
 */
export class Attributes<T extends object> {
  constructor(private data: T) {}

  /**
   * Returns the value of the key
   * @param key - U is constrained to be a key of T
   * @returns T[U] - the value of the key
   */
  get = <U extends keyof T>(key: U): T[U] => {
    return this.data[key];
  };

  /**
   * Sets the value of the key
   * @param update - T is constrained to be an object
   */
  set = (update: T): void => {
    Object.assign(this.data, update);
  };

  /**
   * Returns the entire object
   * @returns T - the entire object
   */
  getAll(): T {
    return this.data;
  }
}
