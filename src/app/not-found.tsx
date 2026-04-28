export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <a 
          href="/" 
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  )
} 