/*global EventSource*/
/*global criaTabela*/
//ARQUIVO PARA CRIAR O EVENTSOURCE PARA QUE O SERVIDOR FIQUE ENVIANDO OS DADOS
var evento = new EventSource("./sys/evento.php"), tamanho;
evento.onmessage = function (e) {
    'use strict';
    var obj = JSON.parse(e.data);
        //document.getElementById("result").innerHTML = obj.produtos[0].nome_produto;
   /* if (document.getElementsByTagName("table").length) {
        document.getElementsByTagName("table")[0].parentNode.removeChild(document.getElementsByTagName("table")[0]);
    }
    criaTabela(obj);*/
};
