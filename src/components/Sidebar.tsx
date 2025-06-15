// src/components/Sidebar.tsx
'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  featured?: boolean;

}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categorySlug: string) => void;
}

export default function Sidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: SidebarProps) {
  const featuredCategory = categories.find(cat => cat.featured);
  const regularCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="lg:w-80 bg-white">
      <div className="sticky top-4">
        {/* Featured Section Header */}
        {featuredCategory && (
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center space-x-3">
            <img 
              src={featuredCategory.icon || "https://mcdonalds.com.au/sites/mcdonalds.com.au/files/styles/news_header_image/public/news-images/Image%207.png?itok=IpgZHleF"} 
              alt="Featured" 
              className="w-12 h-12 rounded object-cover" 
            />
            <div>
              <h3 className="font-bold text-lg">Featured</h3>
              <p className="text-sm opacity-90">Favorites</p>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="border border-t-0 rounded-b-lg bg-white shadow-sm">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.slug)}
              className={`w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0 ${
                selectedCategory === category.slug 
                  ? 'bg-yellow-50 border-l-4 border-l-yellow-400' 
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">

                <div className="flex items-center space-x-2">
                  <span className="text-left font-medium text-gray-800 text-sm">
                    {category.name}
                  </span>
                  {category.hasTag && category.tagText && (
                    <div className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                      {category.tagText}
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}