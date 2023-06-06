var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listarFuncs/:idEmpresa", function (req, res) {
    usuarioController.listarFuncs(req, res);
});
router.get("/listarFuncById/:idFunc", function (req, res) {
    usuarioController.selectFuncById(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.put("/cadFkEmpAdm", function (req, res) {
    usuarioController.cadFkEmpAdm(req, res);
})

router.post("/cadastrarAdm", function (req, res) {
    usuarioController.cadastrarAdm(req, res);
})

router.post("/cadastrarFunc", function (req, res) {
    usuarioController.cadastrarFunc(req, res);
})

router.post("/cadastrarFabrica", function (req, res) {
    usuarioController.cadastrarFabrica(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.put("/editar/:idFunc", function (req, res) {
    usuarioController.editar(req, res);
});

router.delete("/deletarFunc/:idFunc", function (req, res) {
    usuarioController.deletarFunc(req, res);
});

module.exports = router;