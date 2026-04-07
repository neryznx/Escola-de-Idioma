import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Plus, User, Languages } from 'lucide-react';

export default function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [nome, setNome] = useState('');
  const [idioma, setIdioma] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/professores/');
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      } else {
        console.error('Falha ao buscar professores');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nome || !idioma) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/professores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, idioma }),
      });

      if (response.ok) {
        setSuccess('Professor adicionado com sucesso!');
        setNome('');
        setIdioma('');
        fetchTeachers(); // Atualiza a lista
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao adicionar professor.');
      }
    } catch (err) {
      setError('Erro de conexão ao servidor.');
    }
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
            <div className="flex items-center">
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
          <h2 className="text-3xl font-extrabold text-gray-900">Professores</h2>
          <p className="mt-2 text-gray-600">Gerencie e visualize o corpo docente da escola de idiomas.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Create Teacher */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-brand-orange" />
                Novo Professor
              </h3>
              
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}
              {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">{success}</div>}

              <form onSubmit={handleAddTeacher} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                    placeholder="Nome do(a) professor(a)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <input
                    type="text"
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                    placeholder="Ex: Inglês, Espanhol..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-colors"
                >
                  Adicionar Professor
                </button>
              </form>
            </div>
          </div>

          {/* List Teachers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Professores Cadastrados</h3>
              </div>
              
              {teachers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Nenhum professor cadastrado ainda.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <li key={teacher.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-brand-purple/10 p-3 rounded-full">
                            <User className="w-6 h-6 text-brand-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{teacher.nome}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Languages className="w-4 h-4 mr-1 text-gray-400" />
                              {teacher.idioma}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          ID: {teacher.id}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
