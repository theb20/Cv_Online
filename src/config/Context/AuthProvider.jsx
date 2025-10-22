import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../Services/authServices.js';
import { loginWithGoogleToken } from '../Services/googleAuthService.js';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔍 Vérifie si un utilisateur est déjà connecté
  const checkAuth = async () => {
    try {
      const response = await authService.getMe();
      if (response?.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  // 🧠 Vérifie l’état de connexion de l’utilisateur
  const checkUser = () => {
    return user !== null;
  };

  // 🔐 Connexion classique
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      await checkAuth();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 🔐 Connexion via Google
  const loginWithGoogle = async (googleToken) => {
    try {
      const response = await loginWithGoogleToken(googleToken);
      await checkAuth();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 🚪 Déconnexion
  const logout = async () => {
    try {
      const response = await authService.logout();
      setUser(null);
      navigate('/');
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 🧾 Inscription
  const register = async (credentials) => {
    try {
      const response = await authService.register(credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // ✏️ Modifier un utilisateur
  const putUserById = async (id, userData) => {
    try {
      const response = await authService.updateUser(id, userData);
      await checkAuth();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // ❌ Supprimer un utilisateur
  const deleteUserById = async (id) => {
    try {
      const response = await authService.deleteUser(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 📋 Récupérer tous les utilisateurs
  const allUsers = async () => {
    try {
      const response = await authService.getAuth();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // ⚙️ Vérifie l'authentification au démarrage
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        logout,
        register,
        putUserById,
        deleteUserById,
        checkUser,
        refreshUser,
        allUsers,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
