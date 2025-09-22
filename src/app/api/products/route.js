import { connectDB } from "@/lib/mongodb";
import Products from "@/models/Product";
import { currentUser } from "@clerk/nextjs/server";

/**
 * GET -> public: return all, filtered, or single product (via id query)
 * POST -> admin only
 */
export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const search = url.searchParams.get("search") || "";
  const category = url.searchParams.get("category");
  const bestseller = url.searchParams.get("bestseller");
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
    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (bestseller === "true") filter.bestseller = true;

    const products = await Products.find(filter).limit(limit).lean();
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
