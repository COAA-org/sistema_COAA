var erros = 0;

function validarLogin() {
    // Variaveis
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    // Verificações
    var verif_email = email != "" && (email.endsWith('.com') || email.endsWith('.br'));
    var verif_senha = senha.length >= 6;

    if (verif_email) {
        if (verif_senha) {
            window.location.assign('./cadastro.html');// Redirecionando o usuário para a pág de cadastro
        } else {
            alert(`Senha Inválida! Cuidado com tentativas inválidas!`);
            ipt_senha.focus();
        }
    } else {
        alert(`E-mail inválido! Por favor, insira um e-mail válido.`);
        ipt_email.focus();
    }
}
function validarEndereco() {
    // variáveis
    var rua = ipt_rua.value;
    var numero = ipt_numero.value;
    var cep = ipt_cep.value;
    var bairro = ipt_bairro.value;
    var cidade = ipt_cidade.value;

    var valida_rua = "";
    var valida_numero = "";
    var valida_cep = "";
    var valida_bairro = "";
    var valida_cidade = "";

    // validações
    valida_rua = rua.startsWith('Rua') || rua.startsWith('Avenida');
    valida_numero = numero.length > 0;
    valida_cep = cep.length == 8;
    valida_bairro = bairro.length > 0;
    valida_cidade = cidade.length > 0;

    // verificações
    if (valida_rua && valida_numero && valida_cep && valida_bairro && valida_cidade) {
        alert("Campos inseridos corretamente!");
        erros += 1;
    }
    if (rua == 0 && numero == 0 && cep == 0 && bairro == 0 && cidade == 0) {
        alert("Os campos do Endereço são obrigatórios!")
        erros += 1;
    }
    if (typeof rua == "number") {
        alert("Insira apenas o nome da Rua!");
        erros += 1;
        ipt_rua.focus();
    } else if (rua == 0) {
        alert("Insira um endereço válido!");
        erros += 1;
        ipt_rua.focus();
    }
    if (numero <= 0) {
        alert("Insira um número válido!");
        erros += 1;
        ipt_numero.focus();
    }
    else if (typeof numero == 0) {
        alert("Insira número válido à indústria!");
        erros += 1;
        ipt_numero.focus();
    }
    if (cep.length == 0) {
        alert("Insira o CEP!");
        erros += 1;
        ipt_cep.focus();
    }
    if (cep.length < 8 || cep.length > 8) {
        alert("Insira um CEP válido!");
        erros += 1;
        ipt_cep.focus();
    }
    if (bairro == 0) {
        alert("Insira o bairro!");
        erros += 1;
        ipt_bairro.focus();
    }
    else if (typeof bairro == "number") {
        alert("Não insira valores numéricos no bairro!");
        erros += 1;
        ipt_bairro.focus();
    }
    if (cidade == 0) {
        alert("Insira a cidade!");
        erros += 1;
        ipt_cidade.focus();
    }
    else if (typeof cidade == "number") {
        alert("Não insira valores numéricos na cidade!");
        erros += 1;
        ipt_cidade.focus();
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
        console.log("tel: OK")
    } else if (typeof telefone == "string") {
        alert(`Não aceitamos letras no campo de telefone!`);
        erros += 1;
        ipt_telefone.focus();
    } else {
        alert(`Por favor, insira o telefone corretamente!`);
        erros += 1;
        ipt_telefone.focus();
    }

    if (valida_whats) {
        console.log("zap: OK")
    } else if (typeof whats == "string") {
        alert(`Não aceitamos letras no campo de WhatsApp!`);
        erros += 1;
        ipt_wpp.focus();
    } else {
        alert(`Por favor, insira o WhatsApp corretamente!`);
        erros += 1;
        ipt_wpp.focus();
    }

    if (valida_email) {
        // Todos os campos estão corretos :) !
        // alert(`Todos os campos estão corretos :)`);
        console.log("Tudo OK")
    } else {
        alert(`Os E-mails não podem ser diferentes!`);
        erros += 1;
        ipt_emailConfirm.focus()
    }
}

function validarInfos() {
    // criação de variáveis
    var nomeEmpresa = ipt_nomeEmpresa.value;
    var descricao = ipt_descricaoEmpresa.value;
    var cnpj = ipt_cnpj.value;

    //verificações
    var verif_nome = nomeEmpresa == '';
    var verif_desc = descricao.length < 10;
    //verifica se o cnpj está vazio, se o tamanho do digitado é diferente do padrão(14 dígitos) e elimina os valores falsos mais comuns
    var verif_cnpj = cnpj == '' || cnpj.length != 14 || cnpj == '00000000000000' || cnpj == '11111111111111' || cnpj == '22222222222222' || cnpj == '33333333333333' || cnpj == '44444444444444' || cnpj == '55555555555555' || cnpj == '66666666666666' || cnpj == '77777777777777' || cnpj == '88888888888888' || cnpj == '99999999999999';
    if (verif_nome) {
        alert("Insira corretamente o nome");
        erros += 1;
        ipt_nomeEmpresa.focus();
    }
    if (verif_desc) {
        alert("A descrição deve conter pelo menos 10 caracteres");
        erros += 1;
        ipt_descricaoEmpresa.focus();
    }
    if (verif_cnpj) {
        alert("Informe um CNPJ válido");
        erros += 1;
        ipt_cnpj.focus();
    }

}

// Função para chamar outras funções que são de validação 
function validar() {
    validarContato();
    validarInfos();
    validarEndereco();

    if (erros == 0) {
        window.location = "../cadastro/CadastroConcluido.html";
    }
}

function avancar() {
    window.location = "../dashboard/dashboard.html";
}

//criptografa a senha
function criptografar() {
    var senha = ipt_senha.value;
    var ascii = 0;
    var x = 0;

    while (senha[x]) {
        ascii = senha[x].charCodeAt();
        ascii += 3;
        msg.innerHTML += String.fromCharCode(ascii);
        x++;
    }
}

// function calcular() {
//     var salario = ipt_salario.value;
//     var atraso = ipt_atraso.value;

//     /* 
//         Horas trabalhadas = 8 (horas por dia trabalhadas) * (30 (dias do mes) - 8 (final de semana) = 22) -- dias 
//         8 * 22 = 176 (horas trabalhadas por mês)
//         valor salario / horas trabalhadas (salario/176)
//         */
//     var GanhoHora = (salario / 176);

//     /* (atraso * 22 (dias trabalhados)) -- transformar em hora * ganhohora

//      */

//     /* Resposta calcular porcentagem Absenteísmo (%) = Número de dias ou horas 
//     de ausência / período de horas úteis da empresa x 100*/

//     var perdidos = (((atraso * 22) / 60) * GanhoHora);
//     var totalPerdido = (perdidos * 12);
//     var totalFuncionarios = (totalPerdido * ipt_funcionarios.value);
//     var porcentagemAbsenteísmo = ((totalPerdido / 8) / 100);

//     div_mensagem.innerHTML += `Atualmente a taxa de absenteísmo da sua empresa é ${porcentagemAbsenteísmo}%. Se um funcionário 
//     atrasar por dia ${ipt_atraso.value} minutos, serão perdidos ${perdidos} reais por mês. Ao olhar a longo prazo, em um ano, 
//     serão pedidos ${totalPerdido} reais. Caso toda a equipe tenha esse padrão, o prejuízo anual será de ${totalFuncionarios} reais. `;
//     /* Criar textinho com todas as informaçoes */
// }

function calcular() {
    div_mensagem.innerHTML = "";

        var horasTrab = ipt_horasTrabalhadas.value;
        var horasExtr = ipt_horasExtras.value;

        var prodPotencial = (horasTrab - horasExtr) / horasTrab;
        var prctgSistema = (horasTrab - (horasExtr * 0.5)) / horasTrab;

        div_mensagem.innerHTML += `Sua produtividade pontencial <b>atual é de ${(prodPotencial * 100).toFixed(1)}%</b><br>`;

        div_mensagem.innerHTML += `<br>Usando nosso sistema, sua <b>Produtividade Potencial pode chegar até ${(prctgSistema * 100).toFixed(1)}%</b><br>`;

        div_mensagem.innerHTML += `<br>Ou seja, um aumento de ${((prctgSistema - prodPotencial) * 100).toFixed(1)}% na Produtividade Potencial.`;
}

//FALE CONOSCO VERIFICAÇÃO
function enviar() {
    var contact_nome = ipt_nome.value;
    var contact_email = ipt_email.value;
    var contact_ddd = ddd.value;
    var contact_telefone = telefone.value;
    var contact_assunto = assunto.value;

    var verif_nome = contact_nome != '';
    var verif_email = contact_email != '' && (contact_email.indexOf('@') >= 0) && contact_email.endsWith('.com');
    var verif_assunto = contact_assunto != '';
    var verif_ddd = contact_ddd != '';
    var verif_telefone = contact_telefone != '';
    if (!(verif_nome)) {
        document.getElementById("ipt_nome").style.border = "1px solid red";
        alert("Preencha o campo nome!");
    }
    if (!(verif_email)) {
        document.getElementById("ipt_email").style.border = "1px solid red";
        alert("Informe o email corretamente!");
    }
    if (!(verif_ddd && verif_telefone)) {
        document.getElementById("ddd").style.border = "1px solid red";
        document.getElementById("telefone").style.border = "1px solid red";
        alert("Informe corretamente o número de telefone");
    }
    if (!(verif_assunto)) {
        document.getElementById("assunto").style.border = "1px solid red";
        alert("O campo assunto não pode estar vazio");
    }
    if (verif_nome && verif_email && verif_ddd && verif_telefone && verif_assunto) {
        document.getElementById("ipt_nome").style.border = "none";
        document.getElementById("ipt_email").style.border = "none";
        document.getElementById("ddd").style.border = "none";
        document.getElementById("telefone").style.border = "none";
        document.getElementById("assunto").style.border = "none";
    }
}

function clickMenu() {
    if (itens.style.display == 'block') {
        itens.style.display = 'none'
    } else {
        itens.style.display = 'block'
    }

}

const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;

function hideSlider() {
  slider.forEach(item => item.classList.remove('on'))
}

function showSlider() {
  slider[currentSlide].classList.add('on')
}

function nextSlider() {
  hideSlider()
  if(currentSlide === slider.length -1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  showSlider()
}

function prevSlider() {
  hideSlider()
  if(currentSlide === 0) {
    currentSlide = slider.length -1
  } else {
    currentSlide--
  }
  showSlider()
}

btnNext.addEventListener('click', nextSlider)
btnPrev.addEventListener('click', prevSlider)

setInterval(nextSlider, 3000)