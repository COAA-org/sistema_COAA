var dashModel = require("../models/dashboardModel");

function info(msg){
    console.log("[Dashboard Controller] Executando: ")
}

function maiorHoraPico(req, res){
    info("Maior Horário de Pico");
    
    dashModel.maiorHoraPico().then((resultado) =>{
        
        if(resultado.length > 0){
            res.status(200).json(resultado);

        }
        else{
            res.status(204).send("Nenhum resultado encontrado!")
        }

    }).catch((erro)=>{
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}


function fluxoPorHora(){
    info("Fluxo por hora");
    
    dashModel.maiorHoraPico().then((resultado) =>{
        
        if(resultado.length > 0){
            res.status(200).json(resultado);

        }
        else{
            res.status(204).send("Nenhum resultado encontrado!")
        }

    }).catch((erro)=>{
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports ={
    maiorHoraPico,
    fluxoPorHora
}