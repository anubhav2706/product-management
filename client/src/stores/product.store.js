import { action, computed, observable } from "mobx";

class ProductStore {
  @observable items = [];
  @observable idWillBeDeleted = null;
  @observable showDeleteDialog = false;

  @action setItems (newItems, firstTime = false) {
    if (firstTime) {
      this.items = newItems;
    } else {
      this.items = [...this.items, ...newItems];
    }
  }

  @action addItem (newItem) {
    this.items = [...this.items, newItem];
  }

  @action setIdWillBeDeleted(id) {
    this.idWillBeDeleted = id;
    this.showDeleteDialog = true;
  }

  @action closeDeleteDialog() {
    this.idWillBeDeleted = null;
    this.showDeleteDialog = false;
  }
  
  @action deleteItemsById() {
    const idx = this.items.findIndex(v => v.id === this.idWillBeDeleted);
    this.items.splice(idx, 1);
  }
}
export default ProductStore