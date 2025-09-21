import { FileText, Hand, FlaskConical } from "lucide-react";

export default function ProductTabs({ product }) {
  const tabs = [
    {
      key: "description",
      label: "Description",
      content: product.fullDescription,
      icon: FileText,
    },
    {
      key: "howToUse",
      label: "How to Use",
      content: product.howToUse,
      icon: Hand,
    },
    {
      key: "ingredients",
      label: "Ingredients",
      content: product.ingredients,
      icon: FlaskConical,
    },
  ];

  return (
    <div className="mt-8 flex flex-col gap-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <details
            key={tab.key}
            className=" outline-1 rounded-lg shadow-sm group"
          >
            <summary className="flex justify-between items-center cursor-pointer px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-green-50 hover:text-green-800 text-gray-700 group-open:bg-green-100 group-open:text-green-800">
              <span className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
              <span className="text-xs font-bold">
                <span className="group-open:inline hidden">−</span>
                <span className="group-open:hidden inline">+</span>
              </span>
            </summary>

            <div className="px-4 py-3 text-sm text-gray-700 bg-white border-t">
              {tab.key === "ingredients" ? (
                <ul className="list-disc ml-5">
                  {tab.content?.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              ) : (
                <p>{tab.content}</p>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
