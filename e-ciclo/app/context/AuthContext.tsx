import React, { createContext, useState, useEffect, useContext } from 'react';
// 1. CORREÇÃO: Importando o arquivo .ts (TypeScript)
import { auth, initializeAuth } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth'; // Usando o tipo User

// Definindo a interface (shape) do nosso Contexto
interface AuthContextType {
  user: User | null;
  isAuthReady: boolean;
  isLoading: boolean;
  userId: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

// Cria o Contexto com valores padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthReady: false,
  isLoading: true,
  userId: null,
  signInWithGoogle: () => Promise.resolve(false),
  signOut: () => Promise.resolve(),
});

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// O Provedor (Provider) que envolve o aplicativo
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); 
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void; // Variável para guardar o listener

    // 1. Inicializa a autenticação (login com token customizado/anônimo)
    const setupAuth = async () => {
      await initializeAuth();
      setIsLoading(false);

      // 2. Assina o listener de estado de autenticação
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setIsAuthReady(true);
      });
    };
    
    setupAuth();

    // Limpa o listener ao desmontar
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Simulação de Google Sign-In (necessária no ambiente Canvas)
  const signInWithGoogle = async (): Promise<boolean> => {
    if (user) {
      console.log('Simulação de login Google bem-sucedida.');
      return true; 
    }
    console.warn('Simulação de login: Falha. O usuário deve ser autenticado no início.');
    return false;
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      console.log('Usuário deslogado com sucesso.');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const contextValue = {
    user,
    isAuthReady,
    isLoading, 
    userId: user?.uid || null, // ID do usuário ou null
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};