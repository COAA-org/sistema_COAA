function validarFuncionario() {
    // variáveis
    var nomeFunc = ipt_nomeFuncionario.value;
    var cpfFunc = ipt_cpfFuncionario.value;
    var emailFunc = ipt_emailFuncionario.value;
    var senhaFunc = ipt_senhaFuncionario.value;
    var confirmSenhaFunc = ipt_confirmacaoSenhaFuncionario.value;
    var erro = 0;

    // verificações
    var verif_campoFuncVazio = nomeFunc == '' || cpfFunc == '' || emailFunc == '' || senhaFunc == '' || confirmSenhaFunc == '';
    var verif_nomeFunc = nomeFunc == '';
    var verif_cpfFunc = cpfFunc.length != 14;
    var verif_emailFunc = emailFunc != "" && (emailFunc.endsWith('.com') || emailFunc.endsWith('.br')) || emailFunc.indexOf('@') > -1;
    var verif_senhaFunc = senhaFunc.length >= 6;
    var verif_confirmSenhaFunc = confirmSenhaFunc != senhaFunc;

    if (verif_campoFuncVazio) {
        alert('Preencha todos os campos!')
    }
    else if (verif_nomeFunc) {
        alert('O campo do nome não pode estar vazio!');
        erro += 1;
    }
    else if (verif_cpfFunc) {
        alert('Insira um CPF válido! Siga o modelo: 123.456.789.10');
        erro += 1;
    }
    else if (!verif_emailFunc) {
        alert('Insira um e-mail válido!');
        erro += 1;
    }
    else if (!verif_senhaFunc) {
        alert('A senha deve conter mais de 6 caracteres.');
        erro += 1;
    }
    else if (verif_confirmSenhaFunc) {
        alert('As senhas inseridas não são iguais!');
        erro += 1;
    }
    else if (erro == 0) {
        window.location = "../dashboard/dashboard.html";
    }

}