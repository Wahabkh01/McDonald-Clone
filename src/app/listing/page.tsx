// src/app/listing/page.tsx
'use client';
import { useState, useEffect } from 'react';
import ListingCard from "@/components/ListingCard";
import Sidebar from "@/components/Sidebar";

interface MenuItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  price: number;
  description: any[];
  image: any[];
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    featured?: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  featured?: boolean;
}

interface ApiResponse {
  data: MenuItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function ListingPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all-menu');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch menu items with proper population
        const itemsRes = await fetch(
          "https://ambitious-action-ddb9a91fb4.strapiapp.com/api/menu-items?populate=*"
        );
        const itemsData: ApiResponse = await itemsRes.json();

        if (itemsData?.data?.length > 0) {
          setMenuItems(itemsData.data);
          
          // Extract unique categories from menu items
          const uniqueCategories = extractUniqueCategories(itemsData.data);
          setCategories(uniqueCategories);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Extract unique categories from menu items
  const extractUniqueCategories = (items: MenuItem[]): Category[] => {
    const categoryMap = new Map<number, Category>();
    
    items.forEach(item => {
      if (item.categories && Array.isArray(item.categories)) {
        item.categories.forEach(category => {
          if (!categoryMap.has(category.id)) {
            categoryMap.set(category.id, {
              id: category.id,
              name: category.name,
              slug: category.slug,
              featured: category.featured || false,
              icon: ''
            });
          }
        });
      }
    });
    
    return Array.from(categoryMap.values());
  };

  // Filter items based on selected category
  useEffect(() => {
    if (menuItems.length === 0) {
      setFilteredItems([]);
      return;
    }
    
    if (selectedCategory === 'all-menu') {
      // Show all menu items
      setFilteredItems(menuItems);
    } else if (selectedCategory === 'featured-favorites') {
      // For featured favorites, look for items with featured-favorites category
      const itemsWithFeaturedCategory = menuItems.filter(item => {
        return item.categories?.some(cat => cat.slug === 'featured-favorites') || false;
      });
      
      if (itemsWithFeaturedCategory.length > 0) {
        setFilteredItems(itemsWithFeaturedCategory);
      } else {
        // Fallback: show first few items
        setFilteredItems(menuItems.slice(0, 6));
      }
    } else {
      // Filter by selected category
      const filtered = menuItems.filter(item => {
        return item.categories?.some(cat => cat.slug === selectedCategory) || false;
      });
      
      setFilteredItems(filtered);
    }
  }, [selectedCategory, menuItems]);

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  const getCurrentCategoryName = () => {
    if (selectedCategory === 'all-menu') {
      return 'Full Menu';
    }
    if (selectedCategory === 'featured-favorites') {
      return 'Featured Favorites';
    }
    const category = categories.find(cat => cat.slug === selectedCategory);
    return category?.name || 'Menu Items';
  };

  // Group items by category for the bottom section
  const getItemsByCategory = () => {
    const grouped: { [key: string]: { category: Category; items: MenuItem[] } } = {};
    
    categories.forEach(category => {
      const categoryItems = menuItems.filter(item => 
        item.categories?.some(cat => cat.slug === category.slug)
      );
      
      if (categoryItems.length > 0) {
        grouped[category.slug] = {
          category,
          items: categoryItems
        };
      }
    });
    
    return grouped;
  };

  // Transform categories for sidebar - add All Menu and Featured Favorites (only one featured)
  const transformedCategories = [
    // Add All Menu as first category
    {
      id: -2,
      name: 'Full Menu',
      slug: 'all-menu',
      icon: '',
      featured: true
    },
    // Add other categories
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon || '',
      featured: cat.featured || false
    }))
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </main>
    );
  }

  const groupedItems = getItemsByCategory();

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-red-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">McDonald's Menu</h1>
          <p className="text-red-100 mt-2">{getCurrentCategoryName()}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Section: Sidebar + Filtered Products */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar 
              categories={transformedCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Filtered Products */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {getCurrentCategoryName()}
              </h2>
              <p className="text-gray-600">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ListingCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No items found in this category.</p>
                <button 
                  onClick={() => setSelectedCategory('all-menu')}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  View All Menu
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Full Menu Listings by Category (only show when "Full Menu" is selected) */}
        {selectedCategory === 'all-menu' && (
          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse by Category
            </h2>
            
            {Object.entries(groupedItems).map(([categorySlug, { category, items }]) => (
              <div key={categorySlug} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(categorySlug)}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    View All →
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.slice(0, 8).map((item) => (
                    <ListingCard key={`${categorySlug}-${item.id}`} item={item} />
                  ))}
                </div>
                
                {items.length > 8 && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setSelectedCategory(categorySlug)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                      View {items.length - 8} more {category.name.toLowerCase()}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Show specific category items when a category is selected */}
        {selectedCategory !== 'all-menu' && selectedCategory !== 'featured-favorites' && filteredItems.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              All {getCurrentCategoryName()}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ListingCard key={`full-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}