import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store user info if necessary
        localStorage.setItem('user', JSON.stringify(data.aluno || data.id));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Erro de autenticação');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex bg-slate-50">
      {/* Left section: Visuals & Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
            alt="Students talking" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="z-10 text-center px-12 glass-effect rounded-2xl p-8 max-w-lg shadow-2xl m-4">
          <BookOpen className="w-16 h-16 text-brand-orange mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Idiomas sem fronteiras</h1>
          <p className="text-lg text-gray-200">
            Aprenda inglês de forma prática, moderna e objetiva. Alcance fluência para a sua carreira.
          </p>
        </div>
      </div>

      {/* Right section: Authentication */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 border-b-4 border-brand-purple pb-2 inline-block">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Faça login para continuar sua jornada.' : 'Cadastre-se para ter acesso a todos os cursos.'}
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="nome"
                      type="text"
                      required={!isLogin}
                      value={formData.nome}
                      onChange={handleChange}
                      className="focus:ring-brand-purple focus:border-brand-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border px-4"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-brand-purple focus:border-brand-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border px-4"
                    placeholder="voce@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="senha"
                    type="password"
                    required
                    value={formData.senha}
                    onChange={handleChange}
                    className="focus:ring-brand-purple focus:border-brand-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border px-4"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-purple hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-colors disabled:opacity-50 flex items-center"
                >
                  {loading ? 'Aguarde...' : (
                    <>
                      {isLogin ? <LogIn className="h-5 w-5 mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                      {isLogin ? 'Entrar na Plataforma' : 'Criar Conta'}
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm font-medium text-brand-orange hover:text-orange-600 transition-colors"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
              >
                {isLogin ? 'Ainda não tem conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
