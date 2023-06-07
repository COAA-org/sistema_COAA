-- Inserts
DESC COAA.Registro;
INSERT INTO COAA.Registro (saidaDado, dataHora)
VALUES (10, '2023-06-05 10:00:00')
	, (2, '2023-06-05 11:00:00')
    , (7, '2023-06-05 12:00:00')
    , (90, '2023-06-05 13:00:00')
    , (70, '2023-06-05 14:00:00')
    , (60, '2023-06-05 15:00:00')
    , (47, '2023-06-05 16:00:00')
    , (46, '2023-06-05 17:00:00')
    , (32, '2023-06-05 18:00:00')
    , (12, '2023-06-05 19:00:00');
    
INSERT INTO COAA.LocalFab (nomeLocal)
VALUES ('Armazem Segundário - X23')
    , ('Estoque de Peças centrais - E2')
    , ('Pátio central - RT2')
    , ('Sala Ténica - Redes - RD2');

SELECT * FROM COAA.LocalFab;

INSERT INTO COAA.Sensores (modeloSensor, fkLocal)
VALUES ('tcrt5000', 1)
    , ('tcrt5000', 2)
    , ('tcrt5000', 3)
    , ('tcrt5000', 4);

UPDATE COAA.Registro SET fkSensores = 1 WHERE idRegistro = 2;

-- Maior horário de pico
SELECT HOUR(dataHora) hora, SUM(saidaDado) qtdFluxo FROM COAA.Registro 
		GROUP BY HOUR(dataHora)
		ORDER BY qtdFluxo DESC LIMIT 1;

-- Lugar menos movimentado
SELECT HOUR(dataHora) hora, SUM(saidaDado) qtdFluxo FROM COAA.Registro 
		GROUP BY HOUR(dataHora)
		ORDER BY qtdFluxo DESC LIMIT 1

-- Lugar mais movimentado
SELECT * FROM COAA.Registro;

-- Fluxo por hora
SELECT HOUR(dataHora), SUM(saidaDado) qtdFluxo FROM COAA.Registro 
		GROUP BY HOUR(dataHora)
		ORDER BY qtdFluxo;