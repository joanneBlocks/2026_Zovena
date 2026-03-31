const colors = {
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  bg: '#F9FAFB',
}

export default function Footer() {
  return (
    <footer
      className="w-full text-center py-4 mt-6 text-xs border-t"
      style={{ color: colors.textSecondary, borderColor: colors.border, backgroundColor: colors.bg }}
    >
      © 2026 Joanne Costo. All rights reserved.
    </footer>
  )
}