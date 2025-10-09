/**
 * Navigation Component with Cart Indicator
 */

'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Navigation() {
  const { cartCount } = useCart();

  return (
    <nav style={{
      background: '#333',
      color: 'white',
      padding: '1rem 2rem',
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Digital Library System
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/catalog" style={{ color: 'white', textDecoration: 'none' }}>
          Browse
        </Link>
        <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
          My Books
        </Link>
        <Link href="/reading-list" style={{ color: 'white', textDecoration: 'none' }}>
          Reading List
        </Link>
        <Link href="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              background: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
