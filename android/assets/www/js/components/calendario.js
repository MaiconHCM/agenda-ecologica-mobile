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
          missoes: {}
        }
      }
      mes = {
        dias: dia,
        mes: dt.getMonth(),
        totalDias: dt.getDate(),
        missoes: {}
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
    this.adicionaMissoes(mes.mes, ano);
    console.log(calendario.data);
    return true;
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
    switch (mes) {
      case 0: return "Janeiro";
      case 1: return "Fevereiro";
      case 2: return "Março";
      case 3: return "Abril";
      case 4: return "Maio";
      case 5: return "Junho";
      case 6: return "Julho";
      case 7: return "Agosto";
      case 8: return "Setembro";
      case 9: return "Outubro";
      case 10: return "Novembro";
      case 11: return "Dezembro";
    }
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

    $('.calendar-container__title').text(calendario.mesParaTexto(mes)+' '+ano);
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
      <div id="'+ mes + '_' + mesAtual[prop].dia + '" class="calendar-table__col day">\n\
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

  adicionaMissoes: function (mes, ano) {
    if (calendario.data.anos[ano].meses[mes].missoes) {
      missoes.ajax(mes, ano, function (retorno) {
        calendario.data.anos[ano].meses[mes].missoes = retorno;
      });
      console.log('Missao do mes ' + mes + ' carregada');
      return true;
    }
    return false;
  },

  carregaMissoes: function () {
    let hoje = new Date();
    $('#' + hoje.getMonth() + '_' + hoje.getDate()).addClass('calendar-table__today');
    let dt = new Date(this.anoSelecionado, this.mesSelecionado);
    $('.events__list').html('');
    dt.setMonth(dt.getMonth() - 1);

    for (let index = 0; index < 3; index++) {
      this.carregaHtmlMissoes(calendario.data.anos[dt.getFullYear()].meses[dt.getMonth()].missoes)
      dt.setMonth(dt.getMonth() + 1);
    }
    $('.calendar-table__event').click(function () {
      alert($(this).prop("id"));
    });
  },

  carregaHtmlMissoes: function (missoes) {
    let dt = new Date(this.anoSelecionado, this.mesSelecionado);
    let apppendMissoes = '';
    for (let prop in missoes) {
      let inicio = new Date(missoes[prop].inicio * 1000);
      let fim = new Date(missoes[prop].fim * 1000);

      if ((inicio.getDate() === fim.getDate()) &&
        (inicio.getMonth() === fim.getMonth()) &&
        (inicio.getFullYear()===fim.getFullYear())
        ) {
        $('#' + inicio.getMonth() + '_' + inicio.getDate()).addClass('calendar-table__event');

        if (inicio.getMonth() === dt.getMonth()) {
          apppendMissoes +=
            '<li class="events__item">\n\
            <div class="events__item--left">\n\
              <span class="events__name">'+ missoes[prop].titulo + '</span>\n\
              <span class="events__date">'+ inicio.getDate() + ' de ' + this.mesParaTexto(inicio.getMonth()) + '</span>\n\
            </div>\n\
            <span class="events__tag">'+ missoes[prop].pontos + ' Pontos</span>\n\
            </li>';
        }
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
        if ((inicio.getMonth() === dt.getMonth()) ||
          (fim.getMonth() === dt.getMonth())) {
          apppendMissoes +=
            '<li class="events__item">\n\
              <div class="events__item--left">\n\
                <span class="events__name">'+ missoes[prop].titulo + '</span>\n\
                <span class="events__date">'+ inicio.getDate() + ' de ' + this.mesParaTexto(inicio.getMonth()) + ' - ' + fim.getDate() + ' de ' + this.mesParaTexto(fim.getMonth()) + '</span>\n\
              </div>\n\
              <span class="events__tag">'+ missoes[prop].pontos + ' pontos</span>\n\
              </li>';
        }
      }
    }
    $('.events__list').append(apppendMissoes);
  },

}