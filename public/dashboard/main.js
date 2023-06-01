/* imports */
// Import do pacote para o arduíno
const serialport = require('serialport');

// Import do pacote para a criação da API
const express = require('express');

// Import do pacote para conectar com o MySQL
const mysql = require('mysql2');

//define a taxa de transmissão de dados
const SERIAL_BAUD_RATE = 9600;
//define a porta que o servidor irá usar
const SERVIDOR_PORTA = 3000;
const HABILITAR_OPERACAO_INSERIR = true;

// variaveis para inserir no banco
var cont = 0;
const serial = async (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade,
    valoresLm35Temperatura,
    valoresChave
) => {
    //banco
    const poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '1234567',
            database: 'COAA'
        }
    ).promise();

    //lista as portas 
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    //encontra o arduíno e a qual porta ele está conectado
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        const valores = data.split(';');
        // alteramos a ordem dos valores pelo número entre os colchetes para aparecer primeiro os dados
        // captados pelo sensor de bloqueio (índice 0)
        //aqui 
        const dht11Umidade = parseFloat(valores[4]);
        const dht11Temperatura = parseFloat(valores[1]);
        const luminosidade = parseFloat(valores[2]);
        const lm35Temperatura = parseFloat(valores[3]);
        const chave = parseInt(valores[0]);

        valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura);
        valoresLuminosidade.push(luminosidade);
        valoresLm35Temperatura.push(lm35Temperatura);
        valoresChave.push(chave);

        
        //parte do banco de dados
        if (HABILITAR_OPERACAO_INSERIR) {
            const date = new Date().toLocaleString();
            if (chave == 1) {
                // cont++;
                // console.log(chave + ',' + cont);
                await poolBancoDados.execute(
                    'INSERT INTO Registro (idRegistro, saidaDado) VALUES (?, ?)',
                    [null, chave]
                );
            }
            
            //setTimeout(inserirBanco, 5000, cont);
            
        }


    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade,
    valoresLm35Temperatura,
    valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    //mensagem exibida na linha de comando caso a API tenha sido executada de forma correta
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    //pega (get) os valores e retorna (return) a resposta (response) em um json
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
    app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });
    //dados que precisamos para o projeto
    app.get('/sensores/chave', (_, response) => {
        return response.json(valoresChave);
    });
}

(async () => {
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    const valoresLuminosidade = [];
    const valoresLm35Temperatura = [];
    const valoresChave = [];
    await serial(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresLuminosidade,
        valoresLm35Temperatura,
        valoresChave
    );
    servidor(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresLuminosidade,
        valoresLm35Temperatura,
        valoresChave
    );
})();
