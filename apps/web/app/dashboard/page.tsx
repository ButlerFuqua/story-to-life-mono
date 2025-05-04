import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-4">Welcome to your dashboard!</div>
    </ProtectedRoute>
  )
}
