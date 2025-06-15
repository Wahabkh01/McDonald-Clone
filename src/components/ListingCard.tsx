// src/components/ListingCard.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  item: any;
}

export default function ListingCard({ item }: Props) {
  // Fix: Access image directly from item, not item.attributes
  // The image structure from your API is: item.image (array or object)
  const getImageUrl = () => {
    // Handle different possible image structures from Strapi
    if (item.image) {
      // If image is an array, take the first one
      if (Array.isArray(item.image) && item.image.length > 0) {
        const imageObj = item.image[0];
        return imageObj.url || imageObj.data?.attributes?.url;
      }
      // If image is an object
      if (item.image.data?.attributes?.url) {
        return item.image.data.attributes.url;
      }
      // Direct URL
      if (item.image.url) {
        return item.image.url;
      }
    }
    return null;
  };

  const imageUrl = getImageUrl();

  console.log("Item in ListingCard:", item);
  console.log("Image URL:", imageUrl);

  // Extract plain text from nested rich-text field
  const rawDescription = item.description?.[0]?.children?.[0]?.text || "";
  const shortDescription =
    rawDescription.length > 100
      ? rawDescription.substring(0, 100) + "..."
      : rawDescription;

  return (
    <Link href={`/listing/${item.slug}`}>
      <div className="group cursor-pointer">
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
          {/* Image Container - Square aspect ratio like McDonald's */}
          <div className="relative w-full aspect-square bg-gray-50 p-8 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={
                  imageUrl.startsWith('http') 
                    ? imageUrl 
                    : `https://ambitious-action-ddb9a91fb4.strapiapp.com${imageUrl}`
                }
                alt={item.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  console.log("Image failed to load:", imageUrl);
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Product Name - Centered and styled like McDonald's */}
          <div className="px-6 pb-6 mt-auto">
            <h3 className="text-xl font-bold text-center text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem] flex items-center justify-center mb-3">
              {item.title}
            </h3>
            
            {/* Price and Calories */}
            {(item.price || item.calories) && (
              <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                {item.price && (
                  <span className="font-semibold">${item.price}</span>
                )}
                {item.price && item.calories && <span>•</span>}
                {item.calories && (
                  <span>{item.calories} Cal</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}