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

const photographyPackages = [
  {
    emoji: '📸',
    title: 'Mini Session',
    description: 'A 30-minute studio session perfect for a single pet. Includes 10 edited digital photos delivered within 3 days.',
    price: '₱1,500/session',
    features: ['30-minute session', '10 edited photos', 'Studio backdrop', 'Digital delivery', '3-day turnaround'],
    color: colors.indigo,
  },
  {
    emoji: '🎞️',
    title: 'Standard Session',
    description: 'A 1-hour session for pets and their owners. Includes 25 edited digital photos and one printed 8x10 photo.',
    price: '₱2,800/session',
    features: ['1-hour session', '25 edited photos', 'Studio & outdoor shots', 'Owner included', '1 printed 8x10', '5-day turnaround'],
    color: colors.teal,
    tag: 'Most Popular',
  },
  {
    emoji: '👑',
    title: 'Premium Session',
    description: 'A full 2-hour session with multiple setups, outfits, and locations. Includes 50 edited photos and a premium photo book.',
    price: '₱5,500/session',
    features: ['2-hour session', '50 edited photos', 'Multiple locations', 'Outfit changes', 'Premium photo book', 'Same-week delivery'],
    color: colors.amber,
    tag: 'Best Value',
  },
]

const specialSessions = [
  {
    emoji: '🎂',
    title: 'Birthday Session',
    description: 'Celebrate your pet\'s birthday with a themed photo session complete with props, balloons, and a birthday cake.',
    color: colors.coral,
  },
  {
    emoji: '🎄',
    title: 'Holiday Session',
    description: 'Seasonal themed sessions for Christmas, Valentine\'s Day, and other holidays. Perfect for greeting cards.',
    color: colors.indigo,
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Family Portrait',
    description: 'Include the whole family — humans and pets together. Perfect for annual family portraits and holiday cards.',
    color: colors.teal,
  },
  {
    emoji: '🌿',
    title: 'Outdoor Nature Session',
    description: 'On-location shoot at a park, beach, or nature spot of your choice. Natural light for stunning, candid shots.',
    color: colors.amber,
  },
]

const faqs = [
  {
    question: 'How do I prepare my pet for a photo session?',
    answer: 'We recommend grooming your pet a day before the session, bringing their favorite treats for motivation, and scheduling the session during their most active time of day.',
  },
  {
    question: 'What if my pet is shy or uncooperative?',
    answer: 'Our photographers are experienced with all temperaments. We use positive reinforcement, patience, and play to get natural, authentic shots from even the shyest pets.',
  },
  {
    question: 'Can I be in the photos with my pet?',
    answer: 'Absolutely! Our Standard and Premium packages include owner photos. We also offer family portrait sessions that include all household members.',
  },
  {
    question: 'How are the photos delivered?',
    answer: 'All edited photos are delivered via a private online gallery that you can download anytime. Printed products are shipped to your address within 7-10 business days.',
  },
]

export default function PetPhotography() {
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
            Book a session
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
          style={{ backgroundColor: colors.indigo }}
        >
          📸 Pet Photography
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Capture the moments<br />that matter most
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: colors.textSecondary }}>
          Professional pet photography that captures your pet's unique personality.
          From studio portraits to outdoor adventures — we create timeless memories
          you'll treasure forever.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.indigo }}
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
            Why pet owners love our photography
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { emoji: '🐾', label: 'Pet Specialists', description: 'Animal behaviour trained' },
              { emoji: '🎨', label: 'Pro Editing', description: 'Studio-quality retouching' },
              { emoji: '📦', label: 'Fast Delivery', description: 'Photos within days' },
              { emoji: '🖼️', label: 'Print Ready', description: 'High resolution files' },
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

      {/* Photography Packages */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
          Photography packages
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
          All packages include professional editing and digital delivery via private gallery.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {photographyPackages.map(pkg => (
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

      {/* Special Sessions */}
      <section
        className="px-8 py-16 border-t"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
            Special sessions
          </h2>
          <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
            Themed and occasion-based sessions for every milestone.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {specialSessions.map(session => (
              <div
                key={session.title}
                className="p-6 rounded-2xl border flex gap-4 items-start"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${session.color}18` }}
                >
                  {session.emoji}
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: colors.textPrimary }}>{session.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{session.description}</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: session.color }}
                  >
                    Book this session
                  </button>
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
        style={{ backgroundColor: colors.indigo }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to capture the moment?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#c7d2fe' }}>
          Sign up for Zovena and book a professional photo session for your pet today.
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