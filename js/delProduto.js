/*global ajax*/
/*global criaSelect*/
/*global formSubmit*/
/*global confirma*/
formSubmit("excluir", "POST", "./sys/delProduto.php");
criaSelect("produtos", "./sys/include/select.php", "id_produto", "nome_produto");
function trataDados(resposta) {
    'use strict';
    if (resposta.excluir.valor) {
        confirma(1, "./delProduto.html", "Produto Excluído com Sucesso!", "", "");
    } else {
        confirma(0, "", "", "", "Ocorreu uma Falha no Servidor!");
    }
}
