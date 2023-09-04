import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

/**
 * Collection is a class that represents a collection of models
 */
export class Collection<T, U> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (json: U) => T // deserialize is a function that takes in a json object and returns an instance of T
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((value: U) => {
        this.models.push(this.deserialize(value));
      });

      this.trigger("change");
    });
  }
}
