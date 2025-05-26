// src/app/listing/page.tsx
import ListingCard from "@/components/ListingCard";

export default async function ListingPage() {
  const res = await fetch("http://localhost:1337/api/menu-items?populate=image", {
    next: { revalidate: 60 },
  });

  const { data } = await res.json();

  console.log("Fetched listings:", { data });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Title */}
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-4">
          McDonald's Menu
        </h1>
        
        {/* Featured Favorites Subtitle */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Featured Favorites
        </h2>

        {/* Menu Grid - 3 columns to match reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {data?.map((item: any) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}