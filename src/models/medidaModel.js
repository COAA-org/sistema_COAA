var database = require("../database/config");

//  function buscarUltimasMedidas(idSensor, limite_linhas) {

//      instrucaoSql = ''

//      if (process.env.AMBIENTE_PROCESSO == "producao") {
//          instrucaoSql = `select top ${limite_linhas}
//          dht11_temperatura as temperatura, 
//          dht11_umidade as umidade,  
//                          momento,
//                          FORMAT(momento, 'HH:mm:ss') as momento_grafico
//                      from medida
//                     where fk_aquario = ${idAquario}
//                      order by id desc`;
//      } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//          instrucaoSql = `select 
//          dht11_temperatura as temperatura, 
//          dht11_umidade as umidade,
//                          momento,
//                          DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
//                      from medida
//                      where fk_aquario = ${idAquario}
//                      order by id desc limit ${limite_linhas}`;
//      } else {
//          console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//          return
//      }

//      console.log("Executando a instrução SQL: \n" + instrucaoSql);
//      return database.executar(instrucaoSql);
//  }

function buscarMedidasEmTempoReal(idSensor) {

    instrucaoSql = ''

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top 1
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,  
    //                     CONVERT(varchar, momento, 108) as momento_grafico, 
    //                     fk_aquario 
    //                     from medida where fk_aquario = ${idAquario} 
    //                 order by id desc`;

    // } else 
    // if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT count(R.saidaDado) AS 'Fluxo', sec_to_time(time_to_sec(current_time())-3600) as 'inicio_contagem',
        sec_to_time(time_to_sec(current_time())) AS 'fim_contagem'  FROM Registro as R WHERE
        dataHora >= sec_to_time(time_to_sec(current_time())-3600) AND dataHora <= sec_to_time(time_to_sec(current_time())) 
        AND fkSensores = ${idSensor};`;
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     return
    // }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarMedidasEmTempoReal
}
