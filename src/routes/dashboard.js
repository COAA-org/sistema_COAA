var express = require("express");
var router = express.Router();
var dashController =  require("../controllers/dashboardController");

function info(msg){
    console.log(`[Dasboard Roter] Executando: ${msg}`)
}

router.get("/picoMaior", (req, res) => {
    info("Maior Horário de Pico");
    dashController.maiorHoraPico(req, res);

})

router.get("/fluxoHora", (req, res) => {
    info("Fluxo Por Hora");
    dashController.fluxoPorHora(req, res);

})



module.exports = router;