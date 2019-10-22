$(".calendar-container__btn--right").click(function () {
  calendario.mesPosterior();
});
$(".calendar-container__btn--left").click(function () {
  calendario.mesAnterior();
});

calendario.carregaCalendario();