/*global formSubmit*/
/*global confirma*/
/*global addCapMask*/
/*global verifica*/
addCapMask("categorias");
formSubmit("cadastro", "POST", "./sys/cadCategoria.php");
document.getElementById("categorias").addEventListener("blur", function () {
    "use strict";
    verifica("categorias", "./sys/include/verifica.php", "Categoria já Cadastrada!");
});
function trataDados(resposta) {
    'use strict';
    if (resposta.cadastro.valor) {
        confirma(1, "./cadCategoria.html", "Dados Inseridos com Sucesso!", "", "");
    } else {
        confirma(0, "", "", "", "Ocorreu uma Falha no Servidor!");
    }
}
