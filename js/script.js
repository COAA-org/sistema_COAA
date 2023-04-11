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

// Função para chamar outras funções que são de validação 
function validar() {
    validarContato();
}