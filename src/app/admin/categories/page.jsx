// app/admin/categories/page.jsx
import { currentUser } from "@clerk/nextjs/server";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata?.role !== "admin") {
    return <p className="text-center mt-16">Unauthorized</p>;
  }

  return <CategoryManager />;
}
