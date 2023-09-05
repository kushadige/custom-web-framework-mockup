// Inheritance style approach (User is a Model)

import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

/**
 * UserProps is an interface that describes the properties that a User has
 */
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

/**
 * rootUrl is a string that represents the url that we want to make a request to
 */
const rootUrl = "http://localhost:3000/users";

/**
 * User is a class that represents a user
 * - inherits all methods from `Model`
 * - defines a static method that returns a `UserCollection`
 * - defines a method that sets a random age
 */
export class User extends Model<UserProps> {
  constructor(attrs: UserProps) {
    super(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json: UserProps): User => new User(json)
    );
  }

  // static buildLocalUser(attrs: UserProps): User {
  //   return new User(
  //     new Attributes<UserProps>(attrs),
  //     new Eventing(),
  //     new LocalSync<UserProps>()
  //   );
  // }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }

  get fullName(): string {
    return "User full name";
  }

  get isAdmin(): boolean {
    return false;
  }
}
