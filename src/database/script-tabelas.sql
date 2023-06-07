create user coaa_adm1 identified by '1234567';

grant all privileges on COAA.* to coaa_adm1;

grant usage on COAA.* to coaa_adm1;

flush privileges;

CREATE DATABASE COAA;
USE COAA;

CREATE TABLE Empresa
(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14),
razaoEmpresa VARCHAR(60),
nomeEmpresa VARCHAR(60),
telefone CHAR(11),
email VARCHAR(60),
numeroEndereco INT,
fkEndereco INT,
-- WhatsApp CHAR(11),
Complemento VARCHAR(60)
);

CREATE TABLE Endereco
(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
lougradouro VARCHAR(60),
bairro VARCHAR(60),
estado CHAR(2),
cidade VARCHAR(50),
cep CHAR(8)
);

CREATE TABLE Fabrica
(
idFabrica INT PRIMARY KEY AUTO_INCREMENT,
nomeFabrica VARCHAR(60),
Telefone CHAR(12),
fkEmpresa INT,
fkEndereco INT,
complemento VARCHAR(60),
numeroEndereco INT
);

CREATE TABLE LocalFab
(
idLocal INT PRIMARY KEY AUTO_INCREMENT,
nomeLocal VARCHAR(60),
setor VARCHAR(60),
fkFabrica INT,
FOREIGN KEY(fkFabrica) REFERENCES Fabrica(idFabrica)
);

CREATE TABLE Sensores
(
idSensores INT PRIMARY KEY AUTO_INCREMENT,
modeloSensor VARCHAR(60),
dataInstal DATE,
fkLocal INT,
FOREIGN KEY(fkLocal) REFERENCES LocalFab(idLocal)
);

CREATE TABLE Registro
(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
saidaDado INT,
dataHora DATETIME DEFAULT current_timestamp,
fkSensores INT,
FOREIGN KEY(fkSensores) REFERENCES Sensores(idSensores)
);

CREATE TABLE Usuario
(
idCadLog INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(60),
senha VARCHAR(17),
cpf CHAR(14),
fkEmpresa INT,
FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa)
);

ALTER TABLE Empresa ADD CONSTRAINT FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco);
ALTER TABLE Fabrica ADD CONSTRAINT FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco);
ALTER TABLE Fabrica ADD CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa);

ALTER TABLE Endereco ADD COLUMN cidade VARCHAR(50);

 SELECT cep FROM Endereco WHERE cep = '08140089'

SELECT * FROM (SELECT 'cep') AS tmp
WHERE NOT EXISTS (
    SELECT cep FROM Endereco WHERE cep = 'Galera'
) LIMIT 1;

UPDATE Usuario
	SET fkEmpresa = (SELECT idEmpresa FROM Empresa WHERE cnpj = '89655215000154')
		WHERE idCadLog = (SELECT idCadLog as id FROM (SELECT idCadLog FROM Usuario  where email='sonoda.lari@gmail.com') as p);

TRUNCATE Usuario;

-- =================Usuário de Login Rápido (Lembrar)======================

INSERT INTO Usuario(nome, email, senha, cpf, fkEmpresa) VALUES
('Felipe Alves', 'Felipe@email.com', '1234567', '12345678910', null);
INSERT INTO Empresa(cnpj, nomeEmpresa, telefone, email, numeroEndereco, fkEndereco) VALUES
('11111111111112', 'Sphack Ltda.', '12345678910', 'Sphack@email.com', 123, null);
INSERT INTO Endereco(lougradouro, bairro, estado, cidade, cep) VALUES
('Rua do Limoeiro', 'Bairro do Limoeiro', 'SP', 'São Paulo', '12345678');
INSERT INTO Fabrica(nomeFabrica, Telefone, fkEmpresa, fkEndereco, numeroEndereco) VALUES
('Fábrica Sphack', '10987654321', 1, 1, 321);

UPDATE Usuario SET fkEmpresa = 1 WHERE idCadLog = 1;
UPDATE Empresa SET fkEndereco = 1 WHERE idEmpresa = 1;

-- =====================================================================

INSERT INTO Sensores VALUES (null, 'TRCT5000', current_date(), 1);

INSERT INTO Registro VALUES (null, 15, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 25, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 99, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 40, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 50, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 80, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 78, current_timestamp(), 1);


-- ===============SELECTS para apoio=================

SELECT saidaDado, dataHora FROM Registro JOIN Sensores ON fkSensores=idSensores
										JOIN LocalFab ON fkLocal=idLocal;
                                        
SELECT * FROM Registro JOIN Sensores ON fkSensores=idSensores
										JOIN LocalFab ON fkLocal=idLocal;
                                        
SELECT * FROM Empresa;
SELECT * FROM Endereco;
SELECT * FROM Fabrica;
SELECT * FROM LocalFab;
SELECT * FROM Sensores;
SELECT * FROM Registro;
SELECT * FROM Usuario;

UPDATE Usuario SET fkEmpresa = 2 WHERE idCadLog = 3;