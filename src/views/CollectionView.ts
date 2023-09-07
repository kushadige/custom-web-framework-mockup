import { Collection } from "../models/Collection";
import { Model, HasId } from "../models/Model";

/**
 * CollectionView is an abstract class that represents a collection view
 * - renders an html template
 * - renders a collection of models
 * - `T` is constrained to be a `Model`
 * - `K` is constrained to be an `object` with an `id` property
 */
export abstract class CollectionView<T extends Model<K>, K extends HasId> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  /**
   * @param model - a model that is in the collection
   * @param itemParent - the parent element that the model will be rendered into
   */
  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");

    for (let model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
