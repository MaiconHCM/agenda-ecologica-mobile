var calendario = {
  data: {
    anos: {}
  },
  mesSelecionado: null,
  anoSelecionado: null,
  carregaCalendario: function () {
    console.log('Carrega Calendário');
    let dt, dt1, a;
    dt = new Date();
    dt.setMonth(dt.getMonth() - 1);
    dt1 = new Date();
    for (let index = 0; index < 3; index++) {
      dt.setMonth(dt.getMonth() + 1);
      a = calendario.diasNoMes(dt.getMonth(), dt.getFullYear());
      calendario.carregaMes(a);
    }
    calendario.mesSelecionado = dt1.getMonth();
    calendario.anoSelecionado = dt1.getFullYear();
    calendario.carregaHtml(dt1.getMonth(), dt1.getFullYear());
  },
  diasNoMes: function (mes, ano) {
    return new Date(ano, mes, 0);
  },
  carregaMes: function (dt) {
    if (!this.mesExiste(dt.getMonth(), dt.getFullYear())) {
      console.log('carrega mês: ' + dt.getMonth());
      let mes = {};
      let dia = {};
      for (let index = 1; index <= dt.getDate(); index++) {
        let a = new Date(dt.getFullYear(), dt.getMonth(), index);
        dia[index] = {
          dia: index,
          diaSemana: a.getDay(),
          evento: {}
        }
      }
      mes = {
        dias: dia,
        mes: dt.getMonth(),
        totalDias: dt.getDate()
      };
      return this.adicionaMes(mes, dt.getFullYear());
    }
  },
  adicionaMes: function (mes, ano) {
    aux = { meses: {} };
    if (calendario.data.anos[ano]) {
      aux = calendario.data.anos[ano];
    }
    aux['meses'][mes.mes] = mes;
    calendario.data.anos[ano] = aux;
    console.log(calendario.data);
  },
  mesExiste: function (mes, ano) {
    if (!calendario.data.anos[ano]) {
      return false;
    } else if (!calendario.data.anos[ano].meses[mes]) {
      return false;
    }
    return true;
  },
  mesParaTexto: function (mes) {
    let nomeMes;
    switch (mes) {
      case 0:
        nomeMes = "Janeiro";
        break;
      case 1:
        nomeMes = "Fevereiro";
        break;
      case 2:
        nomeMes = "Março";
        break;
      case 3:
        nomeMes = "Abril";
        break;
      case 4:
        nomeMes = "Maio";
        break;
      case 5:
        nomeMes = "Junho";
        break;
      case 6:
        nomeMes = "Julho";
        break;
      case 7:
        nomeMes = "Agosto";
        break;
      case 8:
        nomeMes = "Setembro";
        break;
      case 9:
        nomeMes = "Outubro";
        break;
      case 10:
        nomeMes = "Novembro";
        break;
      case 11:
        nomeMes = "Dezembro";
        break;
    }
    return nomeMes;
  },
  carregaHtml: function (mes, ano) {
    let mesAtual = calendario.data.anos[ano].meses[mes].dias;
    let mesAnterior;
    if ((mes - 1) < 0)
      mesAnterior = calendario.data.anos[ano - 1].meses[11];
    else
      mesAnterior = calendario.data.anos[ano].meses[mes - 1];

    let mesPosterior;
    if ((mes + 1) > 11)
      mesPosterior = calendario.data.anos[ano + 1].meses[0];
    else
      mesPosterior = calendario.data.anos[ano].meses[mes + 1];


    let ultimoDia = calendario.data.anos[ano].meses[mes].totalDias;

    let semanaInicio = mesAtual[1].diaSemana;
    let semanaFinal = mesAtual[ultimoDia].diaSemana;

    $('.calendar-container__title').text(calendario.mesParaTexto(mes));
    let append = '<div class="calendar-table__row">';


    for (let index = semanaInicio - 1; index >= 0; index--) {
      append += '\n\
      <div id="'+ mesAnterior.mes + '_' + (mesAnterior.totalDias - index) + '" class="calendar-table__col calendar-table__inactive">\n\
        <div class="calendar-table__item">\n\
          <span>'+ (mesAnterior.totalDias - index) + '</span>\n\
        </div>\n\
      </div>';
    }


    for (let prop in mesAtual) {
      append += '\n\
      <div id="'+ mes + '_' + mesAtual[prop].dia + '" class="calendar-table__col">\n\
        <div class="calendar-table__item">\n\
          <span>'+ mesAtual[prop].dia + '</span>\n\
        </div>\n\
      </div>';
      if (((mesAtual[prop].diaSemana + 1) % 7) === 0) {
        append += '</div>';
        if (mesAtual[prop] !== ultimoDia)
          append += '<div class="calendar-table__row">';

      }
    }
    for (let index = 0; index < (6 - semanaFinal); index++) {
      append += '\n\
      <div id="'+ mesPosterior.mes + '_' + (mesPosterior.dias[1 + index].dia) + '" class="calendar-table__col calendar-table__inactive">\n\
        <div class="calendar-table__item">\n\
          <span>'+ (mesPosterior.dias[1 + index].dia) + '</span>\n\
        </div>\n\
      </div>';
    }
    $('.calendar-table__body').html(append);
    this.mesSelecionado = mes;
    this.anoSelecionado = ano;
    this.carregaMissoes();
  },
  mesPosterior: function () {
    let mes = this.mesSelecionado + 1;
    let ano = this.anoSelecionado;
    if (mes > 11) {
      mes = 0;
      ano++;
    }

    let dt = new Date(ano, mes);
    dt.setMonth(dt.getMonth() + 2);
    let a = calendario.diasNoMes(dt.getMonth(), dt.getFullYear());
    calendario.carregaMes(a);

    this.carregaHtml(mes, ano)
  },
  mesAnterior: function () {
    let mes = this.mesSelecionado - 1;
    let ano = this.anoSelecionado;
    if (mes < 0) {
      mes = 11;
      ano--;
    }

    let dt = new Date(ano, mes);
    dt.setMonth(dt.getMonth());
    let a = calendario.diasNoMes(dt.getMonth(), dt.getFullYear());
    calendario.carregaMes(a);
    this.carregaHtml(mes, ano)
  },
  carregaMissoes: function () {
    let hoje = new Date();
    $('#' + hoje.getMonth() + '_' + hoje.getDate()).addClass('calendar-table__today');
    let missoes = {
      0: {
        inicio: '1571673038',
        fim: '1572018638',
        titulo: 'Levar Embalagem de Oléo para Descarte na escola',
        descricao: 'Missao, leve o lixo para sala 01',
        pontos:250
      },
      1: {
        inicio: '1572364238',
        fim: '1572364238',
        titulo: 'Plante uma Árvore!',
        descricao: 'Missao,sasasaxo para sala 01',
        pontos:300
      },
      2: {
        inicio: '1572564238',
        fim: '1572664238',
        titulo: 'Doação de comida',
        descricao: 'Doe comida',
        pontos:350
      }
    }
    let apppendMissoes='<li class="events__item">\n\
    <div class="events__item--left">\n\
      <span class="events__name">Responda perguntas sobre ecologia!</span>\n\
      <span class="events__date">Hoje</span>\n\
    </div>\n\
    <span class="events__tag events__tag--highlighted">100 Pontos</span>\n\
  </li>';
    for (let prop in missoes) {
      let inicio = new Date(missoes[prop].inicio * 1000);
      let fim = new Date(missoes[prop].fim * 1000);
      if ((inicio.getDate() === fim.getDate()) &&
        (inicio.getMonth() === fim.getMonth())) {
        $('#' + inicio.getMonth() + '_' + inicio.getDate()).addClass('calendar-table__event');
        apppendMissoes+='<li class="events__item">\n\
        <div class="events__item--left">\n\
          <span class="events__name">'+missoes[prop].titulo+'</span>\n\
          <span class="events__date">'+inicio.getDate()+' de '+ this.mesParaTexto(inicio.getMonth()) +'</span>\n\
        </div>\n\
        <span class="events__tag">'+missoes[prop].pontos+' Pontos</span>\n\
      </li>';
      } else {
        $('#' + inicio.getMonth() + '_' + inicio.getDate()).addClass('calendar-table__event calendar-table__event--long calendar-table__event--start');

        let diffTime = Math.abs(inicio - fim);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let dia = new Date(inicio);
        dia.setDate(dia.getDate() + 1);
        $('#' + inicio.getMonth() + '_' + inicio.getDate()).addClass('calendar-table__event calendar-table__event--long calendar-table__event--start');
        for (let index = 0; index < diffDays - 1; index++) {
          $('#' + dia.getMonth() + '_' + dia.getDate()).addClass('calendar-table__event calendar-table__event--long');
          dia.setDate(dia.getDate() + 1);
        }
        $('#' + fim.getMonth() + '_' + fim.getDate()).addClass('calendar-table__event calendar-table__event--long calendar-table__event--end');
      
        apppendMissoes+='<li class="events__item">\n\
        <div class="events__item--left">\n\
          <span class="events__name">'+missoes[prop].titulo+'</span>\n\
          <span class="events__date">'+inicio.getDate()+' de '+ this.mesParaTexto(inicio.getMonth())+' - '+fim.getDate()+' de '+ this.mesParaTexto(fim.getMonth())+'</span>\n\
        </div>\n\
        <span class="events__tag">'+missoes[prop].pontos+' pontos</span>\n\
        </li>';
      }
    }
    $('.events__list').html(apppendMissoes);

  }

}

$(".calendar-container__btn--right").click(function () {
  calendario.mesPosterior();
});
$(".calendar-container__btn--left").click(function () {
  calendario.mesAnterior();
});

calendario.carregaCalendario();

