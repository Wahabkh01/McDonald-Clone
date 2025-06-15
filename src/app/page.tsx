// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-red-600 to-red-700">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                I'm lovin' it
              </h1>
              <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
                Discover our full menu of delicious favorites, from breakfast to late night, 
                and everything in between.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/listing"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors inline-block"
                >
                  View Full Menu
                </Link>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-400 rounded-full opacity-10"></div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              What's Your Craving?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link 
                href="/listing" 
                className="group bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <span className="text-2xl">🍔</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Burgers
                </h3>
              </Link>

              <Link 
                href="/listing" 
                className="group bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <span className="text-2xl">🍗</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Chicken
                </h3>
              </Link>

              <Link 
                href="/listing" 
                className="group bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <span className="text-2xl">🥞</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Breakfast
                </h3>
              </Link>

              <Link 
                href="/listing" 
                className="group bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <span className="text-2xl">☕</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  McCafé
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}