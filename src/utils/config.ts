// Site configuration - supports multiple domains
export const getSiteConfig = () => {
  // Use environment variable if set, otherwise detect from hostname
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://rtd.skipstone.co.nz')
  
  return {
    baseUrl,
    siteName: 'Remember to Die',
    studioName: 'Skipstone Studios',
    studioUrl: 'https://skipstone.co.nz',
  }
}

// For server-side usage
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Default to subdomain for this deployment
  return 'https://rtd.skipstone.co.nz'
}

