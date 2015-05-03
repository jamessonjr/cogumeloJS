/*global formSubmit*/
/*global confirma*/
formSubmit("login", "POST", "./sys/login.php");
window.sessionStorage.clear();
function trataDados(resposta) {
    'use strict';
    if (resposta.w.x) {
        window.sessionStorage.setItem("x", resposta.w.x);
        window.sessionStorage.setItem("y", resposta.w.y);
        window.sessionStorage.setItem("z", resposta.w.z);
    }
    confirma(resposta.w.x, "./principal.html", "Redirecionando... Aguarde!", 0, "Usuário e Senha Incorretos!");
}
