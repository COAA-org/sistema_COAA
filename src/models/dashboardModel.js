var database = require("../database/config"); 

function info(msg){
    console.log(`[Dashboard Model] Executando no banco: ${msg}`)
}

// Horário de maior pico
function maiorHoraPico(){
    var query = `
    SELECT HOUR(dataHora) hora, SUM(saidaDado) qtdFluxo FROM COAA.Registro 
        GROUP BY HOUR(dataHora)
        ORDER BY qtdFluxo DESC LIMIT 1;`

    info(query);
    return database.executar(query);
}
// Retorno: hora, qtdFluxo


// Lugar menos movimentado
function menosMovimentado(){
    var query = `
    
    `
    info(query);
    // return database.executar(query);
    return console.log('>>>>>>>>>>>>>>>>>>>>FUNÇÃO EM DESENVOLVIMENTO<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
}

// Lugar mais movimentado
function maisMovimentado(){
    var query = `

    `
    info(query);
    // return database.executar(query);
    return console.log('>>>>>>>>>>>>>>>>>>>>FUNÇÃO EM DESENVOLVIMENTO<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
}


// Fluxo por hora
function fluxoPorHora(){
    var query = `
    SELECT HOUR(dataHora) hora, SUM(saidaDado) qtdFluxo FROM COAA.Registro
        GROUP BY HOUR(dataHora)
        ORDER BY HOUR(dataHora) ASC;
    `
    info(query);
    return database.executar(query);
}


module.exports ={
    maiorHoraPico,
    menosMovimentado,
    maisMovimentado,
    fluxoPorHora    

}