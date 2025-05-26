// src/components/ProductDetail.tsx
interface Props {
    item: any;
  }
  
  export default function ProductDetail({ item }: Props) {
    const imageUrl = item.attributes.image?.data?.attributes?.url;
  
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Two-column layout matching McDonald's style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Product Image */}
            <div>
              {imageUrl ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <img
                    src={imageUrl}
                    alt={item.attributes.title}
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
            <div className="space-y-6">
              {/* Product Name */}
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                {item.attributes.title}
              </h1>
  
              {/* Calories (if available) */}
              {item.attributes.calories && (
                <p className="text-lg text-gray-600 font-medium">
                  {item.attributes.calories} Cal.
                </p>
              )}
  
              {/* Description */}
              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.attributes.description}
                </p>
              </div>
  
              {/* Price */}
              <div className="pt-4">
                <p className="text-2xl font-bold text-red-600">
                  ${item.attributes.price}
                </p>
              </div>
  
              {/* Additional Info */}
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