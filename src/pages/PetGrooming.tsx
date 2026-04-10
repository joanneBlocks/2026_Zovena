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

const groomingPackages = [
  {
    emoji: '🛁',
    title: 'Basic Bath & Dry',
    description: 'A thorough bath using pet-safe shampoo, blow dry, and light brushing. Perfect for regular maintenance.',
    price: '₱400/session',
    features: ['Bath with pet-safe shampoo', 'Blow dry', 'Light brushing', 'Ear cleaning', 'Nail trim'],
    color: colors.indigo,
  },
  {
    emoji: '✂️',
    title: 'Full Groom Package',
    description: 'Complete grooming session including bath, haircut, styling, and finishing touches. Breed-specific cuts available.',
    price: '₱750/session',
    features: ['Full bath & blow dry', 'Haircut & styling', 'Nail filing', 'Ear cleaning', 'Teeth brushing', 'Paw balm treatment'],
    color: colors.teal,
    tag: 'Most Popular',
  },
  {
    emoji: '💆',
    title: 'Spa & Wellness',
    description: 'The ultimate pampering experience. Includes everything in the Full Groom plus deep conditioning, massage, and aromatherapy.',
    price: '₱1,200/session',
    features: ['Deep conditioning treatment', 'Aromatherapy bath', 'Relaxation massage', 'De-shedding treatment', 'Blueberry facial', 'Paw paraffin wax'],
    color: colors.coral,
    tag: 'Premium',
  },
]

const addOns = [
  { emoji: '💅', name: 'Nail Polish', price: '₱100' },
  { emoji: '🎀', name: 'Bow & Bandana', price: '₱80' },
  { emoji: '🦷', name: 'Dental Scaling', price: '₱350' },
  { emoji: '🌸', name: 'Flea Treatment', price: '₱250' },
  { emoji: '✨', name: 'Whitening Shampoo', price: '₱150' },
  { emoji: '🧴', name: 'Skin & Coat Serum', price: '₱200' },
]

const faqs = [
  {
    question: 'How often should I groom my pet?',
    answer: 'It depends on your pet\'s breed and coat type. Short-haired breeds can be groomed every 6-8 weeks, while long-haired breeds benefit from grooming every 4-6 weeks.',
  },
  {
    question: 'Are your grooming products safe for sensitive skin?',
    answer: 'Yes, we use hypoallergenic, pH-balanced, and vet-approved grooming products suitable for all skin types including sensitive and allergy-prone pets.',
  },
  {
    question: 'Do you groom cats and exotic animals?',
    answer: 'Yes! We groom dogs, cats, rabbits, guinea pigs, and other small animals. Our groomers are specially trained for feline and exotic pet handling.',
  },
  {
    question: 'How long does a grooming session take?',
    answer: 'A basic bath takes 45-60 minutes. A full groom takes 1.5-2 hours depending on breed and coat condition. Spa packages take 2.5-3 hours.',
  },
]

export default function PetGrooming() {
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
            style={{ backgroundColor: colors.coral }}
          >
            Book now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
          style={{ backgroundColor: colors.coral }}
        >
          ✂️ Pet Grooming
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Looking good,<br />feeling great
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: colors.textSecondary }}>
          Professional grooming services to keep your pet clean, healthy, and happy.
          From basic baths to full spa packages, our certified groomers are trained
          for all breeds and species.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.coral }}
          >
            Book a session
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
            Why pet owners love our groomers
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { emoji: '🏅', label: 'Certified Groomers', description: 'Professionally trained' },
              { emoji: '🌿', label: 'Natural Products', description: 'Safe for all skin types' },
              { emoji: '😌', label: 'Stress-Free', description: 'Calm environment' },
              { emoji: '📸', label: 'After Photos', description: 'Sent to your phone' },
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

      {/* Grooming Packages */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
          Grooming packages
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
          All packages include a post-groom report and photo sent to your Zovena account.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {groomingPackages.map(pkg => (
            <div
              key={pkg.title}
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: colors.card, borderColor: pkg.color }}
            >
              <div
                className="px-6 py-4 flex justify-between items-center"
                style={{ backgroundColor: `${pkg.color}12` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pkg.emoji}</span>
                  <div>
                    <p className="font-bold" style={{ color: colors.textPrimary }}>{pkg.title}</p>
                    {pkg.tag && (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: pkg.color }}
                      >
                        {pkg.tag}
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-bold" style={{ color: pkg.color }}>{pkg.price}</p>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: colors.textSecondary }}>
                  {pkg.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {pkg.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <span style={{ color: pkg.color }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium text-white px-5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: pkg.color }}
                >
                  Book {pkg.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-Ons */}
      <section
        className="px-8 py-16 border-t"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
            Add-on services
          </h2>
          <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
            Customize your pet's grooming session with our à la carte extras.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {addOns.map(addon => (
              <div
                key={addon.name}
                className="p-4 rounded-2xl border flex items-center gap-3"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <span className="text-2xl">{addon.emoji}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{addon.name}</p>
                  <p className="text-xs font-medium" style={{ color: colors.coral }}>{addon.price}</p>
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
        style={{ backgroundColor: colors.coral }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to pamper your pet?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#fce7f3' }}>
          Sign up for Zovena and book a grooming session for your pet today.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.card, color: colors.coral }}
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