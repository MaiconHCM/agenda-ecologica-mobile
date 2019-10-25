$(".calendar-container__btn--right").click(function () {
  calendario.mesPosterior();
});
$(".calendar-container__btn--left").click(function () {
  calendario.mesAnterior();
});

calendario.carregaCalendario();

vex.defaultOptions.overlayClosesOnClick = false;

vex.dialog.open({
  message: 'Vamos Começar 😀',
  input: [
    '<input id="login-username" name="username" type="text" placeholder="Seu Apelido" required />',
    '<input id="login-password" name="password" type="password" placeholder="Sua Senha" required />'
  ].join(''),
  buttons: [
    $.extend({}, vex.dialog.buttons.YES, { text: 'Entrar' })
  ],
  callback: function (value) {
    console.log(value)
  },
  onSubmit: function (event) {
    alert('teste');
    usuario.login($('#login-username').val(), $('#login-password').val(), function (retorno) {

    });
    return false;
  },
  beforeClose: function () {


  }
})
