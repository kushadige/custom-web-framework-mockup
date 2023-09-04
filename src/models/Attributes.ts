/**
 * Gives us the ability to store properties
 * tied to this user (name, age, etc)
 */
export class Attributes<T extends object> {
  constructor(private data: T) {}

  get = <U extends keyof T>(key: U): T[U] => {
    return this.data[key];
  };

  set = (update: T): void => {
    Object.assign(this.data, update);
  };
}
