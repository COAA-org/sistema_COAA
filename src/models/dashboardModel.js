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
    return database.executar(query);
}

// Lugar mais movimentado
function maisMovimentado(){
    var query = `
    
    `
    info(query);
    return database.executar(query);
}


// Por horário
function fluxoPorHora(){
    var query = `
    
    `
    info(query);
    return database.executar(query);
}






module.exports ={
    maiorHoraPico,

    
}