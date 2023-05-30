var alertas = [];

function obterdados(idLocal) {
    fetch(`/medidas/tempo-real/${idLocal}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idLocal);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idLocal) {
    var fluxo = resposta[0].temperatura;

    console.log(idLocal === resposta[0].fkFabrica)
    
    var grauDeAviso ='';


    var limites = {
        alto_fluxo: 100,
        ideal_fluxo: 50,
        medio_fluxo: 40,
        baixo_fluxo: 10
    };

    var classe_fluxo = 'cor-alerta';

    if (temp >= limites.alto_fluxo) {
        classe_fluxo = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(fluxo, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (fluxo < limites.alto_fluxo && fluxo >= limites.ideal_fluxo) {
        classe_fluxo = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(fluxo, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (fluxo < limites.alto_fluxo && fluxo > limites.medio_fluxo) {
        classe_fluxo = 'cor-alerta ideal';
        removerAlerta(idLocal);
    }
    else if (fluxo <= limites.medio_fluxo && fluxo > limites.baixo_fluxo) {
        classe_fluxo = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(fluxo, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.baixo_fluxo) {
        classe_fluxo = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(fluxo, idLocal, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (idLocal == 1) {
        temp_aquario_1.innerHTML = temp + "°C";
        card = card_1
    } else if (idLocal == 2) {
        temp_aquario_2.innerHTML = temp + "°C";
        card = card_2
    } else if (idLocal == 3) {
        temp_aquario_3.innerHTML = temp + "°C";
        card = card_3
    } else if (idLocal == 4) {
        temp_aquario_4.innerHTML = temp + "°C";
        card = card_4
    }

    card.className = classe_fluxo;
}

function exibirAlerta(fluxo, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idLocal == idLocal);

    if (indice >= 0) {
        alertas[indice] = { idLocal, fluxo, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idLocal, fluxo, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idLocal) {
    alertas = alertas.filter(item => item.idLocal != idLocal);
    exibirCards();
}
 
function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idLocal, fluxo, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${idLocal} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${fluxo}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
