/**
 * Dashboard Page - User's Checked Out Items
 */

'use client';

import { UserDashboard } from '@/components/UserDashboard';

export default function DashboardPage() {
  // Mock user ID - in real app, would come from authentication
  const userId = 'user-demo-123';

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>My Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        View your checked-out digital items with expiration countdown timers.
      </p>

      <UserDashboard userId={userId} />
    </div>
  );
}
