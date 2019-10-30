usuario = {
    longado: false,
    usuarios: null,
    dados: {},
    ajax: function (retorno) {
        if (app.offlineMode === true) {
            return retorno(data = {
                1: {
                    nome: 'admin',
                    senha: 'admin',
                    pontos: 0,
                    quizDiario: null,
                    id: 1,
                },
            });
        };
        if (this.usuarios) {
            retorno(this.usuarios);
        } else {
            $.get(app.url + "usuario", function (data) {
                if (data) {
                    usuario.usuarios = data;
                    return retorno(data);
                }
            }).fail(function () {
                new Noty({
                    theme: 'mint',
                    timeout: 5000,
                    progressBar: true,
                    text: 'Sem conexão com servidor!',
                    type: 'error'
                }).show();
            });
        }
    },
    login: function (nome, senha, retorno) {
        this.ajax(function (data) {
            for (var prop in data) {
                if (nome.toUpperCase() === data[prop].nome.toUpperCase()) {
                    if (senha === data[prop].senha) {
                        usuario.salvar(data[prop]);
                        usuario.dados = data[prop];
                        usuario.longado = true;
                        break;
                    }
                }
            }
            retorno(usuario.longado);
        })
    },
    salvar: function (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    },
    recuperar: function () {
        if (localStorage.getItem('usuario')) {
            let retrievedObject = JSON.parse(localStorage.getItem('usuario'));
            usuario.dados = retrievedObject;
            usuario.longado = true;
        }
    },
    menuUsuario: function () {
        vex.dialog.alert({
            unsafeMessage:
                '<h4 class="center">' + usuario.dados.nome + '</h4>\n\
            <img class="img-responsive" src="./img/undraw_male_avatar_323b.svg" />\n\
            <p class="center">Você tem '+ usuario.dados.pontos + ' pontos!</p>\n\
            <input class="button-option" type="button" onclick="usuario.sair()" value="Sair da minha conta" required />'
        });


    },
    sair: function () {
        this.longado = false;
        this.usuarios = null;
        localStorage.removeItem('usuario');
        localStorage.removeItem('dados');
        vex.closeAll();
        app.inicia();
    }

}