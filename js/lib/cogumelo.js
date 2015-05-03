/*global trataDados*/
/*global jsSHA*/

/*VERIFICAÇÃO PARA SABER SE O NAVEGADOR É O INTERNET EXPLORER INFERIOR AO 11*/
if (navigator.appName.match(/Internet Explorer/)) {
    window.alert("Não damos suporte ao seu navegador");
    window.location.assign("http://br.mozdev.org/firefox/download/");
}

/*PARTE DAS FUNÇÕES PARA FORMULÁRIO*/

//FUNÇÃO PARA PEGAR OS DADOS DE UM FORMULÁRIO
function getDados(idForm) {
    'use strict';
    var i, sha, hash, comp, forms = document.forms, dados = String();
    if (forms.namedItem(idForm) !== null) {
        for (i = 0; i < forms.namedItem(idForm).elements.length - 1; i++) {
            if (forms.namedItem(idForm).elements[i].type === "radio") {
                if (i !== forms.namedItem(idForm).elements.length - 1 && forms.namedItem(idForm).elements[i].checked === true) {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + forms.namedItem(idForm).elements[i].value + "&";
                }
                if (i === forms.namedItem(idForm).elements.length - 1 && forms.namedItem(idForm).elements[i].checked === true) {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + forms.namedItem(idForm).elements[i].value;
                }
            }
            if (forms.namedItem(idForm).elements[i].type === "checkbox") {
                if (i !== forms.namedItem(idForm).elements.length - 1 && forms.namedItem(idForm).elements[i].checked === true) {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + forms.namedItem(idForm).elements[i].value + "&";
                }
                if (i === forms.namedItem(idForm).elements.length - 1 && forms.namedItem(idForm).elements[i].checked === true) {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + forms.namedItem(idForm).elements[i].value;
                }
            }
            if (forms.namedItem(idForm).elements[i].type === "password") {
                sha = new jsSHA(forms.namedItem(idForm).elements[i].value, "TEXT");
                hash = sha.getHash("SHA-1", "HEX");
                if (i !== forms.namedItem(idForm).elements.length - 1) {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + hash + "&";
                } else {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + hash;
                }
            }
            if (forms.namedItem(idForm).elements[i].type !== "checkbox" && forms.namedItem(idForm).elements[i].type !== "radio" && forms.namedItem(idForm).elements[i].type !== "password") {
                if (i !== forms.namedItem(idForm).elements.length - 1) {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + forms.namedItem(idForm).elements[i].value + "&";
                } else {
                    dados += forms.namedItem(idForm).elements[i].name + "=" + forms.namedItem(idForm).elements[i].value;
                }
            }
        }
        comp = dados.charAt(dados.length - 1).localeCompare("&");
        if (!comp) {
            dados = dados.replace(/.$/, "");
        }
        return dados;
    } else {
        window.console.log("Você não definiu o id do formulário!");
    }
}

//FUNÇÃO AJAX PARA METODO GET OU POST
function ajax(metodo, url, dados) {
    'use strict';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            trataDados(JSON.parse(xmlhttp.responseText));
            //window.alert(xmlhttp.responseText); //DESCOMENTE PARA GERAR UM ALERTA DOS DADOS
        }
    };
    if (metodo !== "POST") {
        xmlhttp.open(metodo, url, true);
        xmlhttp.send();
    } else {
        xmlhttp.open(metodo, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(dados);
    }
}

//FUNÇÃO PARA MONTAR A URL DO METODO GET
function montaURL(url, idForm) {
    'use strict';
    if (document.forms.length !== 0) {
        url += "?" + getDados(idForm);
        return url;
    } else {
        return url;
    }
}

//FUNÇÃO PARA FECHAR A JANELA CRIADA NA FUNÇÃO CONFIRMA
function fechar(resposta, link) {
    'use strict';
    if (resposta) {
        document.getElementById("abrirModal").style.opacity = 0;
        document.getElementById("abrirModal").style.pointerEvents = "none";
        window.location.assign(link);
    } else {
        document.getElementById("abrirModal").style.opacity = 0;
        document.getElementById("abrirModal").style.pointerEvents = "none";
        document.getElementById("abrirModal").parentNode.removeChild(document.getElementById("abrirModal"));
        if (link) {
            window.location.assign(link);
        }
    }
}

//FUNÇÃO PARA CIRAR A JANELA CONFIRMA
function confirma(resposta, linkConfirma, msgConfirma, linkErro, msgErro) {
    'use strict';
    var divPrincipal, divCorpo, img, texto;
    if (resposta) {
        divPrincipal = document.createElement("DIV");
        divPrincipal.className = "modalDialog";
        divPrincipal.setAttribute("id", "abrirModal");
        document.body.appendChild(divPrincipal);
        divCorpo = document.createElement("DIV");
        divPrincipal.appendChild(divCorpo);
        texto = document.createElement("H3");
        texto.appendChild(document.createTextNode(msgConfirma));
        divCorpo.appendChild(texto);
        img = document.createElement("IMG");
        img.className = "modalpic";
        img.setAttribute("alt", "Confirmação");
        img.setAttribute("src", "img/modal/confirma.png");
        texto.appendChild(img);
        divPrincipal.style.opacity = 1;
        divPrincipal.style.pointerEvents = "auto";
        window.setTimeout(function () { fechar(resposta, linkConfirma); }, 3000);
    } else {
        divPrincipal = document.createElement("DIV");
        divPrincipal.className = "modalDialog";
        divPrincipal.setAttribute("id", "abrirModal");
        document.body.appendChild(divPrincipal);
        divCorpo = document.createElement("DIV");
        divPrincipal.appendChild(divCorpo);
        texto = document.createElement("H3");
        texto.appendChild(document.createTextNode(msgErro));
        divCorpo.appendChild(texto);
        img = document.createElement("IMG");
        img.className = "modalpic";
        img.setAttribute("alt", "Alerta");
        img.setAttribute("src", "img/modal/alerta.png");
        texto.appendChild(img);
        divPrincipal.style.opacity = 1;
        divPrincipal.style.pointerEvents = "auto";
        window.setTimeout(function () { fechar(resposta, linkErro); }, 3000);
    }
}

//FUNÇÃO PARA GERAR OPTIONS DINÂMICOS NO SELECT
function criaSelect(idSelect, url, value, html, chave, valor) {
    'use strict';
    var i, option, resposta, xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            resposta = JSON.parse(xmlhttp.responseText);
            //window.alert(xmlhttp.responseText); //DESCOMENTE PARA GERAR UM ALERTA DOS DADOS
            for (i = 0; i < resposta[idSelect].length; i++) {
                option = document.createElement("OPTION");
                document.getElementById(idSelect).appendChild(option);
                option.value = resposta[idSelect][i][value];
                option.innerHTML = resposta[idSelect][i][html];
            }
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (chave) {
        xmlhttp.send(idSelect + "=" + idSelect + "&" + document.getElementById(chave).getAttribute("name") + "=" + valor);
    } else {
        xmlhttp.send(idSelect + "=" + idSelect);
    }
}

//FUNÇÃO PARA CANCELAR O EVENTO SUBMIT PADRÃO DO FORMULÁRIO E FAZER O ENVIO VIA AJAX
function formSubmit(idForm, metodo, url) {
    'use strict';
    document.getElementById(idForm).onsubmit = function (evento) {
        evento.preventDefault();
        var dados = getDados(idForm);
        ajax(metodo, url, dados);
    };
}

/*FIM DA PARTE DAS FUNÇÕES PARA FORMULÁRIO*/

/*PARTE DAS FUNÇÕES DE MÁSCARAS*/

//FUNÇÃO PARA CRIAR MÁSCARA PARA CEP DEFINIR CAMPO COM MAXLENGTH 9
function addCepMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/\D/g, "");
        campo.value = campo.value.replace(/^(\d{5})(\d)/, "$1-$2");
    });
}

//FUNÇÃO PARA CRIAR MÁSCARA PARA TELEFONE DEFINIR CAMPO COM MAXLENGTH 14 ou 15 CASO TENHA O NONO DÍGITO
function addTelMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/\D/g, "");
        campo.value = campo.value.replace(/^(\d{2})(\d)/g, "($1) $2");
        campo.value = campo.value.replace(/(\d)(\d{4})$/, "$1-$2");
    });
}

//FUNÇÃO PARA CRIAR MÁSCARA PARA CPF DEFINIR CAMPO COM MAXLENGTH 14
function addCPFMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/\D/g, "");
        campo.value = campo.value.replace(/^(\d{3})(\d)/, "$1.$2");
        campo.value = campo.value.replace(/(\d{3})(\d)/, "$1.$2");
        campo.value = campo.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });
}

//FUNÇÃO PARA CRIAR MÁSCARA PARA CNPJ DEFINIR CAMPO COM MAXLENGTH 18
function addCNPJMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/\D/g, "");
        campo.value = campo.value.replace(/^(\d{2})(\d)/, "$1.$2");
        campo.value = campo.value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        campo.value = campo.value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        campo.value = campo.value.replace(/(\d{4})(\d)/, "$1-$2");
    });
}

//FUNÇÃO PARA CRIAR MÁSCARA PARA MOEDA DEFINIR CAMPO COM MAXLENGHT 10
function addValorMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/\D/g, "");
        campo.value = campo.value.replace(/(\d)(\d{2})$/, "$1,$2");
    });
}

//FUNÇÃO PARA CRIAR MÁSCARA PARA DEIXAR LETRAS MAIÚSCULAS AO DIGIRAR SEM ACEITAR NÚMEROS
function addCapMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/[a-z\u00C0-\u00FF]/g, function ($1) { return $1.toUpperCase(); });
    });
}

//FUNÇÃO PARA CRIAR MÁSCARA PARA DATA DEFINIR CAMPO COM MAXLENGHT 10
function addDataMask(idCampo) {
    'use strict';
    var campo = document.getElementById(idCampo);
    campo.addEventListener("keyup", function () {
        campo.value = campo.value.replace(/\D/g, "");
        campo.value = campo.value.replace(/(\d{2})(\d)/, "$1/$2");
        campo.value = campo.value.replace(/(\d{2})(\d)/, "$1/$2");
        campo.value = campo.value.replace(/(\d{4})/, "$1");
    });
}

//FUNÇÃO PARA BOTÃO DE RÁDIO DEFINIR O TIPO DE CAMPO SE É CPF OU CNPJ APENAS NECESSÁRIO CRIAR O CAMPO
function radios(idRadioCPF, idRadioCNPJ, idCampo) {
    'use strict';
    var radioCPF = document.getElementById(idRadioCPF), radioCNPJ = document.getElementById(idRadioCNPJ);
    radioCPF.addEventListener("click", function () {
        if (radioCPF.checked) {
            var campo = document.getElementById(idCampo);
            campo.disabled = false;
            campo.value = "";
            campo.maxLength = "14";
            addCPFMask(idCampo);
        }
    });
    radioCNPJ.addEventListener("click", function () {
        if (radioCNPJ.checked) {
            var campo = document.getElementById(idCampo);
            campo.disabled = false;
            campo.value = "";
            campo.maxLength = "18";
            addCNPJMask(idCampo);
        }
    });
}

/*FIM DA PARTE DAS FUNÇÕES DE MÁSCARAS*/

/*PARTE DAS FUNÇÕES DE RELATÓRIO*/

//FUNÇÃO PARA MONTAR TABELA DE ACORDO COM DADOS VINDO DO SERVIDOR
function criaTabela(resposta) {
    'use strict';
    var tabela, thead, tbody, tr, th, td, nomeArray, propObj, posArray, valorObj;
    tabela = document.createElement("TABLE");
    tabela.className = "tabela";
    tabela.setAttribute("id", "tabela");
    document.body.appendChild(tabela);
    thead = document.createElement("THEAD");
    tabela.appendChild(thead);
    tr = document.createElement("TR");
    thead.appendChild(tr);
    for (nomeArray in resposta) {
        if (resposta.hasOwnProperty(nomeArray)) {
            for (propObj in resposta[nomeArray][0]) {
                if (resposta[nomeArray][0].hasOwnProperty(propObj)) {
                    th = document.createElement("TH");
                    th.appendChild(document.createTextNode(propObj));
                    tr.appendChild(th);
                }
            }
        }
    }
    tbody = document.createElement("TBODY");
    document.getElementById("tabela");
    document.getElementById("tabela").appendChild(tbody);
    for (nomeArray in resposta) {
        if (resposta.hasOwnProperty(nomeArray)) {
            for (posArray in resposta[nomeArray]) {
                if (resposta[nomeArray].hasOwnProperty(posArray)) {
                    tr = document.createElement("TR");
                    tbody.appendChild(tr);
                    for (valorObj in resposta[nomeArray][posArray]) {
                        if (resposta[nomeArray][posArray].hasOwnProperty(valorObj)) {
                            td = document.createElement("TD");
                            td.appendChild(document.createTextNode(resposta[nomeArray][posArray][valorObj]));
                            tr.appendChild(td);
                        }
                    }
                }
            }
        }
    }
}

/*FIM DA PARTE DAS FUNÇÕES DE RELATÓRIO*/
