import { useNavigate } from 'react-router-dom'

const colors = {
  indigo: '#4F46E5',
  teal: '#14B8A6',
  amber: '#F59E0B',
  coral: '#FB7185',
  bg: '#F9FAFB',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
}

const transportOptions = [
  {
    emoji: '🚗',
    title: 'Standard Ride',
    description: 'Safe and comfortable transport for your pet to and from vet clinics, grooming salons, or boarding facilities.',
    price: '₱300/trip',
    features: ['Climate-controlled vehicle', 'Trained handler', 'Door-to-door service', 'Up to 2 pets'],
    color: colors.indigo,
  },
  {
    emoji: '🚐',
    title: 'Premium Ride',
    description: 'Spacious van with extra comfort features for larger pets or multiple animals. GPS-tracked for full transparency.',
    price: '₱550/trip',
    features: ['Spacious van', 'GPS tracking', 'Live updates to owner', 'Up to 4 pets', 'Anxiety-calming environment'],
    color: colors.teal,
    tag: 'Most Popular',
  },
  {
    emoji: '🚑',
    title: 'Emergency Transport',
    description: 'Priority transport for pets requiring urgent veterinary care. Available 24/7 with trained emergency handlers.',
    price: '₱1,000/trip',
    features: ['24/7 availability', 'Priority routing', 'Emergency-trained handler', 'Direct vet coordination', 'Oxygen support available'],
    color: colors.coral,
    tag: '24/7 Available',
  },
]

const faqs = [
  {
    question: 'How do I book a transport ride?',
    answer: 'Sign up for a Zovena account, select Pet Transport from the services menu, choose your ride type, and schedule your pickup time and destination.',
  },
  {
    question: 'Are the vehicles sanitized between rides?',
    answer: 'Yes, all vehicles are thoroughly cleaned and sanitized between each trip to ensure a safe and hygienic environment for every pet.',
  },
  {
    question: 'What if my pet is anxious during transport?',
    answer: 'Our handlers are trained to manage anxious pets. Premium rides include calming accessories and music. You may also bring your pet\'s familiar items.',
  },
  {
    question: 'Is there a weight or size limit for pets?',
    answer: 'Standard rides accommodate pets up to 25kg. For larger breeds or multiple pets, we recommend the Premium Ride which can handle pets up to 60kg.',
  },
]

export default function PetTransport() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.textPrimary, minHeight: '100vh' }}>

      {/* Navbar */}
      <nav
        className="w-full px-8 py-4 flex justify-between items-center border-b sticky top-0 z-10"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Zovena" className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => navigate('/services')}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            ← All Services
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: colors.textSecondary }}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.teal }}
          >
            Book now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
          style={{ backgroundColor: colors.teal }}
        >
          🚗 Pet Transport
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Safe rides for your<br />furry family members
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: colors.textSecondary }}>
          Stress-free and comfortable transportation for your pets — whether it's a vet visit,
          grooming appointment, or relocation. All vehicles are climate-controlled and pet-friendly.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.teal }}
          >
            Book a ride
          </button>
          <button
            onClick={() => navigate('/services')}
            className="text-sm font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-70"
            style={{ color: colors.textSecondary, border: `1px solid ${colors.border}` }}
          >
            View all services
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="px-8 py-16 border-y"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: colors.textPrimary }}>
            Why pet owners trust our transport
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { emoji: '🌡️', label: 'Climate Control', description: 'Comfortable temperature' },
              { emoji: '📍', label: 'GPS Tracked', description: 'Real-time location' },
              { emoji: '🧑‍✈️', label: 'Trained Handlers', description: 'Pet care certified' },
              { emoji: '🚨', label: 'Emergency Ready', description: '24/7 availability' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <p className="text-3xl mb-2">{item.emoji}</p>
                <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{item.label}</p>
                <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Options */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
          Choose your ride
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
          All rides include a trained handler and door-to-door service.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {transportOptions.map(option => (
            <div
              key={option.title}
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: colors.card, borderColor: option.color }}
            >
              <div
                className="px-6 py-4 flex justify-between items-center"
                style={{ backgroundColor: `${option.color}12` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <div>
                    <p className="font-bold" style={{ color: colors.textPrimary }}>{option.title}</p>
                    {option.tag && (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: option.color }}
                      >
                        {option.tag}
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-bold" style={{ color: option.color }}>{option.price}</p>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: colors.textSecondary }}>
                  {option.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {option.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <span style={{ color: option.color }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium text-white px-5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: option.color }}
                >
                  Book {option.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="px-8 py-16 border-t"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: colors.textPrimary }}>
            How it works
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { step: '01', title: 'Book your ride', description: 'Choose your ride type, set pickup and drop-off locations, and schedule your preferred time.', color: colors.teal },
              { step: '02', title: 'Get confirmed', description: 'Receive a booking confirmation with your handler\'s name and vehicle details.', color: colors.indigo },
              { step: '03', title: 'Track in real time', description: 'Follow your pet\'s journey live on the map and receive updates from your handler.', color: colors.amber },
              { step: '04', title: 'Safe arrival', description: 'Your pet arrives safely at the destination. You\'ll receive a completion notification with photos.', color: colors.coral },
            ].map(step => (
              <div
                key={step.step}
                className="p-5 rounded-2xl border flex gap-4 items-start"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.step}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: colors.textPrimary }}>{step.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10" style={{ color: colors.textPrimary }}>
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div
              key={faq.question}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <p className="font-semibold text-sm mb-2" style={{ color: colors.textPrimary }}>
                {faq.question}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-8 py-16 text-center border-t"
        style={{ backgroundColor: colors.teal }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to book a ride?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#99f6e4' }}>
          Sign up for Zovena and book safe, reliable transport for your pet today.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.card, color: colors.teal }}
        >
          Create free account →
        </button>
      </section>

      {/* Footer */}
      <footer
        className="px-8 py-6 text-center text-xs border-t"
        style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.textSecondary }}
      >
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Zovena" className="h-8 w-auto" />
        </div>
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <button onClick={() => navigate('/')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Home</button>
          <button onClick={() => navigate('/services')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Services</button>
          <button onClick={() => navigate('/specialists')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Specialists</button>
          <button onClick={() => navigate('/shop')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Shop</button>
        </div>
        <p>© 2026 Joanne Costo. All rights reserved.</p>
      </footer>

    </div>
  )
}