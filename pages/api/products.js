import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { searchTerm } = req.query;

  const productsQuery = {};

  if (searchTerm) {
    productsQuery["$or"] = [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ];
  }
  console.log(productsQuery);
  res.json(await Product.find(productsQuery, null, { sort: { _id: -1 } }));
}
