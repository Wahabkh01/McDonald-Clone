// src/components/ListingCard.tsx
import Link from "next/link";

interface Props {
  item: any;
}

export default function ListingCard({ item }: Props) {
  const imageUrl = item.image?.[0]?.url;

  // Extract plain text from nested rich-text field
  const rawDescription = item.description?.[0]?.children?.[0]?.text || "";
  const shortDescription =
    rawDescription.length > 100
      ? rawDescription.substring(0, 100) + "..."
      : rawDescription;

  return (
    <Link href={`/listing/${item.slug}`}>
      <div className="group cursor-pointer">
        {/* Image Container - Square aspect ratio like McDonald's */}
        <div className="relative w-full aspect-square mb-6 bg-white rounded-lg overflow-hidden">
          {imageUrl ? (
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={item.title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Product Name - Centered and styled like McDonald's */}
        <h3 className="text-xl font-semibold text-center text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}