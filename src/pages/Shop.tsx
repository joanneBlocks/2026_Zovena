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
    image: '/shop/dog-food.png',
    emoji: '🥩',
    name: 'Premium Dog Food',
    category: 'Food',
    description: 'High-protein, grain-free formula for adult dogs. Made with real chicken and vegetables.',
    price: 850,
    originalPrice: 1050,
    tag: 'Best Seller',
    tagColor: colors.indigo,
    forPet: 'Dogs',
    rating: 4.9,
    reviews: 128,
  },
  {
    image: '/shop/cat-food.png',
    emoji: '🐟',
    name: 'Salmon Cat Food',
    category: 'Food',
    description: 'Omega-3 rich wet food for cats of all ages. Supports healthy coat and immune system.',
    price: 420,
    originalPrice: null,
    tag: 'New',
    tagColor: colors.teal,
    forPet: 'Cats',
    rating: 4.7,
    reviews: 54,
  },
  {
    image: '/shop/small-animal-pellets.png',
    emoji: '🌾',
    name: 'Small Animal Pellets',
    category: 'Food',
    description: 'Balanced nutrition pellets for guinea pigs, hamsters, and rabbits. Vitamin-enriched formula.',
    price: 280,
    originalPrice: null,
    tag: null,
    tagColor: null,
    forPet: 'Small Animals',
    rating: 4.5,
    reviews: 32,
  },
  {
    image: '/shop/dental-chew.png',
    emoji: '🦴',
    name: 'Dental Chew Treats',
    category: 'Treats',
    description: 'Cleans teeth and freshens breath while your dog enjoys a delicious treat. Vet-recommended.',
    price: 320,
    originalPrice: 400,
    tag: 'Vet Approved',
    tagColor: colors.success,
    forPet: 'Dogs',
    rating: 4.8,
    reviews: 96,
  },
  {
    image: '/shop/fish-treats.png',
    emoji: '🐠',
    name: 'Freeze-Dried Fish Treats',
    category: 'Treats',
    description: 'Single-ingredient freeze-dried fish treats. Perfect for cats and small dogs.',
    price: 250,
    originalPrice: null,
    tag: null,
    tagColor: null,
    forPet: 'Cats & Dogs',
    rating: 4.6,
    reviews: 41,
  },
  {
    image: '/shop/pet-collar.png',
    emoji: '🎀',
    name: 'Adjustable Pet Collar',
    category: 'Accessories',
    description: 'Comfortable and durable adjustable collar with ID tag holder. Available in multiple colors.',
    price: 180,
    originalPrice: null,
    tag: null,
    tagColor: null,
    forPet: 'Dogs & Cats',
    rating: 4.4,
    reviews: 67,
  },
  {
    image: '/shop/pet-carrier.png',
    emoji: '🎒',
    name: 'Pet Carrier Bag',
    category: 'Accessories',
    description: 'Lightweight, well-ventilated carrier bag for small pets. Airline-approved design.',
    price: 1200,
    originalPrice: 1500,
    tag: 'Popular',
    tagColor: colors.coral,
    forPet: 'Small Pets',
    rating: 4.8,
    reviews: 83,
  },
  {
    image: '/shop/multivitamin.png',
    emoji: '💊',
    name: 'Multivitamin Supplements',
    category: 'Health',
    description: 'Daily multivitamin chews for dogs. Supports joint health, immunity, and coat shine.',
    price: 650,
    originalPrice: 800,
    tag: 'Vet Approved',
    tagColor: colors.success,
    forPet: 'Dogs',
    rating: 4.9,
    reviews: 112,
  },
  {
    image: '/shop/shampoo.png',
    emoji: '🧴',
    name: 'Pet Shampoo & Conditioner',
    category: 'Health',
    description: 'Gentle, hypoallergenic shampoo and conditioner set. Safe for sensitive skin and all coat types.',
    price: 380,
    originalPrice: null,
    tag: null,
    tagColor: null,
    forPet: 'Dogs & Cats',
    rating: 4.6,
    reviews: 58,
  },
  {
    image: '/shop/fetch-ball.png',
    emoji: '🎾',
    name: 'Interactive Fetch Ball',
    category: 'Toys',
    description: 'Durable rubber fetch ball with squeaker inside. Perfect for outdoor play and mental stimulation.',
    price: 150,
    originalPrice: null,
    tag: null,
    tagColor: null,
    forPet: 'Dogs',
    rating: 4.5,
    reviews: 44,
  },
  {
    image: '/shop/feather-wand.png',
    emoji: '🐱',
    name: 'Cat Feather Wand',
    category: 'Toys',
    description: 'Interactive feather wand toy to keep your cat active and entertained. Extendable handle.',
    price: 120,
    originalPrice: 160,
    tag: 'Best Seller',
    tagColor: colors.indigo,
    forPet: 'Cats',
    rating: 4.7,
    reviews: 89,
  },
  {
    image: '/shop/puzzle-dispenser.png',
    emoji: '🌀',
    name: 'Puzzle Treat Dispenser',
    category: 'Toys',
    description: 'Mental stimulation toy that dispenses treats as your pet solves the puzzle. Great for all ages.',
    price: 450,
    originalPrice: null,
    tag: 'New',
    tagColor: colors.teal,
    forPet: 'Dogs & Cats',
    rating: 4.8,
    reviews: 37,
  },
]

export default function Shop() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [wishlist, setWishlist] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('default')

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = Object.entries(cart).reduce((total, [name, qty]) => {
    const product = products.find(p => p.name === name)
    return total + (product?.price ?? 0) * qty
  }, 0)

  function addToCart(name: string): void {
    setCart(prev => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }))
  }

  function removeFromCart(name: string): void {
    setCart(prev => {
      const updated = { ...prev }
      if (updated[name] > 1) updated[name]--
      else delete updated[name]
      return updated
    })
  }

  function toggleWishlist(name: string): void {
    setWishlist(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  function renderStars(rating: number): string {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5 ? 1 : 0
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half)
  }

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
            onClick={() => navigate('/login')}
            className="text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: colors.textSecondary }}
          >
            Sign in
          </button>
          {cartCount > 0 && (
            <div
              className="text-sm font-medium text-white px-4 py-2 rounded-lg cursor-pointer"
              style={{ backgroundColor: colors.coral }}
            >
              🛒 {cartCount} · ₱{cartTotal.toLocaleString()}
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
      <section
        className="px-8 py-20 text-center relative"
        style={{
          backgroundImage: 'url(/shop-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-4"
            style={{ backgroundColor: colors.amber }}
          >
            🛍️ Pet Shop
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#FFFFFF' }}>
            Food & Accessories for your pets
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#E5E7EB' }}>
            Browse our curated selection of premium pet food, treats, accessories, health products,
            and toys — all vet-approved and sourced from trusted brands.
          </p>
        </div>
      </section>

      {/* Filters & Sort */}
      <section
        className="px-8 py-8"
        style={{
          backgroundImage: 'url(/shop-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2 flex-wrap">
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
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm rounded-lg px-3 py-2 focus:outline-none"
              style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary, backgroundColor: colors.card }}
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <p className="text-xs mt-3" style={{ color: colors.card }}>
            {filtered.length} products found
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section
        className="px-8 pb-20"
        style={{
          backgroundImage: 'url(/shop-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {filtered.map(product => (
              <div
                key={product.name}
                className="rounded-2xl border overflow-hidden flex flex-col"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                {/* Product Image Area */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ backgroundColor: `${colors.indigo}08`, minHeight: '140px' }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />
                  ) : (
                    <span className="text-5xl py-8">{product.emoji}</span>
                  )}

                  {/* Tag */}
                  {product.tag && (
                    <div
                      className="absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: product.tagColor ?? colors.indigo }}
                    >
                      {product.tag}
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.name)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                    style={{
                      backgroundColor: colors.card,
                      color: wishlist.includes(product.name) ? colors.coral : colors.textSecondary,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {wishlist.includes(product.name) ? '♥' : '♡'}
                  </button>

                  {/* Discount badge */}
                  {product.originalPrice && (
                    <div
                      className="absolute bottom-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: colors.error }}
                    >
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-semibold text-sm leading-tight mb-1" style={{ color: colors.textPrimary }}>
                    {product.name}
                  </p>
                  <p className="text-xs mb-2" style={{ color: colors.teal }}>
                    For: {product.forPet}
                  </p>
                  <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: colors.textSecondary }}>
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs" style={{ color: colors.amber }}>
                      {renderStars(product.rating)}
                    </span>
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <p className="font-bold text-sm" style={{ color: colors.indigo }}>
                      ₱{product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs line-through" style={{ color: colors.textSecondary }}>
                        ₱{product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart */}
                  {cart[product.name] ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(product.name)}
                        className="w-8 h-8 rounded-lg text-sm font-bold transition-opacity hover:opacity-70 flex items-center justify-center"
                        style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-sm font-medium" style={{ color: colors.textPrimary }}>
                        {cart[product.name]}
                      </span>
                      <button
                        onClick={() => addToCart(product.name)}
                        className="w-8 h-8 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-70 flex items-center justify-center"
                        style={{ backgroundColor: colors.indigo }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product.name)}
                      className="w-full text-sm font-medium text-white py-2 rounded-lg transition-opacity hover:opacity-90"
                      style={{ backgroundColor: colors.indigo }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Summary */}
      {cartCount > 0 && (
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-4 z-20"
          style={{ backgroundColor: colors.indigo }}
        >
          <span className="text-white text-sm font-medium">
            🛒 {cartCount} {cartCount === 1 ? 'item' : 'items'} · ₱{cartTotal.toLocaleString()}
          </span>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium px-4 py-1.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.card, color: colors.indigo }}
          >
            Checkout →
          </button>
        </div>
      )}

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