import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

// const itemSchema = {
//   item: "string",
// };

// class Item {
//   /**
//    * @param {string} item
//    * @param {number} _id
//    * @param {string} type
//    */
//   constructor(item,type) {
//     this.item = item;
//     this._id = Math.floor(Math.random() * 100000);
//     this.type = type;
//   }
// }

// /**
//  * @param {object} obj
//  * @returns Item  
//  */

// function itemFromObject(obj) {
//   const errors = [];
//   if (!("item" in obj)) {
//     errors.push("Expected key 'item'");
//   } else if (typeof obj.item !== "string") {
//     errors.push("Expected value of 'item' to be a string");
//   }

//   if (errors.length > 0) {
//     throw new Error(errors.join("\n"));
//   }

//   return new Item(obj.item, obj.type);
// }


// export { Item, itemFromObject };
