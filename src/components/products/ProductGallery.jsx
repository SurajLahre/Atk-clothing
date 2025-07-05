import React, { useState } from 'react';

const ProductGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Thumbnail Column */}
      <div className="order-2 md:order-1 md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] py-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`border rounded-md overflow-hidden flex-shrink-0 w-16 h-16 md:w-full md:h-20 ${
              mainImage === image ? 'border-atku-brand' : 'border-gray-200'
            }`}
            onClick={() => setMainImage(image)}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 md:col-span-4">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt="Product main view"
            className="w-full h-[300px] md:h-[500px] object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
