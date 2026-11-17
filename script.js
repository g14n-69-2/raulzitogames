let saldo = 100;
let cartaAtualValor = Math.floor(Math.random() * 13) + 1; // 1 a 13

const nomesCartas = {
    1: 'Ás (1)', 
    11: 'Valete (11)', 
    12: 'Dama (12)', 
    13: 'Rei (13)'
};

function obterNomeCarta(valor) {
    return nomesCartas[valor] || valor.toString();
}

document.getElementById("carta_atual").innerText = `CARTA ATUAL: [ ${obterNomeCarta(cartaAtualValor)} ]`;

function jogar(escolha) {
    let apostaInput = document.getElementById("aposta");
    let aposta = parseInt(apostaInput.value);

    if (isNaN(aposta) || aposta <= 0) {
        document.getElementById("mensagem").innerText = "[ERRO] Valor de aposta inválido.";
        return;
    }

    if (aposta > saldo) {
        document.getElementById("mensagem").innerText = "[ERRO] Saldo insuficiente.";
        return;
    }

    saldo -= aposta;
    document.getElementById("saldo").innerText = saldo;

    let novaCartaValor = Math.floor(Math.random() * 13) + 1;
    let nomeNovaCarta = obterNomeCarta(novaCartaValor);

    let resultadoMsg = "";
    let ganhou = false;

    if (novaCartaValor === cartaAtualValor) {
        saldo += aposta;
        resultadoMsg = `Empate! A carta sorteada foi igual (${nomeNovaCarta}). Aposta devolvida.`;
    } else if (escolha === 'maior' && novaCartaValor > cartaAtualValor) {
        ganhou = true;
    } else if (escolha === 'menor' && novaCartaValor < cartaAtualValor) {
        ganhou = true;
    }

    if (novaCartaValor !== cartaAtualValor) {
        if (ganhou) {
            let premio = aposta * 2;
            saldo += premio;
            resultadoMsg = `[VITÓRIA] Nova carta: ${nomeNovaCarta}. Você ganhou +$${aposta} de lucro!`;
        } else {
            resultadoMsg = `[DERROTA] Nova carta: ${nomeNovaCarta}. Você perdeu -$${aposta}.`;
        }
    }

    document.getElementById("saldo").innerText = saldo;
    document.getElementById("mensagem").innerText = resultadoMsg;
    
    cartaAtualValor = novaCartaValor;
    document.getElementById("carta_atual").innerText = `CARTA ATUAL: [ ${obterNomeCarta(cartaAtualValor)} ]`;

    if (saldo <= 0) {
        document.getElementById("mensagem").innerText += " [FALIDO] Saldo zerado. Você perdeu tudo.";
    }
}

function resetar() {
    saldo = 100;
    cartaAtualValor = Math.floor(Math.random() * 13) + 1;
    document.getElementById("saldo").innerText = saldo;
    document.getElementById("carta_atual").innerText = `CARTA ATUAL: [ ${obterNomeCarta(cartaAtualValor)} ]`;
    document.getElementById("mensagem").innerText = "Sistema resetado. Faça sua aposta.";
}