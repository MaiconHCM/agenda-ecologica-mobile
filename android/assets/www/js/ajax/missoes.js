missoes = {
  dt: null,
  ajax: function (mes, retorno) {
    //LOGICA AQUI
    if (missoes.dt) {
      let rtn = {};
      let data=missoes.dt;
      for (var prop in data) {
        let dt = new Date(data[prop].inicio * 1000);
        if (dt.getMonth() === mes.getMonth()) {
          if (dt.getFullYear() === mes.getFullYear()) {
            rtn[prop] = data[prop];
          }
        }
      }
      console.log('recuperado missoes do cache');
      retorno(rtn);
    } else {
      $.get(app.url + "missao", function (data) {
        let  rtn = {};
        missoes.dt = data;
        for (var prop in data) {
          let dt = new Date(data[prop].inicio * 1000);
          if (dt.getMonth() === mes.getMonth()) {
            if (dt.getFullYear() === mes.getFullYear()) {
              rtn[prop] = data[prop];
            }
          }
        }
        console.log('recuperado missoes da internet');
        retorno(rtn);
        
      });
    }
    /*
        return retorno({
          0: {
            inicio: '1571673038',
            fim: '1572018638',
            titulo: 'Levar Embalagem de Oléo para Descarte na escola',
            descricao: 'Missao, leve o lixo para sala 01',
            pontos: 250
          },
          1: {
            inicio: '1572364238',
            fim: '1572364238',
            titulo: 'Plante uma Árvore!',
            descricao: 'Missao,sasasaxo para sala 01',
            pontos: 300
          },
          2: {
            inicio: '1572564238',
            fim: '1572664238',
            titulo: 'Doação de comida',
            descricao: 'Doe comida',
            pontos: 350
          }
        });*/
  }

}