-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

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
fkEndereco INT
);
SELECT * FROM Empresa;

CREATE TABLE Endereco
(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
lougradouro VARCHAR(60),
bairro VARCHAR(60),
municipio VARCHAR(60),
estado CHAR(2),
cep CHAR(9)
);
INSERT INTO Endereco (lougradouro, bairro, municipio, cep)
SELECT * FROM (SELECT 'cep') AS tmp
WHERE NOT EXISTS (
    SELECT cep FROM Endereco WHERE cep = 'Galera'
) LIMIT 1;
ALTER TABLE Empresa ADD CONSTRAINT FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco);
desc Empresa;
SELECT * FROM Empresa;
UPDATE Empresa set cnpj = '89655215000154' where idEmpresa=2;
SELECT * FROM Fabrica;
SELECT * FROM Usuario;
UPDATE Usuario
	SET fkEmpresa = (SELECT idEmpresa FROM Empresa WHERE cnpj = '89655215000154')
		WHERE idCadLog = (SELECT idCadLog as id FROM (SELECT idCadLog FROM Usuario  where email='sonoda.lari@gmail.com') as p);
TRUNCATE Usuario;
SELECT * FROM Endereco;
DELETE FROM Endereco WHERE idEndereco in (1,2);
DELETE FROM Empresa WHERE idEmpresa in (5);
DELETE FROM Usuario WHERE idCadLog in (2,7);
CREATE TABLE Fabrica
(
idFabrica INT PRIMARY KEY AUTO_INCREMENT,
nomeFabrica VARCHAR(60),
Telefone CHAR(12),
TelefoneCelular CHAR(11),
fkEmpresa INT,
fkEndereco INT,
complemento VARCHAR(60),
numeroEndereco INT
);

ALTER TABLE Fabrica ADD CONSTRAINT FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco);
ALTER TABLE Fabrica ADD CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa);

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
INSERT INTO LocalFab VALUES (null, 'geral', 'banheiros', null);
INSERT INTO Sensores VALUES (null, 'TRCT5000', current_date(), 1);


CREATE TABLE Registro
(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
saidaDado INT,
dataHora DATETIME DEFAULT current_timestamp,
fkSensores INT,
FOREIGN KEY(fkSensores) REFERENCES Sensores(idSensores)
);
INSERT INTO Registro VALUES (null, 15, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 25, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 99, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 40, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 50, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 80, current_timestamp(), 1);
INSERT INTO Registro VALUES (null, 78, current_timestamp(), 1);
SELECT saidaDado, dataHora FROM Registro JOIN Sensores ON fkSensores=idSensores
										JOIN LocalFab ON fkLocal=idLocal;
                                        
SELECT * FROM Registro JOIN Sensores ON fkSensores=idSensores
										JOIN LocalFab ON fkLocal=idLocal;
CREATE TABLE usuario
(
idCadLog INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(60),
senha VARCHAR(17),
cpf CHAR(14),
fkEmpresa INT,
FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa)
);

ALTER TABLE Empresa ADD WhatsApp CHAR(11);

SELECT * FROM Registro;

ALTER TABLE Empresa ADD Complemento VARCHAR(60);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
