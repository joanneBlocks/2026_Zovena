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

const boardingOptions = [
  {
    emoji: '🛏️',
    title: 'Standard Suite',
    description: 'Comfortable private room with a cozy bed, toys, and daily walks. Perfect for solo pets.',
    price: '₱500/night',
    features: ['Private room', 'Daily walks', 'Feeding included', 'Basic grooming'],
    color: colors.indigo,
  },
  {
    emoji: '⭐',
    title: 'Premium Suite',
    description: 'Spacious private suite with extra playtime, premium bedding, and live webcam access for owners.',
    price: '₱850/night',
    features: ['Spacious private suite', 'Live webcam access', 'Extra playtime', 'Premium meals', 'Daily report card'],
    color: colors.teal,
    tag: 'Most Popular',
  },
  {
    emoji: '👑',
    title: 'VIP Suite',
    description: 'The ultimate luxury experience for your pet. Private room with human-grade furniture, personal attendant, and spa treatments.',
    price: '₱1,500/night',
    features: ['Luxury private room', 'Personal attendant', 'Spa treatments', 'Gourmet meals', 'Live webcam', 'Daily photo updates'],
    color: colors.amber,
    tag: 'Best Experience',
  },
]

const faqs = [
  {
    question: 'What vaccinations are required for boarding?',
    answer: 'All pets must be up to date on core vaccinations including Rabies, DHPP for dogs, and FVRCP for cats. Proof of vaccination is required upon check-in.',
  },
  {
    question: 'Can I bring my pet\'s own food and belongings?',
    answer: 'Absolutely! We encourage owners to bring familiar items like toys, blankets, and preferred food to help pets feel at home.',
  },
  {
    question: 'How do I check in and check out?',
    answer: 'Check-in is from 8AM to 6PM and check-out is from 7AM to 12PM. Early check-in and late check-out are available for an additional fee.',
  },
  {
    question: 'Are there staff present overnight?',
    answer: 'Yes, our trained staff is present 24/7 to ensure your pet\'s safety and comfort throughout their stay.',
  },
]

export default function PetBoarding() {
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
            style={{ backgroundColor: colors.indigo }}
          >
            Book now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
          style={{ backgroundColor: colors.indigo }}
        >
          🏠 Pet Boarding
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          A home away from home<br />for your beloved pets
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: colors.textSecondary }}>
          Safe, comfortable, and supervised boarding for your pets while you're away.
          Our certified staff ensures your pet receives proper care, nutrition, and attention around the clock.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.indigo }}
          >
            Book a stay
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
            Why pet owners trust us
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { emoji: '🕐', label: '24/7 Staff', description: 'Always on watch' },
              { emoji: '🏥', label: 'Vet On Call', description: 'Health emergencies covered' },
              { emoji: '📹', label: 'Live Webcam', description: 'Watch anytime' },
              { emoji: '🍖', label: 'Premium Meals', description: 'Nutritious and fresh' },
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

      {/* Boarding Options */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
          Choose your suite
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
          All suites include daily exercise, feeding, and 24/7 supervision.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {boardingOptions.map(option => (
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

      {/* FAQ */}
      <section
        className="px-8 py-16 border-t"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: colors.textPrimary }}>
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div
                key={faq.question}
                className="p-5 rounded-2xl border"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
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
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-8 py-16 text-center border-t"
        style={{ backgroundColor: colors.indigo }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to book a stay?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#c7d2fe' }}>
          Sign up for Zovena and book your pet's boarding in minutes.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.card, color: colors.indigo }}
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