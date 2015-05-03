/*global ajax*/
/*global criaSelect*/
/*global formSubmit*/
/*global confirma*/
formSubmit("excluir", "POST", "./sys/delCategoria.php");
criaSelect("categorias", "./sys/include/select.php", "id_categoria", "nome_categoria");
function trataDados(resposta) {
    'use strict';
    if (resposta.excluir.valor) {
        confirma(1, "./delCategoria.html", "Categoria Excluída com Sucesso!", "", "");
    } else {
        confirma(0, "", "", "", "Ocorreu uma Falha no Servidor!");
    }
}
