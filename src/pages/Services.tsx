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

const services = [
  {
    emoji: '🏠',
    title: 'Pet Boarding',
    color: colors.indigo,
    tagline: 'A home away from home',
    description: 'Safe, comfortable, and supervised boarding for your pets while you\'re away. Our certified staff ensures your pet receives proper care, nutrition, and attention around the clock.',
    features: [
      'Private and shared boarding suites',
      'Daily exercise and playtime',
      'Veterinary staff on call',
      'Real-time updates for owners',
      'Medication administration if needed',
      'Suitable for dogs, cats, and small animals',
    ],
    price: 'Starting at ₱500/night',
  },
  {
    emoji: '🚗',
    title: 'Pet Transport',
    color: colors.teal,
    tagline: 'Safe rides for your furry family',
    description: 'Stress-free and comfortable transportation for your pets — whether it\'s a vet visit, grooming appointment, or relocation. All vehicles are climate-controlled and pet-friendly.',
    features: [
      'Climate-controlled vehicles',
      'GPS-tracked rides',
      'Trained pet transport handlers',
      'Door-to-door service',
      'Available for all pet sizes',
      'Emergency transport available',
    ],
    price: 'Starting at ₱300/trip',
  },
  {
    emoji: '✂️',
    title: 'Pet Grooming',
    color: colors.coral,
    tagline: 'Looking good, feeling great',
    description: 'Professional grooming services to keep your pet clean, healthy, and happy. From basic baths to full grooming packages, our groomers are trained for all breeds and species.',
    features: [
      'Bath and blow dry',
      'Haircut and styling',
      'Nail trimming and filing',
      'Ear cleaning',
      'Teeth brushing',
      'De-shedding treatment',
    ],
    price: 'Starting at ₱400/session',
  },
  {
    emoji: '🍽️',
    title: 'Pet Restaurant',
    color: colors.amber,
    tagline: 'Nutritious meals crafted with love',
    description: 'Freshly prepared, nutritionist-approved meals for your pets. Our pet restaurant offers dine-in for owners and their pets, as well as meal delivery and catering for special occasions.',
    features: [
      'Freshly cooked daily meals',
      'Breed and age-specific menus',
      'Allergy-friendly options',
      'Owner and pet dine-in experience',
      'Meal delivery service',
      'Birthday and special event catering',
    ],
    price: 'Starting at ₱150/meal',
  },
]

export default function Services() {
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/specialists')}
            className="text-sm font-medium hover:opacity-70 transition-opacity hidden md:block"
            style={{ color: colors.textSecondary }}
          >
            Specialists
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm font-medium hover:opacity-70 transition-opacity hidden md:block"
            style={{ color: colors.textSecondary }}
          >
            Shop
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
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
          style={{ backgroundColor: colors.coral }}
        >
          🐾 Our Services
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Everything your pet needs
        </h1>
        <p className="text-base leading-relaxed" style={{ color: colors.textSecondary }}>
          From boarding and grooming to transport and dining — Zovena offers a complete
          suite of services designed to keep your pet happy, healthy, and well cared for.
        </p>
      </section>

      {/* Services List */}
      <section className="px-8 pb-20 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {services.map(service => (
            <div
              key={service.title}
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              {/* Service Header */}
              <div
                className="p-6 flex items-center gap-4"
                style={{ backgroundColor: `${service.color}12` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  {service.emoji}
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                    {service.title}
                  </p>
                  <p className="text-sm font-medium" style={{ color: service.color }}>
                    {service.tagline}
                  </p>
                </div>
                <span
                  className="ml-auto text-xs font-medium px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: service.color }}
                >
                  {service.price}
                </span>
              </div>

              {/* Service Body */}
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: colors.textSecondary }}>
                  {service.description}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <span style={{ color: service.color }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-6 text-sm font-medium text-white px-5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: service.color }}
                >
                  Book {service.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-8 py-16 text-center border-t"
        style={{ backgroundColor: colors.indigo }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to book a service?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#c7d2fe' }}>
          Sign up for Zovena and access all our pet care services in one place.
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
          <button onClick={() => navigate('/specialists')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Specialists</button>
          <button onClick={() => navigate('/shop')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Shop</button>
        </div>
        <p>© 2026 Joanne Costo. All rights reserved.</p>
      </footer>

    </div>
  )
}