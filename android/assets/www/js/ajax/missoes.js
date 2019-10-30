missoes = {
  dados: null,
  ajax: function (retorno) {
    //LOGICA AQUI
    if (app.offlineMode === true) {
      let rtn = {
        1: {
          id:1,
          inicio: '1573638154',
          fim: '1573864954',
          titulo: 'Leve embalagem de óleo para Descarte na escola',
          descricao: 'Leve a embalagem de óleo para escola para realizar o descarte correto.',
          pontos: 250
        },
        2: {
          id:2,
          inicio: '1574210554',
          fim: '1574210554',
          titulo: 'Plante uma Árvore!',
          descricao: 'A plantas são nossas amigas! Plante uma árvore e crie uma amizade.',
          pontos: 300
        },
        3: {
          id:3,
          inicio: '1574674954',
          fim: '1574847754',
          titulo: 'Leve Pilhas para escola',
          descricao: 'Pilhas causam grande poluição na natureza, leve para descarte adequado na escola!',
          pontos: 250
        },
        4: {
          id:4,
          inicio: '1572169354',
          fim: '1572169354',
          titulo: 'Missao de teste',
          descricao: 'A ideia se baseia em cards que são missões e geram pontos!',
          pontos: 100
        },
        5: {
          id:5,
          inicio: '1575106954',
          fim: '1575366154',
          titulo: 'Inventar brinquedo',
          descricao: 'Crie um briquedo com embalagem usadas (com ajuda de um adulto) e leve para escola!',
          pontos: 400
        },
        6: {
          id:6,
          inicio: '1575625354',
          fim: '1575625354',
          titulo: 'Separou o lixo hoje?',
          descricao: 'Reciclar uma tonelada de papel evita a morte de 40 árvores adultas. Você já separou seu lixo hoje?',
          pontos: 100
        },
        7: {
          id:7,
          inicio: '1575884554',
          fim: '1575884554',
          titulo: 'Hora do banho!',
          descricao: 'Um banho de 15 minutos, com o registro meio aberto, consome 135 litros de água. Vamos economizar?',
          pontos: 100
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