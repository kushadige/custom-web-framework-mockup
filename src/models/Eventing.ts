type Callback = () => void;

/**
 * Gives us the ability to tell other parts of our app when something has changed
 */
export class Eventing {
  private events: { [key: string]: Callback[] } = {};

  /**
   * Adds an event listener
   * @param eventName - string
   * @param callback - function that is called when the event is triggered
   */
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  /**
   * Triggers an event
   * @param eventName - string
   * @returns void
   */
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((handler) => handler());
  };
}
