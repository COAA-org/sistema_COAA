
function maiorHoraPico(){
fetch(`/dash/picoMaior`).then((resposta)=>{
    if(resposta.ok){
        resposta.json().then((resposta)=>{
            console.log(`KPI.JS executando`)
            resposta.reverse();
            h4_maiorPico.innerHTML = resposta[0].hora;
        })
    }


})
}