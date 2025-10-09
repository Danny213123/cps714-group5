/**
 * Client Layout Wrapper
 * Wraps client-side providers for use in server components
 */

'use client';

import { CartProvider } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navigation />
      {children}
    </CartProvider>
  );
}
