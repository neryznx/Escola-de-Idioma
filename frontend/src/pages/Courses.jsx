import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, PlayCircle, Clock, Star } from 'lucide-react';

export default function Courses() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const courses = [
    {
      id: 1,
      title: 'Inglês para Iniciantes',
      description: 'Comece do zero e aprenda a base da língua inglesa para situações do dia a dia.',
      duration: '40h',
      level: 'Básico',
      image: 'https://images.unsplash.com/photo-1522881451255-f59a83e81120?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Conversação Avançada',
      description: 'Aprimore sua fluência com debates, podcasts e vocabulário avançado voltado para negócios.',
      duration: '60h',
      level: 'Avançado',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Inglês para Viagens',
      description: 'Prepare-se para viajar pelo mundo! Aprenda frases essenciais para aeroportos, hotéis e restaurantes.',
      duration: '25h',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Preparatório TOEFL/IELTS',
      description: 'Estratégias avançadas de leitura, escuta e redação para você alcançar a nota máxima nos testes.',
      duration: '80h',
      level: 'Avançado',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop'
    }
  ];

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Cursos Disponíveis</h2>
            <p className="mt-2 text-gray-600">Escolha o seu próximo curso e alavanque a sua carreira.</p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
              <div className="relative h-48">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">
                  {course.level}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{course.description}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
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
          ))}
        </div>
      </main>
    </div>
  );
}
