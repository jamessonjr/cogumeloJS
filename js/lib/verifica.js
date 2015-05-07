/*global confirma*/
/*global ajax*/

//VARIÁVEIS
var n = {
    "Principal": 2,
    "Cadastro de Produto": 2,
    "Alterar Produto": 2,
    "Excluir Produto": 1,
    "Cadastro de Categoria": 2,
    "Excluir Categoria": 1
};

//FUNÇÃO PARA VERIFICAR O LOGIN DO USUÁRIO, O SEU NÍVEL DE ACESSO
(function () {
    'use strict';
    var resposta, xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            resposta = JSON.parse(xmlhttp.responseText);
            //window.alert(xmlhttp.responseText); //DESCOMENTE PARA GERAR UM ALERTA DOS DADOS
            if (!resposta.w.x) {
                window.sessionStorage.clear();
                confirma(0, "", "", "./index.html", "Acesso Restrito!");
            } else if (!(resposta.w.z <= n[document.title])) {
                confirma(0, "", "", "./principal.html", "Usuário sem Acesso!");
            } else {
                window.sessionStorage.setItem("x", resposta.w.x);
                window.sessionStorage.setItem("y", resposta.w.y);
                window.sessionStorage.setItem("z", resposta.w.z);
            }
        }
    };
    xmlhttp.open("POST", "./sys/login.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("usuario=" + window.sessionStorage.getItem("x") + "&" + "senha=" + window.sessionStorage.getItem("y"));
}());

//FUNÇÃO PARA VERIFICAR SE DADO INSERIDO NO CAMPO JÁ EXISTE NO BANCO
function verifica(idCampo, url, msgErro) {
    'use strict';
    var nomeArray, dadoArray, resposta, xmlhttp = new XMLHttpRequest();
    if (document.getElementById(idCampo).value) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                resposta = JSON.parse(xmlhttp.responseText);
                //window.alert(xmlhttp.responseText); //DESCOMENTE PARA GERAR UM ALERTA DOS DADOS
                for (nomeArray in resposta) {
                    if (resposta.hasOwnProperty(nomeArray)) {
                        for (dadoArray in resposta[nomeArray]) {
                            if (resposta[nomeArray].hasOwnProperty(dadoArray)) {
                                if (document.getElementById(idCampo).value === resposta[nomeArray][dadoArray].toString()) {
                                    confirma(0, "", "", "", msgErro);
                                }
                            }
                        }
                    }
                }
            }
        };
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(document.getElementById(idCampo).getAttribute('name') + "=" + document.getElementById(idCampo).value);
}
