lista_missoes = {
    descreveMissao: function (id) {
        let m=missoes.dados[id];
        vex.defaultOptions.overlayClosesOnClick = true;
        vex.dialog.alert({ unsafeMessage: 
            '<h4>'+m.titulo+'!</h4>\n\
            <img class="img-responsive" src="./img/undraw_friendship_mni7.svg" />\n\
            <p>'+m.descricao+'</p>\n\
            <small>Complete essa missão e ganhe '+m.pontos+' pontos!</small>'
        })
    },
}