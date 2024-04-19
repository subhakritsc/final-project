import Item from "../models/itemModel.js";

// import { itemFromObject } from "../models/itemModel.js";
// import { items } from "../data/items.js";
// import { Console } from "console";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
  // try {
  //   // const newItem = new Item({item:"Hi",type:"Text"});
  //   // await newItem.save();
  //   // res.status(200).json({ message: "OK" });
  //   const { type, item } = req.body;
  //   const newitem = itemFromObject({ item, type });
  //   items.push(newitem);
  //   res.status(200).json({ message: "OK" });
  // } catch (err) {
  //   if (err.name === "ValidationError") {
  //     res.status(400).json({ error: "Bad Request" });
  //   } else {
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  // res.status(200).json(items.filter((obj) => (filter == "ทั้งหมด" || obj.name == filter)));
  // res.status(200).json(items);
  const items = await Item.find({});
  console.log(items);
  res.status(200).json(items);

};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  const id = req.originalUrl.split("/")[req.originalUrl.split("/").length - 1];
  try {
    await Item.deleteOne({ _id: id });

    res.status(200).send("Deleted!");
  } catch (err) {
    res.status(404).send("Not Found");
    return;
  }


  // try {
  //   let { id } = req.params;
  //   for(let i = 0; i < items.length; ++i) {
  //     if (items[i]._id == id) {
  //       items.splice(i, 1);
  //       break;
  //     }
  //   }
  //   res.status(200).json({ message: "OK" });
  // } catch (e) {
  //   console.error(e);
  //   res.status(400).json({ error: "Bad Request" });
  // }
};