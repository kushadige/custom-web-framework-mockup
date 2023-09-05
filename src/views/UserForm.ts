import { User, UserProps } from "../models/User";
import { View } from "./View";

/**
 * UserForm is a class that represents a user form
 * - renders a user form
 * - handles user form events
 * - saves user form data
 */
export class UserForm extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <input 
          id="name"
          placeholder="${this.model.get("name")}" 
          autocomplete="off" 
        />
        <button class="update-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-user">Save User</button>
      </div>
    `;
  }

  override eventsMap(): { [key: string]: () => void } {
    return {
      "click:button.set-age": this.onSetAgeClick,
      "click:button.update-name": this.onUpdateNameClick,
      "click:button.save-user": this.onSaveUserClick,
    };
  }

  /**
   * Sets a random age
   */
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  /**
   * Updates the user name
   */
  onUpdateNameClick = (): void => {
    const input = this.parent.querySelector("input") as HTMLInputElement;
    if (input && input.value) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  /**
   * Saves the user data to the server
   */
  onSaveUserClick = (): void => {
    this.model.save();
  };
}
