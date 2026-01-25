import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!password) {
      newErrors.password = 'Mot de passe requis';
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      console.log('Connexion:', { email, password });
      alert('Connexion simulée !');
    }, 2000);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await loginWithGoogle();
      console.log('User connected:', user);
      // alert(`Connecté en tant que ${user.displayName}`);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la connexion Google');
    } finally {
      setIsLoading(false);
    }
  };

  const title = "Connexion";
  const subtitle = "Bienvenue sur mon portfolio";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" style={{ animation: 'slowPulse 8s ease-in-out infinite' }}></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" style={{ animation: 'slowPulse 8s ease-in-out infinite 4s' }}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Badge */}
        <div className="flex justify-center mb-8" style={{ animation: 'scaleIn 0.5s ease-out' }}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative p-4 bg-slate-800/90 backdrop-blur-sm rounded-full border border-purple-500/30 shadow-xl">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Animated Title */}
        <div className="text-center mb-8" style={{ animation: 'fadeInDown 0.6s ease-out' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
            {title}
          </h1>
          <p className="text-gray-400" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s backwards' }}>
            {subtitle}
          </p>
        </div>

        {/* Login Card */}
        {!isActive ? (
          // Google Login View
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-8" style={{ animation: 'slideUp 0.8s ease-out' }}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Connectez-vous facilement
              </h2>
              
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="relative w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-3 py-3">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-gray-700 font-semibold">Continuer avec Google</span>
                    </>
                  )}
                </div>
              </button>

              {/* GitHub Button */}
              <button

                  onClick={() => setIsActive(true)}
                type="button"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-gray-300 hover:bg-slate-900 hover:border-slate-500 transition-all"
              >
                <svg id="fingerprintIcon" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 11c0-3-2-5-5-5s-5 2-5 5c0 3 2 5 5 5s5-2 5-5z"/>
                <path d="M12 22c4-1 7-5 7-10 0-6-5-11-11-11S1 6 1 12c0 5 3 9 7 10"/>
                <path d="M12 15c2-1 3-3 3-6 0-3-2-5-5-5s-5 2-5 5c0 3 1 5 3 6"/>
                </svg>


                <span className="font-medium">Utiliser mes identifiants</span>
              </button>
            </div>

          
          </div>
        ) : (
          // Email/Password Login View
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-8" style={{ animation: 'slideUp 0.8s ease-out' }}>
            <div className="space-y-6">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Retour
              </button>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border ${
                        errors.email ? 'border-red-500' : 'border-slate-600'
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm" style={{ animation: 'shake 0.4s ease-in-out' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 bg-slate-900/50 border ${
                        errors.password ? 'border-red-500' : 'border-slate-600'
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm" style={{ animation: 'shake 0.4s ease-in-out' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Se souvenir
                  </span>
                </label>
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="relative w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 py-3 text-white font-semibold">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connexion...</span>
                    </>
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </div>

            
          </div>
        )}

       
      </div>

      {/* Custom Animations CSS */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        @keyframes slowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}