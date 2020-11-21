import { Product } from './product';
import { Item } from './item';

export class Cart {
  dateCreated: number;
  items: Item[] = [];

  constructor(private itemsMap: { [productId: string]: Item }) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new Item({ ...item, key: productId }));
    }
  }

  getQuantity(product: Product): number {
    const item: Item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice(): number {
    let sum = 0;
      for (const item of this.items) {
        sum += item.price * item.quantity;
      }
    return sum;
  }

  get totalItemsCount(): number {
    let count = 0;
      for (const item of this.items) {
        count += item.quantity;
      }
    return count;
  }
}
