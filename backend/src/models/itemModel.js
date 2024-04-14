const itemSchema = {
  item: "string",
};

class Item {
  /**
   * @param {string} item
   * @param {number} _id
   */
  constructor(item) {
    this.item = item;
    this._id = Math.floor(Math.random() * 100000);
  }
}

/**
 * @param {object} obj
 * @returns Item  
 */

function itemFromObject(obj) {
  const errors = [];
  if (!("item" in obj)) {
    errors.push("Expected key 'item'");
  } else if (typeof obj.item !== "string") {
    errors.push("Expected value of 'item' to be a string");
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return new Item(obj.item);
}


export { Item, itemFromObject };
