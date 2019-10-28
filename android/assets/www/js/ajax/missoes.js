missoes = {
  dados: null,
  ajax: function (retorno) {
    //LOGICA AQUI
    if (app.offlineMode === true) {
      let rtn = {
        1: {
          id:1,
          inicio: '1571673038',
          fim: '1572018638',
          titulo: 'Levar Embalagem de Oléo para Descarte na escola',
          descricao: 'Missao, leve o lixo para sala 01',
          pontos: 250
        },
        2: {
          id:2,
          inicio: '1572364238',
          fim: '1572364238',
          titulo: 'Plante uma Árvore!',
          descricao: 'Missao,sasasaxo para sala 01',
          pontos: 300
        },
        3: {
          id:3,
          inicio: '1572564238',
          fim: '1572664238',
          titulo: 'Doação de comida',
          descricao: 'Doe comida',
          pontos: 350
        }
      };
      return retorno(rtn);
    }


    if (missoes.dados) {
      return retorno(missoes.dados)
    }
    $.get(app.url + "missao", function (data) {
      return retorno(data);
    });
  },
  listaMissoes: function (mes, retorno) {
    this.ajax(function (data) {
      let rtn = {};
      missoes.salvar(data);
      missoes.dados = data;
      for (var prop in data) {
        let dt = new Date(data[prop].inicio * 1000);
        if (dt.getMonth() === mes.getMonth()) {
          if (dt.getFullYear() === mes.getFullYear()) {
            rtn[prop] = data[prop];
          }
        }
      }
      console.log('recuperado missoes da internet');
      return retorno(rtn);
    });
  },
  salvar: function (dados) {
    localStorage.setItem('dados', JSON.stringify(dados));
  },
  recuperar: function () {
    if (localStorage.getItem('dados')) {
      let retrievedObject = JSON.parse(localStorage.getItem('dados'));
      this.dados = retrievedObject;
    }
  }

}