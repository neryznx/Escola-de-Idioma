import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, PlayCircle, Clock, Star, Plus, X, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ nome: '', descricao: '', duracao: '', nivel: 'Básico', imagem: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/cursos/`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Falha ao buscar cursos');
      }
    } catch (err) {
      console.error('Erro de conexão ao buscar cursos:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/cursos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newCourse, 
          professor_id: user?.role === 'professor' ? user.id : null 
        })
      });
      if (response.ok) {
        setShowModal(false);
        setNewCourse({ nome: '', descricao: '', duracao: '', nivel: 'Básico', imagem: '' });
        fetchCourses();
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao criar curso');
      }
    } catch (err) {
      setError('Erro de conexão ao servidor para criar curso');
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
                <span className="bg-white/10 text-brand-orange px-3 py-2 rounded-md font-medium transition-colors cursor-default">
                  Cursos
                </span>
                <Link to="/professores" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                  Professores
                </Link>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Cursos Disponíveis</h2>
            <p className="mt-2 text-gray-600">Escolha o seu próximo curso e alavanque a sua carreira.</p>
          </div>
          {user?.role === 'professor' && (
            <button
              onClick={() => {
                setError('');
                setShowModal(true);
              }}
              className="mt-4 md:mt-0 flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-brand-purple hover:bg-purple-700 focus:outline-none transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Curso
            </button>
          )}
        </div>

        {/* Course Grid */}
        {courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            Nenhum curso cadastrado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => {
              const defaultImage = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop";
              return (
                <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={course.imagem || defaultImage} 
                      alt={course.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">
                      {course.nivel}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.nome}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{course.descricao || 'Sem descrição cadastrada.'}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <User className="w-4 h-4 mr-1.5 text-brand-purple" />
                      <span className="font-medium text-gray-700">Prof. {course.professor_nome || 'A definir'}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duracao}
                      </div>
                      <div className="flex items-center text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-gray-700 font-medium">4.8</span>
                      </div>
                    </div>

                    <button className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md text-brand-purple bg-purple-50 hover:bg-brand-purple hover:text-white transition-colors font-medium">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Acessar Curso
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal para criar curso */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Cadastrar Novo Curso</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {error && (
              <div className="m-4 bg-red-50 border-l-4 border-red-500 p-3 rounded text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Curso *</label>
                <input
                  type="text"
                  required
                  value={newCourse.nome}
                  onChange={(e) => setNewCourse({ ...newCourse, nome: e.target.value })}
                  placeholder="Ex: Inglês para Iniciantes"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nível *</label>
                  <select
                    value={newCourse.nivel}
                    onChange={(e) => setNewCourse({ ...newCourse, nivel: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                  >
                    <option value="Básico">Básico</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duração *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.duracao}
                    onChange={(e) => setNewCourse({ ...newCourse, duracao: e.target.value })}
                    placeholder="Ex: 40h"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={newCourse.descricao}
                  onChange={(e) => setNewCourse({ ...newCourse, descricao: e.target.value })}
                  placeholder="Descreva o conteúdo do curso..."
                  rows={3}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input
                  type="text"
                  value={newCourse.imagem}
                  onChange={(e) => setNewCourse({ ...newCourse, imagem: e.target.value })}
                  placeholder="Deixe em branco para usar uma imagem padrão"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-brand-purple hover:bg-purple-700 focus:outline-none"
                >
                  Criar Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
