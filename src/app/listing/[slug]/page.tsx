// app/listing/[slug]/page.tsx
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch("https://ambitious-action-ddb9a91fb4.strapiapp.com/api/menu-items?populate=*");
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
    `https://ambitious-action-ddb9a91fb4.strapiapp.com/api/menu-items?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const item = json.data?.[0];

  if (!item) return notFound();

  // Simple and clean image URL handling based on debug results
  const getImageUrl = () => {
    if (item.image && Array.isArray(item.image) && item.image.length > 0) {
      const firstImage = item.image[0];
      if (firstImage.url) {
        return firstImage.url;
      }
    }
    return null;
  };

  const imageUrl = getImageUrl();

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
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <a href="/listing" className="hover:text-yellow-600 transition-colors">
                  Menu
                </a>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{item.title}</span>
              </li>
            </ol>
          </nav>

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
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
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
                  {descriptionText || "Delicious McDonald's menu item made with quality ingredients."}
                </p>
              </div>

              {/* Price */}
              {item.price && (
                <div className="pt-4">
                  <p className="text-2xl font-bold text-red-600">
                    ${item.price}
                  </p>
                </div>
              )}

              {/* Order Button */}
              <div className="pt-6">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors">
                  Add to Order
                </button>
              </div>

              {/* Additional Info (matching McDonald's style) */}
              <div className="pt-6 text-sm text-gray-500 space-y-2 border-t border-gray-200">
                <p>
                  Check out all the menu items and order one today from the{" "}
                  <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                    full menu in the app
                  </span>{" "}
                  for pickup or delivery.
                </p>
                <p className="text-xs">
                  *At participating restaurants. Delivery/other fees may apply.
                </p>
              </div>

              {/* Nutritional Info Disclaimer */}
              <div className="pt-4 text-xs text-gray-400 border-t border-gray-100">
                <p>
                  Nutritional information is based on standard product formulations. 
                  Variation may occur due to differences in suppliers, ingredient 
                  substitutions, recipe revisions, and/or seasonal changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}