'use client';

import { useState, useEffect, useCallback } from 'react';

export const SUPERADMIN_EMAIL = 'helpus.ecommerce@gmail.com';
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '812202824664-s716306ibb7c15jh7aok2v0lfnuocpkn.apps.googleusercontent.com';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: string;
}

export function useGoogleAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Carregar sessão existente
  useEffect(() => {
    try {
      const stored = localStorage.getItem('usuario') || localStorage.getItem('helpus_google_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
          setIsAuthenticated(parsed.email.toLowerCase().trim() === SUPERADMIN_EMAIL);
        }
      }
    } catch {
      // Ignora erro
    }
  }, []);

  // 2. Auto-injetar SDK do Google GIS
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!(window as any).google?.accounts?.oauth2 && !document.getElementById('google-gsi-script')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // 3. Processar informações do perfil
  const processUserInfo = useCallback((googleUser: any) => {
    if (!googleUser || !googleUser.email) {
      setIsLoading(false);
      setError('Não foi possível obter dados do Google.');
      return;
    }

    const cleanEmail = googleUser.email.toLowerCase().trim();
    if (cleanEmail !== SUPERADMIN_EMAIL) {
      setIsLoading(false);
      setIsAuthenticated(false);
      setError(`⛔ Acesso restrito: ${cleanEmail} não é o SuperAdmin.`);
      return;
    }

    const userObj: UserSession = {
      id: googleUser.sub || googleUser.id,
      email: cleanEmail,
      name: googleUser.name || cleanEmail.split('@')[0],
      picture: googleUser.picture || '',
      role: 'SuperAdmin',
    };

    try {
      localStorage.setItem('helpus_google_auth_user', JSON.stringify(userObj));
      localStorage.setItem('usuario', JSON.stringify(userObj));
      localStorage.setItem('token', 'google_superadmin_' + userObj.id);
    } catch {
      // Ignora
    }

    setUser(userObj);
    setIsAuthenticated(true);
    setIsLoading(false);
    setError('');
  }, []);

  // 4. Executar Login
  const login = useCallback(() => {
    setError('');
    setIsLoading(true);

    if ((window as any).google?.accounts?.oauth2) {
      try {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const info = await res.json();
                processUserInfo(info);
              } catch {
                setIsLoading(false);
                setError('Erro ao validar dados com o Google.');
              }
            } else {
              setIsLoading(false);
            }
          },
          error_callback: () => {
            setIsLoading(false);
          },
        });
        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch {
        // Fallback popup
      }
    }

    // Fallback popup direto
    const redirectUri = encodeURIComponent(window.location.origin);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;
    window.open(authUrl, 'GoogleSignIn', 'width=500,height=650');
    setIsLoading(false);
  }, [processUserInfo]);

  // 5. Logout
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('helpus_google_auth_user');
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    } catch {
      // Ignora
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
}
