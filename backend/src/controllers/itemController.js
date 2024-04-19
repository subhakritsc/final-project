import { itemFromObject } from "../models/itemModel.js";
import { items } from "../data/items.js";
import { Console } from "console";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const { type, item } = req.body;
    const newitem = itemFromObject({ item, type });
    items.push(newitem);
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Bad Request" });
  }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  // res.status(200).json(items.filter((obj) => (filter == "ทั้งหมด" || obj.name == filter)));
  res.status(200).json(items);

};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  try {
    let { id } = req.params;
    for(let i = 0; i < items.length; ++i) {
      if (items[i]._id == id) {
        items.splice(i, 1);
        break;
      }
    }
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Bad Request" });
  }
};