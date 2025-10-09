/**
 * Reading List Page - User's Saved Books
 */

'use client';

import { ReadingList } from '@/components/ReadingList';

export default function ReadingListPage() {
  // Mock user ID - in real app, would come from authentication
  const userId = 'user-demo-123';

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <ReadingList userId={userId} />
    </div>
  );
}
