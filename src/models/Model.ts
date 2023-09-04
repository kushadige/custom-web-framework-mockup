// Composition and Interface style approach (Model has a Attributes, Eventing, and Sync etc.)

import { AxiosPromise, AxiosResponse } from "axios";

/**
 * Gives us the ability to tell other parts of our app when something has changed
 */
interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

/**
 * Gives us the ability to save and fetch data from a server
 */
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

/**
 * Gives us the ability to store and retrieve data from an object
 */
interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface HasId {
  id?: number;
}

/**
 * Model is a class that represents a model
 */
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  /**
   * Sets the value of the key
   * - triggers change event if successful
   * @param update - T is constrained to be an object
   */
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  /**
   * Fetches data from the server
   * @returns void
   * @throws Error - if there is no id
   */
  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  /**
   * Saves data to the server
   * - triggers save event if successful
   * - triggers error event if unsuccessful
   * @returns void
   */
  save(): void {
    const data = this.attributes.getAll();
    this.sync
      .save(data)
      .then((): void => {
        this.trigger("save");
      })
      .catch((): void => {
        this.trigger("error");
      });
  }
}
