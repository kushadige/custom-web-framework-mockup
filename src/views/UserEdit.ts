import { User, UserProps } from "../models/User";
import { View } from "./View";
import { UserForm } from "./UserForm";
import { UserDetails } from "./UserDetails";

export class UserEdit extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <div class="user-details"></div>
        <div class="user-form"></div>
      </div>
    `;
  }

  override regionsMap(): { [key: string]: string } {
    return {
      userDetails: ".user-details",
      userForm: ".user-form",
    };
  }

  /**
   * Nested views
   */
  override onRender(): void {
    new UserDetails(this.regions.userDetails, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }
}
