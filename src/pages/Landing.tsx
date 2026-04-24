import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getApprovedTestimonials,
  type Testimonial,
} from '../api/testimonials'

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
  error: '#EF4444',
  success: '#22C55E',
}

export default function Landing() {
  const navigate = useNavigate()
  const { profile } = useAuth()

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials(): Promise<void> {
    try {
      const data = await getApprovedTestimonials()
      setTestimonials(data)
    } catch (err) {
      console.error('Failed to load testimonials')
    } finally {
      setLoadingTestimonials(false)
    }
  }

  const sampleTestimonials: Testimonial[] = [
    {
      id: 'sample-1',
      name: 'Maria Santos',
      role: 'Pet Owner',
      message: 'Zovena has completely changed how I manage my dog\'s health. I can see all his records in one place and never miss a vaccination again. It\'s simple, beautiful, and reliable.',
      photo_url: '/testimonials/maria-santos.png',
      approved: true,
      created_at: '',
    },
    {
      id: 'sample-2',
      name: 'Dr. James Reyes',
      role: 'Veterinarian',
      message: 'As a vet, having a centralized platform where I can access all my patients\' records is invaluable. Zovena is intuitive and well-designed — exactly what modern veterinary practice needs.',
      photo_url: '/testimonials/dr-james-reyes.png',
      approved: true,
      created_at: '',
    },
    {
      id: 'sample-3',
      name: 'Anna Cruz',
      role: 'Pet Owner',
      message: 'I have three cats and keeping track of their individual health records used to be a nightmare. Zovena made it so easy. I love that my vet can update their records directly in the app.',
      photo_url: '/testimonials/anna-cruz.png',
      approved: true,
      created_at: '',
    },
  ]

  const mergedTestimonials = [
    ...testimonials,
    ...sampleTestimonials.slice(0, Math.max(0, 3 - testimonials.length)),
  ]
  const displayTestimonials = mergedTestimonials.slice(0, 3)

  const heroBg = {
    backgroundImage: 'url(/hero-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  }

  const overlayDark = 'rgba(0,0,0,0.80)'
  const overlayLight = 'rgba(0,0,0,0.70)'

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.textPrimary }}>

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
            onClick={() => navigate('/specialists')}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            Specialists
          </button>
          <button
            onClick={() => navigate('/services')}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            Services
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            Shop
          </button>
          {profile ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="text-base font-semibold text-white px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.teal }}
            >
              My Dashboard →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-base font-medium px-8 py-4 rounded-xl transition-opacity hover:opacity-70"
                style={{ color: colors.textSecondary }}
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-base font-semibold text-white px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.indigo }}
              >
                Get started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="px-8 py-32 text-center relative"
        style={{
          ...heroBg,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: overlayDark }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
            style={{ backgroundColor: colors.teal }}
          >
            🐾 Pet Wellness, Reimagined
          </div>
          <h1 className="text-4xl font-bold mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
            The smarter way to manage<br />your pet's health
          </h1>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: '#E5E7EB' }}>
            Zovena is a modern pet wellness platform that connects pet owners and veterinarians
            through a secure, centralized system — making pet healthcare simpler, safer, and more organized.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {profile ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="text-base font-semibold text-white px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.teal }}
              >
                Go to my dashboard →
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-base font-semibold text-white px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: colors.indigo }}
                >
                  🏠 I'm a Pet Owner
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="text-base font-semibold text-white px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: colors.teal }}
                >
                  🩺 I'm a Veterinarian
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="px-8 py-12 border-y"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: '100%', label: 'Secure & Private', emoji: '🔒' },
            { value: 'RBAC', label: 'Role-Based Access', emoji: '👥' },
            { value: 'Live', label: 'Cloud Database', emoji: '☁️' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-2xl mb-1">{stat.emoji}</p>
              <p className="text-2xl font-bold" style={{ color: colors.indigo }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        className="px-8 py-20 relative"
        style={heroBg}
      >
        <div className="absolute inset-0" style={{ backgroundColor: overlayDark }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#FFFFFF' }}>
            Everything you need in one place
          </h2>
          <p className="text-center mb-12 text-sm" style={{ color: '#E5E7EB' }}>
            Designed for both pet owners and veterinarians — from the ground up.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                emoji: '🔐',
                title: 'Role-Based Access Control',
                description: 'Pet owners and veterinarians each get a tailored experience. Access is enforced at the database level — not just the UI — using Supabase Row Level Security policies.',
                color: colors.indigo,
              },
              {
                emoji: '🐾',
                title: 'Pet Profile Management',
                description: 'Create detailed profiles for each pet including name, species, age, and photo. Owners manage their own pets while vets get a full view across all registered animals.',
                color: colors.teal,
              },
              {
                emoji: '📋',
                title: 'Medical Records',
                description: 'Veterinarians can create and update medical records including visit notes, diagnoses, and vaccinations. Owners have read-only access to stay informed about their pet\'s health.',
                color: colors.coral,
              },
              {
                emoji: '💉',
                title: 'Vaccination Tracking',
                description: 'Keep a clear record of every vaccination administered. Never lose track of what your pet has received and when — all stored securely in the cloud.',
                color: colors.amber,
              },
              {
                emoji: '📱',
                title: 'Mobile-First Design',
                description: 'Zovena is designed primarily for mobile use — with a clean, touch-friendly interface that works beautifully on any device, from phones to desktops.',
                color: colors.indigo,
              },
              {
                emoji: '☁️',
                title: 'Cloud-Powered & Secure',
                description: 'Built on Supabase with PostgreSQL, your data is stored securely in the cloud with real-time access from anywhere. No data is ever lost or inaccessible.',
                color: colors.teal,
              },
            ].map(feature => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border flex gap-5 items-start"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.20)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${feature.color}40` }}
                >
                  {feature.emoji}
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                    {feature.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#E5E7EB' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="px-8 py-20"
        style={{ backgroundColor: colors.card }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
            How Zovena works
          </h2>
          <p className="text-center mb-12 text-sm" style={{ color: colors.textSecondary }}>
            Simple for owners. Powerful for vets.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                step: '01',
                title: 'Create your account',
                description: 'Sign up and choose your role — Pet Owner or Veterinarian. Your role determines your experience from the very first login.',
                color: colors.indigo,
              },
              {
                step: '02',
                title: 'Add your pets',
                description: 'Pet owners can register their animals with full profiles — name, species, age, and a photo. All data is private and owned by you.',
                color: colors.teal,
              },
              {
                step: '03',
                title: 'Manage health records',
                description: 'Veterinarians can create and update medical records for any registered pet. Owners see everything in real time — read-only.',
                color: colors.amber,
              },
              {
                step: '04',
                title: 'Stay informed',
                description: 'Both owners and vets have a clear, organized view of every pet\'s health history — accessible from any device, anytime.',
                color: colors.coral,
              },
            ].map(step => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border flex gap-5 items-start"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.step}
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: colors.textPrimary }}>
                    {step.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners vs Vets Section */}
      <section
        className="px-8 py-20 relative"
        style={heroBg}
      >
        <div className="absolute inset-0" style={{ backgroundColor: overlayLight }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#FFFFFF' }}>
            Built for everyone involved
          </h2>
          <p className="text-center mb-12 text-sm" style={{ color: '#E5E7EB' }}>
            One platform, two powerful experiences.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderColor: colors.indigo }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: `${colors.indigo}40` }}
              >
                🏠
              </div>
              <p className="font-bold text-lg mb-3" style={{ color: '#FFFFFF' }}>
                Pet Owners
              </p>
              <ul className="space-y-2">
                {[
                  'Create and manage pet profiles',
                  'Upload pet photos',
                  'View medical records and history',
                  'Track vaccinations',
                  'Access from any device',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#E5E7EB' }}>
                    <span style={{ color: colors.success }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="mt-6 w-full text-white py-4 rounded-xl text-base font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.indigo }}
              >
                Get started as owner
              </button>
            </div>

            <div
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderColor: colors.teal }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: `${colors.teal}40` }}
              >
                🩺
              </div>
              <p className="font-bold text-lg mb-3" style={{ color: '#FFFFFF' }}>
                Veterinarians
              </p>
              <ul className="space-y-2">
                {[
                  'View all registered pets',
                  'See owner contact details',
                  'Create and update medical records',
                  'Record vaccinations and visits',
                  'Full read access to all profiles',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#E5E7EB' }}>
                    <span style={{ color: colors.success }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="mt-6 w-full text-white py-4 rounded-xl text-base font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.teal }}
              >
                Get started as vet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="px-8 py-20"
        style={{ backgroundColor: colors.card }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
            What our users say
          </h2>
          <p className="text-center mb-12 text-sm" style={{ color: colors.textSecondary }}>
            Trusted by pet owners and veterinarians.
          </p>

          {loadingTestimonials ? (
            <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
              Loading testimonials...
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {displayTestimonials.map(testimonial => (
                <div
                  key={testimonial.id}
                  className="p-6 rounded-2xl border"
                  style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {testimonial.photo_url ? (
                      <img
                        src={testimonial.photo_url!}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border"
                        style={{ borderColor: colors.border }}
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: colors.indigo }}
                      >
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                        {testimonial.name}
                      </p>
                      <p className="text-xs" style={{ color: colors.teal }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 text-sm" style={{ color: colors.amber }}>
                    ★★★★★
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                    "{testimonial.message}"
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
              Had a great experience with Zovena?
            </p>
            <button
              onClick={() => navigate(profile ? '/testimonials' : '/login')}
              className="text-base font-semibold text-white px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.indigo }}
            >
              {profile ? 'Share your experience →' : 'Sign in to share your experience →'}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-8 py-20 text-center relative"
        style={heroBg}
      >
        <div className="absolute inset-0" style={{ backgroundColor: overlayDark }} />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Ready to get started?
          </h2>
          <p className="text-sm mb-8" style={{ color: '#E5E7EB' }}>
            Join Zovena today and bring your pet's health records into the digital age.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {profile ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="text-base font-semibold px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.card, color: colors.indigo }}
              >
                Go to my dashboard →
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-base font-semibold px-8 py-4 rounded-xl transition-opacity hover:opacity-90 text-white border-2 border-white"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="text-base font-semibold px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: colors.card, color: colors.indigo }}
                >
                  Create free account →
                </button>
              </>
            )}
          </div>
        </div>
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
          <button
            onClick={() => navigate('/specialists')}
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            Specialists
          </button>
          <button
            onClick={() => navigate('/services')}
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            Services
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            Shop
          </button>
        </div>
        <p>© 2026 Joanne Costo. All rights reserved.</p>
        <p className="mt-1">Built with React, TypeScript, and Supabase.</p>
      </footer>

    </div>
  )
}