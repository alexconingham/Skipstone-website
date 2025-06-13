'use client'

import { useEffect } from 'react'

export default function ImageProtection() {
  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault()
        return false
      }
      // Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
      // Ctrl+S
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        return false
      }
    }

    // Console obfuscation
    const obfuscateConsole = () => {
      // Override console methods
      const originalLog = console.log
      const originalWarn = console.warn
      const originalError = console.error
      
      console.log = () => {}
      console.warn = () => {}
      console.error = () => {}
      console.clear = () => {}
      console.dir = () => {}
      console.dirxml = () => {}
      console.table = () => {}
      console.trace = () => {}
      console.group = () => {}
      console.groupCollapsed = () => {}
      console.groupEnd = () => {}
      console.time = () => {}
      console.timeEnd = () => {}
      console.timeLog = () => {}
      console.count = () => {}
      console.countReset = () => {}
      console.assert = () => {}
      console.profile = () => {}
      console.profileEnd = () => {}

      // Detect DevTools
      let devtools = {
        open: false,
        orientation: null as string | null
      }

      const threshold = 160

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true
            // Redirect or show warning
            document.body.innerHTML = `
              <div style="
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: #000; 
                color: #fff; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-family: Arial, sans-serif;
                z-index: 999999;
              ">
                <div style="text-align: center;">
                  <h1>Developer Tools Detected</h1>
                  <p>Please close developer tools to continue.</p>
                  <button onclick="location.reload()" style="
                    background: #666; 
                    color: #fff; 
                    border: none; 
                    padding: 10px 20px; 
                    margin-top: 20px; 
                    cursor: pointer;
                    border-radius: 5px;
                  ">Reload Page</button>
                </div>
              </div>
            `
          }
        } else {
          devtools.open = false
        }
      }, 500)
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)

    // Initialize console obfuscation
    obfuscateConsole()

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
} 