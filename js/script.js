function validarLogin() {
    // Variaveis
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    // Verificações
    var verif_email = email != "" && (email.endsWith('.com') || email.endsWith('.br'));
    var verif_senha = senha.length >= 6;

    if (verif_email) {
        if (verif_senha) {
            window.location.assign('./cadastro.html');// Redirecioando o usuário para a pág de cadastro
        } else {
            alert(`Senha Inválida! Cuidado com tentativas inválidas!`);
            ipt_senha.focus();
        }
    } else {
        alert(`E-mail inválido! Por favor, insira um e-mail válido.`);
        ipt_email.focus();
    }
}

function validarContato() {
    // Variaveis
    var telefone = ipt_telefone.value;
    var whats = ipt_wpp.value;
    var email = ipt_email.value;
    var emailConfirm = ipt_emailConfirm.value;

    var valida_telefone = "";
    var valida_whats = "";
    var valida_email = "";

    // Validações
    valida_telefone = telefone.length >= 8 && telefone.length <= 13;
    valida_whats = whats.length >= 8 && whats.length <= 12;
    valida_email = email == emailConfirm;

    // Verificações
    if (valida_telefone) {
        if (valida_whats) {
            if (valida_email) {
                // Todos os campos estão corretos :) !
                alert(`Todos os campos estão corretos :)`);

            } else {
                alert(`Os E-mails não podem ser diferentes!`);
                ipt_emailConfirm.focus()
            }

        } else if (typeof whats == "string") {
            alert(`Não aceitamos letras no campo de WhatsApp!`);
            ipt_wpp.focus();

        } else {
            alert(`Por favor, insira o WhatsApp corretamente!`);
            ipt_wpp.focus();
        }

    } else if (typeof telefone == "string") {
        alert(`Não aceitamos letras no campo de telefone!`);
        ipt_telefone.focus();

    } else {
        alert(`Por favor, insira o telefone corretamente!`);
        ipt_telefone.focus();

    }
}

function validarInfos(){
    // criação de variáveis
    var nomeEmpresa = ipt_nomeEmpresa.value;
    var descricao = ipt_descricaoEmpresa.value;
    var cnpj = ipt_cnpj.value;

    //verificações
    var verif_nome =  nomeEmpresa == '';
    var verif_desc = descricao.length < 10;
    //verifica se o cnpj está vazio, se o tamanho do digitado é diferente do padrão(14 dígitos) e elimina os valores falsos mais comuns
    var verif_cnpj = cnpj == '' || cnpj.length != 14 || cnpj == '00000000000000' || cnpj == '11111111111111' || cnpj == '22222222222222' || cnpj == '33333333333333' || cnpj == '44444444444444' || cnpj == '55555555555555' || cnpj == '66666666666666' || cnpj == '77777777777777' || cnpj == '88888888888888' || cnpj == '99999999999999';
    if(verif_nome){
        alert("Insira corretamente o nome");
        ipt_nomeEmpresa.focus();
    }
    if(verif_desc){
        alert("A descrição deve conter pelo menos 10 caracteres");
        ipt_descricaoEmpresa.focus();
    }
    if(verif_cnpj){
        alert("Informe um CNPJ válido");
        ipt_cnpj.focus();
    }

}

// Função para chamar outras funções que são de validação 
function validar() {
    validarContato();
    validarInfos();
}