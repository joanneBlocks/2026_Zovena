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

const menuSections = [
  {
    title: 'Dog Menu',
    emoji: '🐕',
    color: colors.indigo,
    items: [
      { name: 'Chicken & Sweet Potato Bowl', description: 'Grilled chicken breast with steamed sweet potato, carrots, and brown rice. High protein, grain-friendly.', price: '₱185', tag: 'Best Seller' },
      { name: 'Salmon & Veggie Plate', description: 'Baked salmon fillet with green beans, peas, and quinoa. Omega-3 rich for coat health.', price: '₱210', tag: null },
      { name: 'Beef & Pumpkin Stew', description: 'Slow-cooked lean beef with pumpkin puree and oats. Gentle on digestion, perfect for seniors.', price: '₱195', tag: 'Senior Friendly' },
      { name: 'Birthday Cake (Dog-safe)', description: 'Peanut butter and banana cake with yogurt frosting. Sugar-free and completely dog-safe.', price: '₱350', tag: 'Special Occasion' },
    ],
  },
  {
    title: 'Cat Menu',
    emoji: '🐈',
    color: colors.teal,
    items: [
      { name: 'Tuna & Egg Breakfast', description: 'Fresh tuna flakes with soft-boiled egg and a drizzle of fish broth. A feline favorite.', price: '₱155', tag: 'Best Seller' },
      { name: 'Chicken Liver Pâté', description: 'Blended chicken liver with a splash of low-sodium broth. Smooth and irresistible for picky eaters.', price: '₱140', tag: null },
      { name: 'Salmon Sashimi Platter', description: 'Fresh salmon slices served with a side of steamed broccoli. Premium dining for your feline.', price: '₱230', tag: 'Premium' },
      { name: 'Kitten Growth Bowl', description: 'High-protein chicken and egg bowl with DHA-rich ingredients to support kitten development.', price: '₱165', tag: 'Kittens' },
    ],
  },
  {
    title: 'Small Animals',
    emoji: '🐹',
    color: colors.amber,
    items: [
      { name: 'Fresh Veggie Platter', description: 'Assorted fresh vegetables including carrots, bell peppers, cucumber, and leafy greens.', price: '₱85', tag: null },
      { name: 'Fruit & Seed Mix', description: 'Seasonal fruits with sunflower seeds, pumpkin seeds, and dried herbs. Great for hamsters and rabbits.', price: '₱95', tag: 'Popular' },
      { name: 'Hay & Herb Bundle', description: 'Premium timothy hay with fresh parsley, cilantro, and dandelion greens for rabbits and guinea pigs.', price: '₱75', tag: null },
    ],
  },
]

const diningExperiences = [
  {
    emoji: '🪑',
    title: 'Dine-In with Your Pet',
    description: 'Enjoy a meal together at our pet-friendly tables. Owner and pet menus available side by side.',
    color: colors.indigo,
  },
  {
    emoji: '🎂',
    title: 'Birthday Celebrations',
    description: 'Special birthday packages for your pet with a custom cake, decorations, and a party corner.',
    color: colors.coral,
  },
  {
    emoji: '🚚',
    title: 'Meal Delivery',
    description: 'Fresh, chef-prepared meals delivered to your door. Available daily with subscription plans.',
    color: colors.teal,
  },
  {
    emoji: '📦',
    title: 'Meal Subscription',
    description: 'Weekly or monthly meal plans customized for your pet\'s breed, age, and dietary needs.',
    color: colors.amber,
  },
]

export default function PetRestaurant() {
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
            style={{ backgroundColor: colors.amber }}
          >
            Reserve a table
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-medium text-white mb-6"
          style={{ backgroundColor: colors.amber }}
        >
          🍽️ Pet Restaurant
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Nutritious meals crafted<br />with love for your pets
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: colors.textSecondary }}>
          Freshly prepared, nutritionist-approved meals for your pets. Dine in together,
          order delivery, or subscribe to a weekly meal plan — all made with wholesome,
          pet-safe ingredients.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.amber }}
          >
            Reserve a table
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-70"
            style={{ color: colors.textSecondary, border: `1px solid ${colors.border}` }}
          >
            Order delivery
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
            Why pet owners love our restaurant
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { emoji: '👨‍🍳', label: 'Chef Prepared', description: 'Freshly cooked daily' },
              { emoji: '🥗', label: 'Nutritionist Approved', description: 'Vet-reviewed menus' },
              { emoji: '🚫', label: 'No Harmful Additives', description: 'All-natural ingredients' },
              { emoji: '🐾', label: 'Pet-Safe Only', description: 'Species-appropriate' },
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

      {/* Dining Experiences */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
          Dining experiences
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
          More than just a meal — a complete dining experience for you and your pet.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {diningExperiences.map(exp => (
            <div
              key={exp.title}
              className="p-6 rounded-2xl border flex gap-4 items-start"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${exp.color}18` }}
              >
                {exp.emoji}
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: colors.textPrimary }}>{exp.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section
        className="px-8 py-16 border-t"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: colors.textPrimary }}>
            Our menu
          </h2>
          <p className="text-center mb-10 text-sm" style={{ color: colors.textSecondary }}>
            All meals are freshly prepared daily with wholesome, species-appropriate ingredients.
          </p>
          <div className="space-y-10">
            {menuSections.map(section => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{section.emoji}</span>
                  <h3 className="text-lg font-bold" style={{ color: section.color }}>
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {section.items.map(item => (
                    <div
                      key={item.name}
                      className="p-4 rounded-2xl border flex justify-between items-start gap-4"
                      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                            {item.name}
                          </p>
                          {item.tag && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                              style={{ backgroundColor: section.color }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm" style={{ color: section.color }}>
                          {item.price}
                        </p>
                        <button
                          onClick={() => navigate('/login')}
                          className="text-xs mt-1 px-3 py-1 rounded-lg text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: section.color }}
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section className="px-8 py-16 max-w-3xl mx-auto">
        <div
          className="p-8 rounded-2xl border text-center"
          style={{ backgroundColor: colors.card, borderColor: colors.amber }}
        >
          <p className="text-3xl mb-4">🪑</p>
          <h2 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Reserve a table
          </h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
            Bring your pet for a dine-in experience! Our pet-friendly tables accommodate
            owners and their animals together. Reservations recommended on weekends.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mb-6">
            {[
              { emoji: '📅', label: 'Open daily', value: '10AM – 8PM' },
              { emoji: '🐾', label: 'Pets welcome', value: 'All species' },
              { emoji: '📞', label: 'Reservations', value: 'Via Zovena app' },
            ].map(info => (
              <div
                key={info.label}
                className="p-3 rounded-xl"
                style={{ backgroundColor: colors.bg }}
              >
                <p className="text-xl mb-1">{info.emoji}</p>
                <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>{info.label}</p>
                <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>{info.value}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.amber }}
          >
            Reserve now
          </button>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-8 py-16 text-center border-t"
        style={{ backgroundColor: colors.amber }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to dine with your pet?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#fef3c7' }}>
          Sign up for Zovena and reserve a table or order fresh meals for your pet today.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.card, color: colors.amber }}
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