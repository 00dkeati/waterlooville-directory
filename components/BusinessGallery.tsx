'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BusinessGalleryProps {
  businessName: string
  images?: string[]
}

export default function BusinessGallery({ businessName, images }: BusinessGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Default placeholder images if none provided
  const galleryImages = images || [
    `https://placehold.co/800x600/3b82f6/ffffff?text=${encodeURIComponent(businessName)}`,
    `https://placehold.co/800x600/8b5cf6/ffffff?text=Interior`,
    `https://placehold.co/800x600/10b981/ffffff?text=Services`
  ]

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
      {/* Main Image */}
      <div className="relative h-96 w-full">
        <Image
          src={galleryImages[selectedImage]}
          alt={`${businessName} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Thumbnail Strip */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition ${
                index === se
// app/page.tsx
import HeroImage from '@/components/HeroImage'
import AreaImageCard from '@/components/AreaImageCard'
import CategoryImageCard from '@/components/CategoryImageCard'

export default async function HomePage() {
  // ... your existing code

  return (
    <div className="min-h-screen">
      <HeroImage />
      
      {/* Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Browse by Area</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {areas.map(area => (
            <AreaImageCard
              key={area.id}
              name={area.name}
              slug={area.slug}
              description={area.description}
              businessCount={12} // Calculate from your data
            />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryImageCard
              key={category.id}
              name={category.name}
# Update next.config.js to allow external images
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
}

module.exports = nextConfig
