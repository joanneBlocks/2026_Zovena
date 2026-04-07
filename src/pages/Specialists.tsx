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

const specialists = [
  {
    name: 'Dr. Maria Santos',
    title: 'Small Animal Veterinarian',
    specialty: 'Dogs & Cats',
    experience: '12 years',
    emoji: '🐕',
    color: colors.indigo,
    bio: 'Specializes in preventive care, internal medicine, and surgery for dogs and cats. Known for her gentle approach and thorough diagnostics.',
  },
  {
    name: 'Dr. James Reyes',
    title: 'Exotic Animal Specialist',
    specialty: 'Reptiles & Birds',
    experience: '8 years',
    emoji: '🦎',
    color: colors.teal,
    bio: 'Expert in exotic animal care including reptiles, birds, and small mammals. Certified in avian medicine and reptile surgery.',
  },
  {
    name: 'Dr. Anna Cruz',
    title: 'Feline Specialist',
    specialty: 'Cats',
    experience: '10 years',
    emoji: '🐈',
    color: colors.coral,
    bio: 'Dedicated exclusively to feline health and behavior. Expert in cat-specific diseases, dental care, and stress-free handling techniques.',
  },
  {
    name: 'Dr. Carlos Lim',
    title: 'Animal Nutritionist',
    specialty: 'Diet & Wellness',
    experience: '6 years',
    emoji: '🥗',
    color: colors.amber,
    bio: 'Provides personalized nutrition plans for pets of all species. Specializes in weight management, allergies, and senior pet diets.',
  },
  {
    name: 'Dr. Sofia Tan',
    title: 'Veterinary Dermatologist',
    specialty: 'Skin & Coat Health',
    experience: '9 years',
    emoji: '🌿',
    color: colors.teal,
    bio: 'Expert in diagnosing and treating skin conditions, allergies, and coat disorders in cats, dogs, and exotic animals.',
  },
  {
    name: 'Dr. Miguel Flores',
    title: 'Animal Behaviorist',
    specialty: 'Behavior & Training',
    experience: '7 years',
    emoji: '🧠',
    color: colors.indigo,
    bio: 'Certified animal behaviorist specializing in anxiety, aggression, and behavioral modification for pets of all ages.',
  },
]

export default function Specialists() {
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
            onClick={() => navigate('/services')}
            className="text-sm font-medium hover:opacity-70 transition-opacity hidden md:block"
            style={{ color: colors.textSecondary }}
          >
            Services
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
          style={{ backgroundColor: colors.teal }}
        >
          🩺 Meet Our Team
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Animal Care & Health Specialists
        </h1>
        <p className="text-base leading-relaxed" style={{ color: colors.textSecondary }}>
          Our network of experienced veterinarians and animal health specialists are dedicated
          to providing the best care for your beloved pets.
        </p>
      </section>

      {/* Specialists Grid */}
      <section className="px-8 pb-20 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {specialists.map(specialist => (
            <div
              key={specialist.name}
              className="p-6 rounded-2xl border flex gap-5 items-start"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${specialist.color}18` }}
              >
                {specialist.emoji}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-bold" style={{ color: colors.textPrimary }}>
                      {specialist.name}
                    </p>
                    <p className="text-sm font-medium" style={{ color: specialist.color }}>
                      {specialist.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: `${specialist.color}18`, color: specialist.color }}
                    >
                      {specialist.specialty}
                    </span>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: `${colors.success}18`, color: colors.success }}
                    >
                      {specialist.experience}
                    </span>
                  </div>
                </div>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: colors.textSecondary }}>
                  {specialist.bio}
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-4 text-sm font-medium px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: specialist.color }}
                >
                  Book a consultation
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
          Ready to connect with a specialist?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#c7d2fe' }}>
          Sign up for Zovena and get access to our full network of animal care professionals.
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
          <button onClick={() => navigate('/shop')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Shop</button>
        </div>
        <p>© 2026 Joanne Costo. All rights reserved.</p>
      </footer>

    </div>
  )
}