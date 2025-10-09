/**
 * Home Page - Digital Content & E-Book Lending Platform
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Digital Content & E-Book Lending Platform</h1>
      <p>A comprehensive library management system for digital and physical content.</p>

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <Link href="/catalog" style={cardStyle}>
          <h2>📚 Browse Catalog</h2>
          <p>Search and browse digital books, ePubs, PDFs, and audiobooks</p>
        </Link>

        <Link href="/dashboard" style={cardStyle}>
          <h2>📊 My Dashboard</h2>
          <p>View your checked-out items and expiration timers</p>
        </Link>

        <Link href="/reading-list" style={cardStyle}>
          <h2>📖 Reading List</h2>
          <p>Manage your saved books for later reading</p>
        </Link>

        <Link href="/api-demo" style={cardStyle}>
          <h2>🔧 API Demo</h2>
          <p>Test the API endpoints and see responses</p>
        </Link>
      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>System Features</h2>
        <ul>
          <li>✓ Digital catalog with search and filters</li>
          <li>✓ Checkout with automatic expiration (1-21 days)</li>
          <li>✓ Reading list for digital and physical books</li>
          <li>✓ DRM protection (Adobe, Overdrive, Custom)</li>
          <li>✓ Real-time countdown timers</li>
          <li>✓ Integration with core library systems</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <strong>Note:</strong> This is a skeleton implementation. Components are functional but use in-memory storage.
        For production, connect to a database and implement authentication.
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  display: 'block',
  padding: '1.5rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.2s',
  background: 'white',
};
