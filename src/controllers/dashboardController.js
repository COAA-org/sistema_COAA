var dashModel = require("../models/dashboardModel");

function info(msg){
    console.log(`[Dashboard Controller] Executando: ${msg}`)
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


function fluxoPorHora(req, res){
    info("Fluxo por hora");
    
    dashModel.fluxoPorHora().then((resultado) =>{
        
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