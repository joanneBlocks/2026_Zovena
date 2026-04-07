import { useState } from 'react'
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
  error: '#EF4444',
}

const categories = ['All', 'Food', 'Treats', 'Accessories', 'Health', 'Toys']

const products = [
  {
    emoji: '🥩',
    name: 'Premium Dog Food',
    category: 'Food',
    description: 'High-protein, grain-free formula for adult dogs. Made with real chicken and vegetables.',
    price: '₱850',
    tag: 'Best Seller',
    tagColor: colors.indigo,
    forPet: 'Dogs',
  },
  {
    emoji: '🐟',
    name: 'Salmon Cat Food',
    category: 'Food',
    description: 'Omega-3 rich wet food for cats of all ages. Supports healthy coat and immune system.',
    price: '₱420',
    tag: 'New',
    tagColor: colors.teal,
    forPet: 'Cats',
  },
  {
    emoji: '🌾',
    name: 'Small Animal Pellets',
    category: 'Food',
    description: 'Balanced nutrition pellets for guinea pigs, hamsters, and rabbits. Vitamin-enriched formula.',
    price: '₱280',
    tag: null,
    tagColor: null,
    forPet: 'Small Animals',
  },
  {
    emoji: '🦴',
    name: 'Dental Chew Treats',
    category: 'Treats',
    description: 'Cleans teeth and freshens breath while your dog enjoys a delicious treat. Vet-recommended.',
    price: '₱320',
    tag: 'Vet Approved',
    tagColor: colors.success,
    forPet: 'Dogs',
  },
  {
    emoji: '🐠',
    name: 'Freeze-Dried Fish Treats',
    category: 'Treats',
    description: 'Single-ingredient freeze-dried fish treats. Perfect for cats and small dogs.',
    price: '₱250',
    tag: null,
    tagColor: null,
    forPet: 'Cats & Dogs',
  },
  {
    emoji: '🎀',
    name: 'Adjustable Pet Collar',
    category: 'Accessories',
    description: 'Comfortable and durable adjustable collar with ID tag holder. Available in multiple colors.',
    price: '₱180',
    tag: null,
    tagColor: null,
    forPet: 'Dogs & Cats',
  },
  {
    emoji: '🎒',
    name: 'Pet Carrier Bag',
    category: 'Accessories',
    description: 'Lightweight, well-ventilated carrier bag for small pets. Airline-approved design.',
    price: '₱1,200',
    tag: 'Popular',
    tagColor: colors.coral,
    forPet: 'Small Pets',
  },
  {
    emoji: '💊',
    name: 'Multivitamin Supplements',
    category: 'Health',
    description: 'Daily multivitamin chews for dogs. Supports joint health, immunity, and coat shine.',
    price: '₱650',
    tag: 'Vet Approved',
    tagColor: colors.success,
    forPet: 'Dogs',
  },
  {
    emoji: '🧴',
    name: 'Pet Shampoo & Conditioner',
    category: 'Health',
    description: 'Gentle, hypoallergenic shampoo and conditioner set. Safe for sensitive skin and all coat types.',
    price: '₱380',
    tag: null,
    tagColor: null,
    forPet: 'Dogs & Cats',
  },
  {
    emoji: '🎾',
    name: 'Interactive Fetch Ball',
    category: 'Toys',
    description: 'Durable rubber fetch ball with squeaker inside. Perfect for outdoor play and mental stimulation.',
    price: '₱150',
    tag: null,
    tagColor: null,
    forPet: 'Dogs',
  },
  {
    emoji: '🐱',
    name: 'Cat Feather Wand',
    category: 'Toys',
    description: 'Interactive feather wand toy to keep your cat active and entertained. Extendable handle.',
    price: '₱120',
    tag: 'Best Seller',
    tagColor: colors.indigo,
    forPet: 'Cats',
  },
  {
    emoji: '🌀',
    name: 'Puzzle Treat Dispenser',
    category: 'Toys',
    description: 'Mental stimulation toy that dispenses treats as your pet solves the puzzle. Great for all ages.',
    price: '₱450',
    tag: 'New',
    tagColor: colors.teal,
    forPet: 'Dogs & Cats',
  },
]

export default function Shop() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [cartCount, setCartCount] = useState(0)

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

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
            onClick={() => navigate('/services')}
            className="text-sm font-medium hover:opacity-70 transition-opacity hidden md:block"
            style={{ color: colors.textSecondary }}
          >
            Services
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: colors.textSecondary }}
          >
            Sign in
          </button>
          {cartCount > 0 && (
            <div
              className="text-sm font-medium text-white px-4 py-2 rounded-lg"
              style={{ backgroundColor: colors.coral }}
            >
              🛒 {cartCount}
            </div>
          )}
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
          style={{ backgroundColor: colors.amber }}
        >
          🛍️ Pet Shop
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Food & Accessories for your pets
        </h1>
        <p className="text-base leading-relaxed" style={{ color: colors.textSecondary }}>
          Browse our curated selection of premium pet food, treats, accessories, health products,
          and toys — all vet-approved and sourced from trusted brands.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-8 pb-8 max-w-3xl mx-auto">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: activeCategory === category ? colors.indigo : colors.card,
                color: activeCategory === category ? '#fff' : colors.textSecondary,
                border: `1px solid ${activeCategory === category ? colors.indigo : colors.border}`,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-8 pb-20 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {filtered.map(product => (
            <div
              key={product.name}
              className="rounded-2xl border p-5 flex gap-4 items-start"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${colors.indigo}10` }}
              >
                {product.emoji}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-bold" style={{ color: colors.textPrimary }}>
                      {product.name}
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                      For: {product.forPet}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-bold text-sm" style={{ color: colors.indigo }}>
                      {product.price}
                    </p>
                    {product.tag && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                        style={{ backgroundColor: product.tagColor ?? colors.indigo }}
                      >
                        {product.tag}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.textSecondary }}>
                  {product.description}
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setCartCount(prev => prev + 1)}
                    className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.indigo }}
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
                    style={{ color: colors.textSecondary, border: `1px solid ${colors.border}` }}
                  >
                    Learn more
                  </button>
                </div>
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
          Sign up to complete your purchase
        </h2>
        <p className="text-sm mb-8" style={{ color: '#c7d2fe' }}>
          Create a free Zovena account to checkout, track orders, and manage your pet's health all in one place.
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
          <button onClick={() => navigate('/services')} className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Services</button>
        </div>
        <p>© 2026 Joanne Costo. All rights reserved.</p>
      </footer>

    </div>
  )
}