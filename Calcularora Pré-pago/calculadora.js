const planoAtualSelec = document.querySelector('select#planoatual')
const quantidadeDeDiasDeUsoSelect = document.querySelector('select#diasdeuso')
const planoDesejadoSelect = document.querySelector('select#planodesejado')

function validacao() {
    if (!planoAtualSelec.value) {
        alert('Preencha o campo PLANO ATUAL')
        return false
    }
    if (!quantidadeDeDiasDeUsoSelect.value) {
        alert('Preencha a quantidade de DIAS UTILIZADOS NO PLANO ATUAL')
        return false
    }
    if (!planoDesejadoSelect.value) {
        alert('Preencha o campo PLANO DESEJADO')
        return false
    }
    if(planoAtualSelec.value == planoDesejadoSelect.value){
        alert('O PLANO ATUAL não pode ser igual ao PLANO DESEJADO')
        return false
    }
    return true
}

//####prate 1
let resDoUsoDiarioPlanoAtual = document.querySelector('#visualizarValorPlanoAtual')// valor do uso diario
let totDiasMes = 30//quantidades de dias do mes

//####parte 2
let resDosDiasUtilizados = document.querySelector('span#visualizarValorDiasUtilizados')// valor exibido 8
let diasRestantes = document.querySelector('span#visualizarDiasQueRestam')

//###parte 3   
let resDoUsoDiarioPlanoDesejado = document.querySelector('span#visualizarValorPlanoDesejado')

//###texto que aparece
//####//Calculando o valor do uso diario do plano desejado, com os dias restantes do plano atual
let visualizarCalcultoTotal = document.querySelector('#visualizarCalculoTotal')
let visualizarTotalBoleto = document.querySelector('#visualizarTotalBoleto')
let visualizarDiferençaBoleto = document.querySelector('#visualizarDiferençaBoleto')

    function calculo() {
        //resDoUsoDiarioPlanoAtual: guardando o valor do calculo e depois ta exibindo na tela #### valor do uso diario
        resDoUsoDiarioPlanoAtual.value = parseFloat(planoAtualSelec.value / totDiasMes).toFixed(2)
        resDoUsoDiarioPlanoAtual.innerHTML = `<abbr title=" ${planoAtualSelec.value} / ${totDiasMes} = ${resDoUsoDiarioPlanoAtual.value}">   $${resDoUsoDiarioPlanoAtual.value}`//exibindo valor na tela

        //valor esta sendo calculado e guardado depois exibido #####Valor dos dias utilizados:
        resDosDiasUtilizados.value = parseFloat(quantidadeDeDiasDeUsoSelect.value * resDoUsoDiarioPlanoAtual.value).toFixed(2)
        resDosDiasUtilizados.innerHTML = `<abbr title="${quantidadeDeDiasDeUsoSelect.value} X ${resDoUsoDiarioPlanoAtual.value} = ${resDosDiasUtilizados.value}">  $${resDosDiasUtilizados.value}`//dias usados com valor da diaria do atual

        //parte 2.1 ## calculo dias restantes
        diasRestantes.value = totDiasMes - quantidadeDeDiasDeUsoSelect.value
        diasRestantes.innerHTML = ` <abbr title="${totDiasMes} - ${quantidadeDeDiasDeUsoSelect.value} = ${diasRestantes.value} "> ${diasRestantes.value}`

        resDoUsoDiarioPlanoDesejado.value = parseFloat(planoDesejadoSelect.value / totDiasMes).toFixed(2)
        resDoUsoDiarioPlanoDesejado.innerHTML = `<abbr title="${planoDesejadoSelect.value} / ${totDiasMes} = ${resDoUsoDiarioPlanoDesejado.value}">   $${resDoUsoDiarioPlanoDesejado.value}`

        //###########CALCULO###############
        let valorTot = (diasRestantes.value * resDoUsoDiarioPlanoDesejado.value).toFixed(2)//calculo

        visualizarCalcultoTotal.innerHTML = `Valor total da Quantidade de dias, Multiplicado pelo valor  diário do plano desejado <strong>${diasRestantes.value} X $${resDoUsoDiarioPlanoDesejado.value} = 
            <u>$${valorTot}</u></strong>.`

        //depois que coloquei .toFixed(2), ele virou string, usa o Number para fica numero
        let totBoleto = Number(valorTot) + Number(resDosDiasUtilizados.value)
        visualizarTotalBoleto.innerHTML = `Valor Total do Boleto: <strong>${resDosDiasUtilizados.value} + ${valorTot} =  <u>$${totBoleto.toFixed(2)}</u></strong>.`

        //quando o plano atual e menor que o plano desejado
        let totdiferenca = (totBoleto - planoAtualSelec.value).toFixed(2)
            if (Number(planoAtualSelec.value) <= Number(planoDesejadoSelect.value)) {
                visualizarDiferençaBoleto.innerHTML = `<strong>Acrescentar</strong> o valor <strong><u> <abbr title="${totBoleto} - ${planoAtualSelec.value}"> $${totdiferenca}</u></strong>, no proximo vencimento do Boleto.`
            } else {
                visualizarDiferençaBoleto.innerHTML = `<strong>Descontar</strong> o valor <strong><u><abbr title="${totBoleto} - ${planoAtualSelec.value}">$${totdiferenca}</u></strong>, no proximo vencimento do Boleto.`
            }
}
//Limpar todos os campos
function limpar() {
    //##limpar parte 1
    document.querySelector('select#planoatual').value = '';
    resDoUsoDiarioPlanoAtual.innerHTML ='';

    //##limpar parte 2
    document.querySelector('select#diasdeuso').value = '';
    resDosDiasUtilizados.innerHTML = '';
    diasRestantes.innerHTML = '';

    //##limpar parte 3
    document.querySelector('select#planodesejado').value = '';
    resDoUsoDiarioPlanoDesejado.innerHTML ='';
    visualizarCalcultoTotal.innerHTML = '';
    visualizarTotalBoleto.innerHTML = '';
    visualizarDiferençaBoleto.innerHTML = '';
}
