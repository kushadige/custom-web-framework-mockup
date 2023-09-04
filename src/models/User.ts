import { Model } from "./Model";

/**
 * Inheritance style class
 * - User is a Model
 */
export class User extends Model {
  get fullName(): string {
    return "User full name";
  }

  get isAdmin(): boolean {
    return false;
  }
}
