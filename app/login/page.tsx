'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../../src/firebase';
import Link from 'next/link';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return () => unsub();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, pw);
      } else {
        await createUserWithEmailAndPassword(auth, email, pw);
      }
    } catch (err: any) {
      setError(err.message || 'Auth error');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <main style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
        <h1>Welcome {user.email}</h1>
        <button onClick={() => signOut(auth)} style={btnStyle}>Logout</button>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/">Go to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
      <h1>{mode === 'login' ? 'Login' : 'Create Account'}</h1>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
          style={inputStyle}
        />
        {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>{error}</div>}
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
        style={{ ...btnLinkStyle, marginTop: '0.75rem' }}
        type="button"
      >
        {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Login'}
      </button>
      <div style={{ marginTop: '1rem' }}>
        <Link href="/">Back Home</Link>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.6rem 0.8rem',
  border: '1px solid #ccc',
  borderRadius: 6
};

const btnStyle: React.CSSProperties = {
  padding: '0.7rem 1rem',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer'
};

const btnLinkStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#2563eb',
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: 0
};