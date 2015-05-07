/*global ajax*/
/*global criaSelect*/
/*global formSubmit*/
/*global confirma*/
/*global addValorMask*/
formSubmit("alterar", "POST", "./sys/altProduto.php");
criaSelect("categorias", "./sys/include/select.php", "id_categoria", "nome_categoria");
addValorMask("valor");
document.getElementById("categorias").addEventListener("change", function () {
    'use strict';
    var i;
    if (document.getElementById("categorias").value !== "0") {
        if (document.getElementById("produtos").length > 1) {
            for (i = document.getElementById("produtos").length; i >= 1; i--) {
                document.getElementById("produtos").remove(i);
            }
        }
        criaSelect("produtos", "./sys/include/select.php", "id_produto", "nome_produto", "categorias", document.getElementById("categorias").value);
    } else {
        for (i = document.getElementById("produtos").length; i >= 1; i--) {
            document.getElementById("produtos").remove(i);
        }
    }
});
function trataDados(resposta) {
    'use strict';
    if (resposta.alterar.valor) {
        confirma(1, "./altProduto.html", "Produto Alterado com Sucesso!", "", "");
    } else {
        confirma(0, "", "", "", "Ocorreu uma Falha no Servidor!");
    }
}
