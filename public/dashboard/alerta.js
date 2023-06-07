var alertas = [];
window.onload = obterdados(1),atualizacaoPeriodica();
function obterdados(idSensor) {
    fetch(`/medidas/getDados/${idSensor}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, 1);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}
var fluxo;
var card;
function alertar(resposta, idSensor) {
    fluxo = resposta[0].Fluxo;

    console.log(idSensor === resposta[0].fkSensor)
    
    var grauDeAviso ='';


    var limites = {
        alto_fluxo: 100,
        ideal_fluxo: 50,
        medio_fluxo: 40,
        baixo_fluxo: 10
    };

    var classe_fluxo = 'cor-alerta';

    if (fluxo >= limites.alto_fluxo) {
        classe_fluxo = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo superlotação'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(fluxo, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (fluxo < limites.alto_fluxo && fluxo >= limites.ideal_fluxo) {
        classe_fluxo = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta alto fluxo'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(fluxo, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (fluxo < limites.alto_fluxo && fluxo > limites.medio_fluxo) {
        classe_fluxo = 'cor-alerta ideal';
        removerAlerta(idSensor);
    }
    else if (fluxo <= limites.medio_fluxo && fluxo > limites.baixo_fluxo) {
        classe_fluxo = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta baixo fluxo'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(fluxo, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (fluxo <= limites.baixo_fluxo) {
        classe_fluxo = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo baixo fluxo'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(fluxo, idSensor, grauDeAviso, grauDeAvisoCor)
    }

    

    // if (idSensor == 1) {
    //     alerta.innerHTML = fluxo + "Passagens";
    //     card = card_1
    // }
    // } else if (idLocal == 2) {
    //     temp_aquario_2.innerHTML = temp + "°C";
    //     card = card_2
    // } else if (idLocal == 3) {
    //     temp_aquario_3.innerHTML = temp + "°C";
    //     card = card_3
    // } else if (idLocal == 4) {
    //     temp_aquario_4.innerHTML = temp + "°C";
    //     card = card_4
    // }

    card.className = classe_fluxo;
}

function exibirAlerta(fluxo, idSensor, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);

    if (indice >= 0) {
        alertas[indice] = { idSensor, fluxo, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idSensor, fluxo, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idSensor) {
    alertas = alertas.filter(item => item.idSensor != idSensor);
    exibirCards();
}
 
function exibirCards() {
    caixa_alertas.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        caixa_alertas.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idSensor, fluxo, grauDeAviso, grauDeAvisoCor }) {
    
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
    <div class="alarme-sino"><img src="https://3.bp.blogspot.com/-L-2pZJfZceY/VzUSHQMU-tI/AAAAAAAAUlg/B2lXYsXhPskIBCZLTb5z0lSlLgjg2LKowCLcB/s1600/Gifs%2Banimados%2BSino%2B2.gif" style="width: 60px; height: 60px;"></div>
     <span style="font-size: 85%;">Fluxo Atual: ${fluxo}<br>
     O local está em estado de ${grauDeAviso}!</span> 
    </div>
    </div>`;
}

function atualizacaoPeriodica() {
    
    obterdados(1);
    setTimeout(atualizacaoPeriodica, 12000);
}
