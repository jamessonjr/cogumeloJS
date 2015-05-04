/*global EventSource*/

function criaBloco(resposta, idDiv, idTitulo, titulo, idCategoria) {
    'use strict';
    var i, div, h1, tabela, tbody, tr, td;
    div = document.createElement("DIV");
    div.setAttribute("id", idDiv);
    document.getElementById("geral").appendChild(div);
    h1 = document.createElement("H1");
    h1.setAttribute("id", idTitulo);
    h1.appendChild(document.createTextNode(titulo));
    div.appendChild(h1);
    tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tabela");
    div.appendChild(tabela);
    tbody = document.createElement("TBODY");
    tabela.appendChild(tbody);
    for (i = 0; i < resposta.produtos.length; i++) {
        if (resposta.produtos[i].id_categoria === idCategoria) {
            tr = document.createElement("TR");
            tbody.appendChild(tr);
            td = document.createElement("TD");
            td.setAttribute("class", "nome_produto");
            td.appendChild(document.createTextNode(resposta.produtos[i].nome_produto));
            tr.appendChild(td);
            td = document.createElement("TD");
            td.setAttribute("class", "valor_produto");
            td.appendChild(document.createTextNode(resposta.produtos[i].valor_produto));
            tr.appendChild(td);
        }
    }
}

//CRIAÇÃO DO EVENTSOURCE PARA QUE O SERVIDOR FIQUE ENVIANDO OS DADOS
var tamanho, evento = new EventSource("./sys/evento.php"), tamanho;
evento.onmessage = function (e) {
    'use strict';
    var i, resposta = JSON.parse(e.data);
    if (tamanho !== resposta.produtos.length) {
        while (document.getElementById("geral").hasChildNodes()) {
            document.getElementById("geral").removeChild(document.getElementById("geral").firstChild);
        }
        criaBloco(resposta, "bebidas", "bebida", "BEBIDAS", "1");
        criaBloco(resposta, "salgados", "salgado", "SALGADOS", "2");
    }
    tamanho = resposta.produtos.length;
};
