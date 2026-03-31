import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Role } from '../types'

interface RoleGuardProps {
  children: ReactNode
  allowed?: Role[]
}

export default function RoleGuard({ children, allowed }: RoleGuardProps) {
  const { profile, loading } = useAuth()

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!profile) return <Navigate to="/login" replace />
  if (allowed && !allowed.includes(profile.role)) return <Navigate to="/dashboard" replace />

  return <>{children}</>
}