import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, Auth } from 'firebase/auth'; // Removemos o CustomToken
import { getFirestore, setLogLevel, Firestore } from 'firebase/firestore';

// -----------------------------------------------------------------
// PASSO 4: COLE SUAS CREDENCIAIS DO FIREBASE (DO PASSO 3) AQUI
// -----------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC4PUKDZBXAH-u1bV22ogCUaw5sq7DJ47g",
  authDomain: "eciclo-4d62d.firebaseapp.com",
  projectId: "eciclo-4d62d",
  storageBucket: "eciclo-4d62d.firebasestorage.app",
  messagingSenderId: "1796912862",
  appId: "1:1796912862:web:bde00227a87b3c0b87744f",
  measurementId: "G-PZWE75BYSE"
};
// -----------------------------------------------------------------

// Inicializa o Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

setLogLevel('debug');

/**
 * Função para obter o App ID (usado para montar os caminhos da base de dados).
 * ATENÇÃO: Como não estamos mais no Canvas, não temos o __app_id.
 * Vamos simplificar os caminhos do Firestore.
 */
export const getAppId = (): string => {
  // Retorna o Project ID como um ID único
  return firebaseConfig.projectId || 'e-ciclo-local';
};

/**
 * Função para autenticar o usuário (modificada para local)
 * Tenta apenas o login anônimo.
 */
export const initializeAuth = async (): Promise<void> => {
  try {
    // Como não temos token customizado localmente,
    // o app SEMPRE iniciará como Anônimo.
    await signInAnonymously(auth);
    console.log("Firebase: Login anônimo local realizado com sucesso.");
  } catch (error) {
    console.error("Firebase Auth Error (Local):", error);
  }
};

// Exporta as instâncias principais
export { app, auth, db };