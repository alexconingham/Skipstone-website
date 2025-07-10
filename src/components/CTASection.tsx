'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from './AnimatedSection'

interface CTASectionProps {
  className?: string
}

export default function CTASection({ className = '' }: CTASectionProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return

    setIsLoading(true)
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section 
      id="steam-cta"
      className={`relative py-24 px-4 overflow-hidden ${className}`}
      aria-labelledby="cta-heading"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedSection animation="scaleIn" delay={200}>
          <h2 
            id="cta-heading"
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Begin Your Journey
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={400}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Wishlist Remember to Die on Steam and be the first to experience this haunting tactical roguelike.
          </p>
        </AnimatedSection>

        {/* Steam Wishlist CTA */}
        <AnimatedSection animation="slideUp" delay={600}>
          <div className="mb-16">
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              aria-label="Wishlist Remember to Die on Steam"
            >
              <Image
                src="/steam.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-auto group-hover:scale-110 transition-transform duration-300"
              />
              <span>Wishlist on Steam</span>
              <svg 
                className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </AnimatedSection>

        {/* Newsletter Signup */}
        <AnimatedSection animation="slideUp" delay={800}>
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-6">
              Get exclusive updates, behind-the-scenes content, and early access opportunities.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe for Updates'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-gray-400">You're now subscribed to our updates.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Social Proof */}
        <AnimatedSection animation="fadeIn" delay={1000}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">1000+</div>
              <div className="text-gray-400">Wishlists</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-gray-400">Hours of Content</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">∞</div>
              <div className="text-gray-400">Replayability</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
} 