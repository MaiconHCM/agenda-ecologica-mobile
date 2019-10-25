usuario = {
    login: function (usuario, senha, retorno) {

        if (usuario === 'admin') {
            if (senha === 'admin') {
                retorno(true);
            }
        }
        retorno(false);
    }

}