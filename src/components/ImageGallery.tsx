'use client'

import { useState } from 'react'

interface ImageGalleryProps {
  items: Array<{file: string, name: string}>
  folder: string
  direction?: "left" | "right"
  size?: "small" | "medium" | "large" | "extra-large" | "massive"
  galleryId?: string
}

export default function ImageGallery({ 
  items, 
  folder, 
  direction = "right", 
  size = "medium",
  galleryId = ""
}: ImageGalleryProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const sizeClasses = {
    small: "w-16 h-16",           // 64x64px - Small mementos
    medium: "w-20 h-20",          // 80x80px - Medium items  
    large: "w-24 h-20",           // 96x80px - Large items
    "extra-large": "w-32 h-32",   // 128x128px - Extra large items
    "massive": "w-96 h-80"        // 384x320px - 4x larger for dungeons (4x of 96x80)
  }

  const containerHeights = {
    small: "h-20",        // 80px
    medium: "h-24",       // 96px  
    large: "h-24",        // 96px
    "extra-large": "h-36", // 144px
    "massive": "h-96"     // 384px (4x larger with padding)
  }

  const fallbackImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5Qjk5IiBmb250LXNpemU9IjE0cHgiPj88L3RleHQ+Cjwvc3ZnPgo="

  const animationClass = direction === "left" ? "gallery-scroll-left" : "gallery-scroll-right"
  const galleryClass = `gallery-${galleryId}`

  // Create multiple duplicates for seamless infinite scrolling
  // The more items we have, the smoother the infinite loop appears
  const multipliedItems = [...items, ...items, ...items, ...items]

  return (
    <div className={`w-full ${containerHeights[size]} overflow-hidden ${galleryClass} relative`}>
      <div className={`flex space-x-4 ${animationClass} gallery-scroll`}>
        {multipliedItems.map((item, index) => {
          const tooltipKey = `${folder}-${item.name}-${index}`
          const imagePath = `/${folder}/${item.file}`
          
          return (
            <div
              key={`${item.file}-${index}`}
              className="relative flex-shrink-0 group"
              onMouseEnter={() => setHoveredItem(tooltipKey)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <img
                  src={imagePath}
                  alt={item.name}
                  className={`${sizeClasses[size]} object-cover rounded-lg border-2 border-gray-700 group-hover:border-gray-500 transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-xl`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage
                  }}
                />
                
                {/* Tooltip */}
                {hoveredItem === tooltipKey && (
                  <div className="tooltip-container">
                    {item.name}
                    <div className="tooltip-arrow"></div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 