app = {
  url: "http://localhost:1337/",
  offlineMode:true,
  inicia: function () {
    console.log('iniciando app');
    missoes.dados=null;
    usuario.recuperar();
    this.verificaLogin();
  },
  verificaLogin: function () {
    console.log('verifica Login');
    if (usuario.longado) {
      this.carregaCalendario();
    } else {
      this.login();
    }
  },

  login: function () {
    console.log('abrindo tela de login');
    vex.defaultOptions.overlayClosesOnClick = false;
    let vex_login = vex.dialog.open({
      message: 'Vamos Começar 😀',
      input: [
        '<img class="img-responsive" src="./img/undraw_my_password_d6kg.svg" />',
        '<input id="login-username" name="username" type="text" placeholder="Seu Apelido" required />',
        '<input id="login-password" name="password" type="password" placeholder="Sua Senha" required />',
      ].join(''),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: 'Entrar' })
      ],
      beforeClose: function () {
        if (usuario.longado)
          return true;

        usuario.login($('#login-username').val(), $('#login-password').val(), function (retorno) {
          if (retorno === true) {
            console.log('longado com sucesso');
            app.carregaCalendario();
            vex.close(vex_login);
            
            new Noty({
              theme: 'mint',
              timeout: 2500,
              progressBar: true,
              text: 'Conectado com sucesso!',
              type: 'success'
            }).show();

          } else {
            //Adicionar algo
            new Noty({
              theme: 'mint',
              timeout: 2500,
              progressBar: true,
              text: 'Usuario ou senha Incorreto',
              type: 'error'
            }).show();
          }
        });



        return false;
      }
    });
  },

  carregaCalendario: function () {
    calendario.carregaCalendario();
  },

}
app.inicia();
$(".calendar-container__btn--right").click(function () {
  calendario.mesPosterior();
  cordova.plugins.notification.local.getDefaults();
  cordova.plugins.notification.local.schedule({
    title: 'My first notification',
    text: 'Thats pretty easy...',
    foreground: true
});
});
$(".calendar-container__btn--left").click(function () {
  calendario.mesAnterior();
});