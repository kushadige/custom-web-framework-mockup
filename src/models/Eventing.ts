type Callback = () => void;

/**
 * Gives us the ability to tell other parts
 * of our application whenever data tied
 * to a particular user is changed
 */
export class Eventing {
  private events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((handler) => handler());
  };
}
