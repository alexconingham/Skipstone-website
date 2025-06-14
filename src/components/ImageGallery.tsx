'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  items: Array<{
    file: string, 
    name: string, 
    rarity?: string,
    description?: string,
    effect?: string,
    lore?: string,
    stats?: string,
    immune?: string,
    weak?: string,
    effect_description?: string,
    tooltip?: string,
    traits?: string
  }>
  folder: string
  direction?: "left" | "right"
  size?: "small" | "medium" | "large" | "extra-large" | "massive"
  galleryId?: string
  showTooltips?: boolean
}

export default function ImageGallery({ 
  items, 
  folder, 
  direction = "right", 
  size = "medium",
  galleryId = "",
  showTooltips = true
}: ImageGalleryProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const sizeClasses = {
    small: "w-10 h-10",           // 40x40px - Small mementos
    medium: "w-12 h-12",          // 48x48px - Medium items  
    large: "w-16 h-12",           // 64x48px - Large items
    "extra-large": "w-20 h-20",   // 80x80px - Extra large items
    "massive": "w-48 h-32"        // 192x128px - Smaller dungeons
  }

  const containerHeights = {
    small: "h-12",        // 48px
    medium: "h-16",       // 64px  
    large: "h-16",        // 64px
    "extra-large": "h-24", // 96px
    "massive": "h-40"     // 160px
  }

  // Rarity color mapping for borders
  const rarityColors = {
    common: "border-white",       // White border for common items
    rare: "border-purple-400",    // Purple border for rare items  
    relic: "border-yellow-400"    // Gold border for relic items
  }

  const fallbackImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5Qjk5IiBmb250LXNpemU9IjE0cHgiPj88L3RleHQ+Cjwvc3ZnPgo="

  const animationClass = direction === "left" ? "gallery-scroll-left" : "gallery-scroll-right"
  const galleryClass = `gallery-${galleryId}`

  // Reduce duplicates to improve performance - still seamless but fewer images to load
  const multipliedItems = [...items, ...items, ...items]

  const getBorderClasses = (item: any) => {
    if ((folder === 'dice' || folder === 'mementos' || folder === 'watches') && item.rarity) {
      const rarityColor = rarityColors[item.rarity as keyof typeof rarityColors] || "border-gray-700"
      
      // Get matching shadow color for the rarity
      const shadowColor = item.rarity === 'common' ? 'group-hover:shadow-white/50' :
                         item.rarity === 'rare' ? 'group-hover:shadow-purple-400/50' :
                         item.rarity === 'relic' ? 'group-hover:shadow-yellow-400/50' : 
                         'group-hover:shadow-gray-500/50'
      
      return `border-2 ${rarityColor} group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl ${shadowColor}`
    }
    return "border-2 border-gray-700 group-hover:border-gray-500 transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-xl"
  }

  // Image protection handlers
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
    return false
  }

  const handleSelectStart = (e: any) => {
    e.preventDefault()
    return false
  }

  const renderTooltipContent = (item: any) => {
    return (
      <div className="tooltip-content">
        <div className="font-bold text-white mb-1">{item.name}</div>
        
        {/* Rarity for dice, mementos, and watches */}
        {item.rarity && (folder === 'dice' || folder === 'mementos' || folder === 'watches') && (
          <div className={`text-sm font-medium mb-2 ${
            item.rarity === 'common' ? 'text-white' :
            item.rarity === 'rare' ? 'text-purple-300' :
            item.rarity === 'relic' ? 'text-yellow-300' : 'text-gray-300'
          }`}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </div>
        )}

        {/* Stats for enemies */}
        {item.stats && folder === 'portraits' && (
          <div className="text-sm text-gray-300 mb-1">
            <span className="text-red-400">Stats:</span> {item.stats}
          </div>
        )}

        {/* Traits for enemies */}
        {item.traits && folder === 'portraits' && (
          <div className="text-sm text-blue-300 mb-1">
            <span className="text-blue-400">Traits:</span> {item.traits}
          </div>
        )}

        {/* Effect description for dice */}
        {item.description && folder === 'dice' && (
          <div className="text-sm text-gray-300 mb-2">
            <span className="text-green-400">Effect:</span> {item.description}
          </div>
        )}

        {/* Tooltip for mementos */}
        {item.tooltip && folder === 'mementos' && (
          <div className="text-sm text-gray-300 mb-2">
            <span className="text-green-400">Effect:</span> {item.tooltip}
          </div>
        )}

        {/* Effect description for watches */}
        {item.effect_description && folder === 'watches' && (
          <div className="text-sm text-gray-300 mb-2">
            <span className="text-green-400">Effect:</span> {item.effect_description}
          </div>
        )}

        {/* Description for enemies, mementos, and watches */}
        {item.description && (folder === 'portraits' || folder === 'mementos' || folder === 'watches') && (
          <div className="text-sm text-gray-400 italic border-t border-gray-600 pt-2 mt-2">
            "{item.description}"
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`w-full ${containerHeights[size]} overflow-visible ${galleryClass} relative`}>
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
                onContextMenu={handleContextMenu}
                {...({ onSelectStart: handleSelectStart } as any)}
              >
              <div className="relative">
                <Image
                  src={imagePath}
                  alt={item.name}
                  width={size === 'massive' ? 192 : size === 'extra-large' ? 80 : size === 'large' ? 64 : size === 'medium' ? 48 : 40}
                  height={size === 'massive' ? 128 : size === 'extra-large' ? 80 : size === 'large' ? 48 : size === 'medium' ? 48 : 40}
                  className={`${sizeClasses[size]} object-cover rounded-lg ${getBorderClasses(item)} select-none pointer-events-none`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage
                  }}
                  onDragStart={handleDragStart}
                  onContextMenu={handleContextMenu}
                  draggable={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    KhtmlUserSelect: 'none'
                  } as React.CSSProperties}
                />
                
                {/* Enhanced Tooltip with better positioning */}
                {showTooltips && hoveredItem === tooltipKey && (
                  <div className="tooltip-container-enhanced">
                    {renderTooltipContent(item)}
                    <div className="tooltip-arrow-enhanced"></div>
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