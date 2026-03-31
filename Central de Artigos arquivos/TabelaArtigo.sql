CREATE TABLE Artigos(
id INT IDENTITY(1,1) PRIMARY KEY,
titulo VARCHAR(255) NOT NULL,
conteudo NVARCHAR(MAX) NOT NULL,
categoriaId INT NOT NULL,
data_publicacao DATE,
status VARCHAR(20)
);