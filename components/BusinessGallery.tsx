'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BusinessGalleryProps {
  businessName: string
  images?: string[]
}

export default function BusinessGallery({ businessName, images }: BusinessGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const galleryImages = images || [
    'https://placehold.co/800x600/3b82f6/ffffff?text=Image1',
    'https://placehold.co/800x600/8b5cf6/ffffff?text=Image2',
    'https://placehold.co/800x600/10b981/ffffff?text=Image3'
  ]

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
      <div className="relative h-96 w-full">
        <Image
          src={galleryImages[selectedImage]}
          alt="Business image"
          fill
          className="object-cover"
        />
      </div>
      
      {galleryImages.length > 1 && (
        <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2"
            >
              <Image
                src={img}
                alt="Thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
