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
        })
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
                correta: "Lâmpadas de LED (Diodos emissores de luz)",
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
                pergunta: "Oque provavelmente acontecera daqui a alguns anos se continuar o desmatamento e a contrução de novas industrias ?",
                correta: "O mundo vai está destruído ecológicamente, pois, não vai existir natureza.",
                errada: ["Nós vamos ter mais roupas, mais comidas e mais brinquedos.",
                 "Nada vai mudar", 
                 "O mundo vai ficar mais bonito."],
                id: 6
            },
        }


        let vex_login = vex.dialog.open({
            message: 'Vamos Começar o quiz',
            input: [
            ].join(''),
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, { text: 'Entrar' }),
                $.extend({}, vex.dialog.buttons.YES, { text: 'Entrar' }),
                $.extend({}, vex.dialog.buttons.YES, { text: 'Entrar' }),
                $.extend({}, vex.dialog.buttons.YES, { text: 'Entrar' }),
            ],
            beforeClose: function () {

            }
        });
    }
}