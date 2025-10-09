/**
 * Catalog Page - Browse Digital Content
 */

'use client';

import { DigitalCatalog } from '@/components/DigitalCatalog';

export default function CatalogPage() {
  // Mock user ID - in real app, would come from authentication
  const userId = 'user-demo-123';

  const handleAddToReadingList = async (contentId: string) => {
    try {
      const response = await fetch('/api/digital/reading-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
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

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Digital Catalog</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Browse and search our collection of digital books, ePubs, PDFs, and audiobooks.
      </p>

      <DigitalCatalog
        userId={userId}
        onAddToReadingList={handleAddToReadingList}
      />
    </div>
  );
}
