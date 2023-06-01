var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idLocal", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})
// router.get("/getLocais/:idEmpresa", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })

module.exports = router;