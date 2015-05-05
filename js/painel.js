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
    div.appendChild(tabela);
    tbody = document.createElement("TBODY");
    tabela.appendChild(tbody);
    for (i = 0; i < resposta.produtos.length; i++) {
        if (resposta.produtos[i].id_categoria === idCategoria.toString()) {
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
var evento = new EventSource("./sys/painel.php");
evento.onmessage = function (e) {
    'use strict';
    var i, resposta = JSON.parse(e.data);
    while (document.getElementById("geral").hasChildNodes()) {
        document.getElementById("geral").removeChild(document.getElementById("geral").firstChild);
    }
    for (i = 1; i < resposta.categorias.length; i++) {
        if (resposta.qtdCategorias[i].categoria !== "0") {
            criaBloco(resposta, i, resposta.categorias[i].nome_categoria.toLowerCase(), resposta.categorias[i].nome_categoria, i);
        }
    }
};
