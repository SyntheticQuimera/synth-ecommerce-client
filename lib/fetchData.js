import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function fetchData(context) {
  await mongooseConnect();
  //   <================ Products =================>
  const products = await Product.find({}, null, {
    sort: { _id: -1 },
  });

  const newArrivals = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  //   <================ Categories =================>
  const categories = await Category.find();
  const parentCategories = categories.filter((category) => !category.parent);
  const subcategories = {};

  for (const category of categories) {
    if (category.parent) {
      if (!subcategories[category.parent._id]) {
        subcategories[category.parent._id] = [];
      }
      subcategories[category.parent._id].push(category);
    }
  }

  //   <================ Wished =================>
  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];

  return {
    products: JSON.parse(JSON.stringify(products)),
    newArrivals: JSON.parse(JSON.stringify(newArrivals)),
    categories: JSON.parse(JSON.stringify(parentCategories)),
    subcategories: JSON.parse(JSON.stringify(subcategories)),
    wishedProducts: wishedProducts.map((i) => i.product.toString()),
  };
}
