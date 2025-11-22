/**
 * Catalog Page - Browse Digital Content
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DigitalCatalog } from '@/components/DigitalCatalog';
import { useAuth } from '@/contexts/AuthContext';

export default function CatalogPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleAddToReadingList = async (contentId: string) => {
    if (!user) return;

    try {
      const response = await fetch('/api/digital/reading-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          contentId,
          isDigital: true,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Added to reading list!');
      }
    } catch (error) {
      console.error('Failed to add to reading list:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Digital Catalog</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Browse and search our collection of digital books, ePubs, PDFs, and audiobooks.
      </p>

      <DigitalCatalog
        userId={user.uid}
        onAddToReadingList={handleAddToReadingList}
      />
    </div>
  );
}
