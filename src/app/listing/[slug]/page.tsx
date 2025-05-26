// app/listing/[slug]/page.tsx
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/menu-items?populate=*");
  const json = await res.json();
  const listings = json.data;

  if (!listings || !Array.isArray(listings)) return [];

  return listings.map((item: any) => ({
    slug: item.slug,
  }));
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `http://localhost:1337/api/menu-items?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const item = json.data?.[0];

  if (!item) return notFound();

  const imageUrl = item.image?.data?.attributes?.url
    ? `http://localhost:1337${item.image.data.attributes.url}`
    : item.image?.[0]?.url
    ? `http://localhost:1337${item.image[0].url}`
    : null;

  // Extract text from rich text description
  const getDescriptionText = (description: any[]): string => {
    if (!description || !Array.isArray(description)) return "";
    
    return description
      .map(block => {
        if (block.children && Array.isArray(block.children)) {
          return block.children
            .map((child: any) => child.text || "")
            .join("");
        }
        return "";
      })
      .join(" ");
  };

  const descriptionText = getDescriptionText(item.description);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Two-column layout like McDonald's product page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Product Image */}
          <div className="order-2 lg:order-1">
            {imageUrl ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-auto object-contain max-h-96"
                />
              </div>
            ) : (
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>

          {/* Right side - Product Information */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Product Name */}
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {item.title}
            </h1>

            {/* Calories (if available) */}
            {item.calories && (
              <p className="text-lg text-gray-600 font-medium">
                {item.calories} Cal.
              </p>
            )}

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                {descriptionText}
              </p>
            </div>

            {/* Price */}
            <div className="pt-4">
              <p className="text-2xl font-bold text-red-600">
                ${item.price}
              </p>
            </div>

            {/* Additional Info (matching McDonald's style) */}
            <div className="pt-4 text-sm text-gray-500 space-y-2">
              <p>
                Check out all the menu items and order one today from the{" "}
                <span className="text-blue-600 underline cursor-pointer">
                  full menu in the app
                </span>{" "}
                for pickup or delivery.
              </p>
              <p className="text-xs">
                *At participating restaurants. Delivery/other fees may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}