CREATE DATABASE IF NOT EXISTS escola_idiomas;
USE escola_idiomas;

CREATE TABLE IF NOT EXISTS alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    idioma VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    duracao VARCHAR(50) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    imagem VARCHAR(255),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- Inserir alguns cursos padrão
INSERT INTO cursos (nome, descricao, duracao, nivel, imagem, professor_id) VALUES
('Inglês para Iniciantes', 'Comece do zero e aprenda a base da língua inglesa para situações do dia a dia.', '40h', 'Básico', 'https://images.unsplash.com/photo-1522881451255-f59a83e81120?q=80&w=2070&auto=format&fit=crop', NULL),
('Conversação Avançada', 'Aprimore sua fluência com debates, podcasts e vocabulário avançado voltado para negócios.', '60h', 'Avançado', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', NULL),
('Inglês para Viagens', 'Prepare-se para viajar pelo mundo! Aprenda frases essenciais para aeroportos, hotéis e restaurantes.', '25h', 'Intermediário', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop', NULL);


