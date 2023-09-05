import { HasId, Model } from "../models/Model";

/**
 * View is an abstract class that represents a view
 * - renders an html template
 * - handles html template events
 * - `T` is constrained to be a `Model`
 * - `K` is constrained to be an `object` with an `id` property
 */
export abstract class View<T extends Model<K>, K extends HasId> {
  protected regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  /**
   * @returns a string that represents an html template
   */
  abstract template(): string;

  /**
   * @returns an object that maps regions to selectors
   */
  protected regionsMap(): { [key: string]: string } {
    return {};
  }
  /**
   * @returns an object that maps events to event handlers
   */
  protected eventsMap(): { [key: string]: () => void } {
    return {};
  }

  protected onRender(): void {}

  private bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  private bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  private bindRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  public render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.bindRegions(templateElement.content);
    this.onRender();

    this.parent.append(templateElement.content);
  }
}
