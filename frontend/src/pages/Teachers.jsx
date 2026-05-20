import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Languages, Mail, Award } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/professores/`);
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      } else {
        console.error('Falha ao buscar professores');
      }
    } catch (err) {
      console.error('Erro na requisição dos professores:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar */}
      <nav className="bg-brand-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold tracking-wider text-brand-orange">
                Escola<span className="text-white">Idiomas</span>
              </span>
              <div className="hidden md:flex space-x-4">
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                  Cursos
                </Link>
                <span className="bg-white/10 text-brand-orange px-3 py-2 rounded-md font-medium transition-colors cursor-default">
                  Professores
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300 hidden sm:inline">
                Olá, <span className="text-white font-semibold">{user?.nome}</span> ({user?.role === 'professor' ? 'Professor' : 'Aluno'})
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md font-medium"
              >
                <span>Sair</span>
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Nossos Professores</h2>
          <p className="mt-2 text-gray-600">Conheça o corpo docente qualificado da nossa escola de idiomas.</p>
        </div>

        {teachers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            Nenhum professor cadastrado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teachers.map((teacher) => {
              // Extract initials for the avatar
              const initials = teacher.nome
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();

              return (
                <div key={teacher.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center text-xl font-bold mb-4 border border-brand-purple/20">
                    {initials || <User className="w-8 h-8" />}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{teacher.nome}</h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <Languages className="w-4 h-4 mr-1.5 text-brand-orange" />
                    <span className="font-semibold text-slate-700">{teacher.idioma}</span>
                  </div>

                  {teacher.email && (
                    <div className="flex items-center text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100 w-full justify-center">
                      <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                      <span className="truncate max-w-[180px]">{teacher.email}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
