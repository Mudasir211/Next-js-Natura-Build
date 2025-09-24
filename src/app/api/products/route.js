import { connectDB } from "@/lib/mongodb";
import Products from "@/models/Product";
import Categories from "@/models/Category";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const search = url.searchParams.get("search") || "";
  const categorySlug = url.searchParams.get("category");
  const bestseller = url.searchParams.get("bestseller");
  const sort = url.searchParams.get("sort");
  const limit = Number(url.searchParams.get("limit") || 50);

  try {
    if (id) {
      const product = await Products.findById(id).lean();
      if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(product), { status: 200 });
    }

    const filter = {};

    // Search by title
    if (search) filter.title = { $regex: search, $options: "i" };

    // Filter by category
    if (categorySlug) {
      const categoryDoc = await Categories.findOne({
        slug: categorySlug,
      }).lean();
      if (categoryDoc) filter.category = categoryDoc.name;
      else return new Response(JSON.stringify([]), { status: 200 });
    }

    // Filter by bestseller
    if (bestseller === "true") filter.bestseller = true;

    let query = Products.find(filter).limit(limit);

    // Sorting
    if (sort === "low") query = query.sort({ price: 1 });
    else if (sort === "high") query = query.sort({ price: -1 });
    else if (sort === "new") query = query.sort({ createdAt: -1 });
    else if (sort === "best") query = query.sort({ sold: -1 });

    const products = await query.lean();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}

export async function POST(req) {
  await connectDB();
  const user = await currentUser();

  if (!user || user.publicMetadata?.role !== "admin") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  try {
    const body = await req.json();
    const product = await Products.create(body);
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}
