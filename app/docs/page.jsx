"use client"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-semibold text-white mb-6">Documentation</h1>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-medium text-white mb-3">Getting Started</h2>
              <p>Welcome to SalesFun.ai documentation. Learn how to use our AI-powered sales platform.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-3">API Reference</h2>
              <p>Comprehensive API documentation for integrating SalesFun.ai into your applications.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-3">Examples</h2>
              <p>Code examples and use cases to help you get started quickly.</p>
            </section>
          </div>

          <div className="mt-8">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-black/20 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-black/30 transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
