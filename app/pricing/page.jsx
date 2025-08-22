"use client"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      features: ["1,000 AI queries/month", "Basic analytics", "Email support"],
    },
    {
      name: "Pro",
      price: "$99",
      features: ["10,000 AI queries/month", "Advanced analytics", "Priority support", "Custom integrations"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited queries", "Custom AI models", "Dedicated support", "On-premise deployment"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-white mb-4">Pricing Plans</h1>
          <p className="text-white/60 text-lg">Choose the perfect plan for your sales team</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-6">
                {plan.price}
                <span className="text-sm font-normal text-white/60">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-white/80 flex items-center">
                    <svg className="w-4 h-4 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-200">
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-black/20 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-black/30 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
