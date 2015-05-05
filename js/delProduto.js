/*global ajax*/
/*global criaSelect*/
/*global formSubmit*/
/*global confirma*/
formSubmit("excluir", "POST", "./sys/delProduto.php");
criaSelect("categorias", "./sys/include/select.php", "id_categoria", "nome_categoria");
document.getElementById("categorias").addEventListener("change", function () {
    'use strict';
    while (document.getElementById("produtos").hasChildNodes()) {
        document.getElementById("produtos").removeChild(document.getElementById("produtos").firstChild);
    }
    criaBox("./sys/include/select.php", "id_produto", "nome_produto", "produtos", document.getElementById("categorias").value);
});
function trataDados(resposta) {
    'use strict';
    if (resposta.excluir.valor) {
        confirma(1, "./delProduto.html", "Produto Excluído com Sucesso!", "", "");
    } else {
        confirma(0, "", "", "", "Ocorreu uma Falha no Servidor!");
    }
}
