lista_missoes = {
    descreveMissao: function (id) {
        let m = missoes.dados[id];
        vex.defaultOptions.overlayClosesOnClick = true;
        vex.dialog.alert({
            unsafeMessage:
                '<h4>' + m.titulo + '!</h4>\n\
            <img class="img-responsive" src="./img/undraw_friendship_mni7.svg" />\n\
            <p>'+ m.descricao + '</p>\n\
            <small>Complete essa missão e ganhe '+ m.pontos + ' pontos!</small>'
        });
    },
    quiz: function () {
        var perguntas = {
            1: {
                pergunta: "O que é a sustentabilidade?",
                correta: "Ações e atividades humanas que visam suprir as necessidades atuais da sociedade, sem comprometer o futuro das próximas gerações.",
                errada: ["Tudo aquilo que sustenta o cotidiano socioeconômico de um país",
                    "Ações que levam ao crescimento e desenvolvimento da comunidade sem elevado custo financeiro para a sociedade",
                    "Quando se pode usar regular um recurso natural para o crescimento de uma empresa ou indústria."],
                id: 1
            },
            2: {
                pergunta: "Você sabe qual lâmpada gera menos impacto no meio ambiente?",
                correta: "Lâmpadas de LED",
                errada: ["Lâmpadas Incandescentes",
                    "Lâmpadas Fluorescentes compactas",
                    "Lâmpadas de Halogéneo"],
                id: 2
            },
            3: {
                pergunta: "Qual cor e a finalidade das lixeiras estão corretas?",
                correta: "Roxo- Resíduo Radioativo",
                errada: ["Branco- Resíduos Orgânicos",
                    "Laranja- Madeira",
                    "Vermelho- Papel e Papelão"],
                id: 3
            },
            4: {
                pergunta: "O que você poderia fazer para ser mais sustentável?",
                correta: "Repensar seus consumos",
                errada: ["Descartando o lixo de maneira mais rápida, tudo junto",
                    "Não se preocupar com a reciclagem",
                    "Continuar consumindo como fez até hoje."],
                id: 4
            },
            5: {
                pergunta: "Pra você oque é lixo ?",
                correta: "Lixo é um ciclo, que tem destino certo para reciclagem, se possível.",
                errada: ["Lixo é inutilidades que devem ser jogadas no lixão desordenadamente.",
                    "Qualquer coisa que eu não goste",
                    "Aquilo que se joga na lixeira."],
                id: 5
            },
            6: {
                pergunta: "O que provavelmente acontecera daqui a alguns anos se continuar o desmatamento e a contrução de novas industrias ?",
                correta: "O mundo vai está destruído ecológicamente, pois, não vai existir natureza.",
                errada: ["Nós vamos ter mais roupas, mais comidas e mais brinquedos.",
                    "Nada vai mudar",
                    "O mundo vai ficar mais bonito."],
                id: 6
            },
        }
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        let numero = getRndInteger(1, 7);
        console.log(numero);
        let opcoes = perguntas[numero].errada;
        let ordem = getRndInteger(0, 3);
        let opcoesTratadas = '';

        for (let index = 0; index < opcoes.length; index++) {
            if (ordem === index) {
                opcoesTratadas += '<input class="button-option" onclick="lista_missoes.quizResposta(true)" type="button" value="' + perguntas[numero].correta + '" required />';
            }
            opcoesTratadas += '<input class="button-option" type="button" onclick="lista_missoes.quizResposta(false)" value="' + opcoes[index] + '" required />';
        }


        vex.defaultOptions.overlayClosesOnClick = false;
        vex.defaultOptions.escapeButtonCloses = false;
        vex.dialog.open({
            message: perguntas[numero].pergunta,
            input: [opcoesTratadas].join(''),
            buttons: [

            ],
            beforeClose: function () {

            }
        });
    },
    quizResposta: function (resposta) {
        vex.closeAll();
        if (resposta) {
            usuario.dados.pontos += 50;
            vex.dialog.alert({
                unsafeMessage:
                    '<h5 class="center">Resposta Correta!</h5>\n\
                <img class="img-responsive" src="./img/undraw_friendship_mni7.svg" />\n\
                <p>Você respondeu corretamente a questão! Ganhou 50 pontos!</p>'
            });
            new Noty({
                theme: 'mint',
                timeout: 5000,
                progressBar: true,
                text: 'Você ganhou 50 pontos!',
                type: 'info'
            }).show();

        } else {
            vex.dialog.alert({
                unsafeMessage:
                    '<h4>Resposta Incorreta!</h4>\n\
                <p>Você respondeu errado a questão! Tente novamente amanhã.</p>'
            });
        }
        usuario.dados.quizDiario = new Date().getTime();
        usuario.salvar(usuario.dados);
        calendario.carregaMissoes();
    }

}