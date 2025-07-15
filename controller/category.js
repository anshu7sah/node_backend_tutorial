import { Category } from "../model/category.js";

export const createCategory = async (req, res) => {
  const { name, image } = req.body;

  const newCategory = new Category({
    name,
    image,
  });
  await newCategory.save();

  return res.status(201).json({ category: newCategory });
};

export const getAllCategory = async (req, res) => {
  const allCategory = await Category.find({});
  return res.status(200).json({ data: allCategory });
};
