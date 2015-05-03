/*global formSubmit*/
/*global confirma*/
/*global addCapMask*/
/*global addValorMask*/
/*global criaSelect*/
/*global verifica*/
addCapMask("produtos");
addValorMask("valor");
formSubmit("cadastro", "POST", "./sys/cadProduto.php");
criaSelect("categorias", "./sys/include/select.php", "id_categoria", "nome_categoria");
document.getElementById("produtos").addEventListener("blur", function () {
    "use strict";
    verifica("produtos", "./sys/include/verifica.php", "Produto já Cadastrado!");
});
function trataDados(resposta) {
    'use strict';
    if (resposta.cadastro.valor) {
        confirma(1, "./cadProduto.html", "Dados Inseridos com Sucesso!", "", "");
    } else {
        confirma(0, "", "", "", "Ocorreu uma Falha no Servidor!");
    }
}
