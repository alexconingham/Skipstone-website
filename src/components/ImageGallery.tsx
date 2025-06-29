'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
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
  
  // Drag functionality state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset manual scrolling after a delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isManuallyScrolling) {
      timeoutId = setTimeout(() => {
        setIsManuallyScrolling(false)
        setScrollOffset(0)
      }, 3000) // Resume auto-scroll after 3 seconds of no interaction
    }
    return () => clearTimeout(timeoutId)
  }, [isManuallyScrolling])

  const sizeClasses = {
    small: "w-12 h-12",           // 48x48px - Small mementos
    medium: "w-16 h-16",          // 64x64px - Medium items  
    large: "w-20 h-16",           // 80x64px - Large items
    "extra-large": "w-28 h-28",   // 112x112px - Extra large items
    "massive": "w-64 h-40"        // 256x160px - Large dungeons
  }

  const containerHeights = {
    small: "h-16",        // 64px
    medium: "h-20",       // 80px  
    large: "h-20",        // 80px
    "extra-large": "h-32", // 128px
    "massive": "h-48"     // 192px
  }

  // Rarity color mapping for borders with WCAG AA compliant contrast
  const rarityColors = {
    common: "border-gray-300",       // Better contrast for common items
    rare: "border-purple-300",       // Improved contrast for rare items  
    relic: "border-yellow-300"       // Better contrast for relic items
  }

  const fallbackImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5Qjk5IiBmb250LXNpemU9IjE0cHgiPj88L3RleHQ+Cjwvc3ZnPgo="

  const animationClass = direction === "left" ? "gallery-scroll-left" : "gallery-scroll-right"
  const galleryClass = `gallery-${galleryId}`

  // Reduce duplicates to improve performance - still seamless but fewer images to load
  const multipliedItems = [...items, ...items, ...items]

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setIsManuallyScrolling(true)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStart
    setScrollOffset(deltaX)
    e.preventDefault()
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setIsManuallyScrolling(true)
    e.preventDefault()
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    
    const deltaX = e.touches[0].clientX - dragStart
    setScrollOffset(deltaX)
    e.preventDefault()
  }, [isDragging, dragStart])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const getBorderClasses = useCallback((item: any) => {
    if ((folder === 'dice' || folder === 'mementos' || folder === 'watches') && item.rarity) {
      const rarityColor = rarityColors[item.rarity as keyof typeof rarityColors] || "border-gray-400"
      
      // Get matching shadow color for the rarity with better contrast
      const shadowColor = item.rarity === 'common' ? 'group-hover:shadow-gray-300/50' :
                         item.rarity === 'rare' ? 'group-hover:shadow-purple-300/50' :
                         item.rarity === 'relic' ? 'group-hover:shadow-yellow-300/50' : 
                         'group-hover:shadow-gray-400/50'
      
      return `border-2 ${rarityColor} group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl ${shadowColor}`
    }
    return "border-2 border-gray-500 group-hover:border-gray-400 transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-xl"
  }, [folder])

  // Image protection handlers
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }, [])

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    return false
  }, [])

  const handleSelectStart = useCallback((e: any) => {
    e.preventDefault()
    return false
  }, [])

  const renderTooltipContent = useCallback((item: any) => {
    return (
      <div className="tooltip-content" role="tooltip" aria-live="polite">
        <div className="font-bold text-white mb-1">{item.name}</div>
        
        {/* Rarity for dice, mementos, and watches */}
        {item.rarity && (folder === 'dice' || folder === 'mementos' || folder === 'watches') && (
          <div className={`text-sm font-medium mb-2 ${
            item.rarity === 'common' ? 'text-gray-200' :
            item.rarity === 'rare' ? 'text-purple-200' :
            item.rarity === 'relic' ? 'text-yellow-200' : 'text-gray-200'
          }`}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </div>
        )}

        {/* Stats for enemies */}
        {item.stats && folder === 'portraits' && (
          <div className="text-sm text-gray-200 mb-1">
            <span className="text-red-300">Stats:</span> {item.stats}
          </div>
        )}

        {/* Traits for enemies */}
        {item.traits && folder === 'portraits' && (
          <div className="text-sm text-blue-200 mb-1">
            <span className="text-blue-300">Traits:</span> {item.traits}
          </div>
        )}

        {/* Effect description for dice */}
        {item.description && folder === 'dice' && (
          <div className="text-sm text-gray-200 mb-2">
            <span className="text-green-300">Effect:</span> {item.description}
          </div>
        )}

        {/* Tooltip for mementos */}
        {item.tooltip && folder === 'mementos' && (
          <div className="text-sm text-gray-200 mb-2">
            <span className="text-green-300">Effect:</span> {item.tooltip}
          </div>
        )}

        {/* Effect description for watches */}
        {item.effect_description && folder === 'watches' && (
          <div className="text-sm text-gray-200 mb-2">
            <span className="text-green-300">Effect:</span> {item.effect_description}
          </div>
        )}

        {/* Description for enemies, mementos, and watches */}
        {item.description && (folder === 'portraits' || folder === 'mementos' || folder === 'watches') && (
          <div className="text-sm text-gray-300 italic border-t border-gray-500 pt-2 mt-2">
            "{item.description}"
          </div>
        )}
      </div>
    )
  }, [folder])

  const getDimensions = useCallback(() => {
    switch (size) {
      case 'massive': return { width: 256, height: 160 }
      case 'extra-large': return { width: 112, height: 112 }
      case 'large': return { width: 80, height: 64 }
      case 'medium': return { width: 64, height: 64 }
      case 'small': return { width: 48, height: 48 }
      default: return { width: 64, height: 64 }
    }
  }, [size])

  const { width, height } = getDimensions()

  return (
    <div 
      ref={containerRef}
      className={`w-full ${containerHeights[size]} overflow-visible ${galleryClass} relative cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
      role="region"
      aria-label={`${folder} gallery`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        ref={scrollRef}
        className={`flex space-x-4 ${isManuallyScrolling ? '' : animationClass} gallery-scroll`}
        style={{
          transform: isManuallyScrolling ? `translateX(${scrollOffset}px)` : undefined,
          transition: isManuallyScrolling ? 'none' : undefined
        }}
      >
        {multipliedItems.map((item, index) => {
          const tooltipKey = `${folder}-${item.name}-${index}`
          const imagePath = `/${folder}/${item.file}`
          
          // Determine if this is a decorative or meaningful image
          const isDecorative = !showTooltips && !item.description
          const altText = isDecorative ? "" : `${item.name}${item.description ? ` - ${item.description}` : ""}`
          
          return (
            <div
              key={`${item.file}-${index}`}
              className="relative flex-shrink-0 group"
              onMouseEnter={() => !isDragging && setHoveredItem(tooltipKey)}
              onMouseLeave={() => setHoveredItem(null)}
              onContextMenu={handleContextMenu}
              {...({ onSelectStart: handleSelectStart } as any)}
              role={showTooltips ? "button" : "img"}
              tabIndex={showTooltips ? 0 : -1}
              aria-label={showTooltips ? `View details for ${item.name}` : altText}
            >
              <div className="relative">
                <Image
                  src={imagePath}
                  alt={altText}
                  width={width}
                  height={height}
                  className={`${sizeClasses[size]} object-cover rounded-lg ${getBorderClasses(item)} select-none pointer-events-none`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage
                  }}
                  onDragStart={handleDragStart}
                  onContextMenu={handleContextMenu}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  sizes={
                    size === 'massive' ? "(max-width: 768px) 200px, 256px" :
                    size === 'extra-large' ? "(max-width: 768px) 80px, 112px" :
                    size === 'large' ? "(max-width: 768px) 64px, 80px" :
                    size === 'medium' ? "(max-width: 768px) 48px, 64px" :
                    "(max-width: 768px) 32px, 48px"
                  }
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    KhtmlUserSelect: 'none'
                  } as React.CSSProperties}
                />
                
                {/* Tooltip */}
                {showTooltips && hoveredItem === tooltipKey && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl border border-gray-600 max-w-xs z-50 pointer-events-none">
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                    {renderTooltipContent(item)}
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