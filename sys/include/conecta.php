<?
//VARIÁVEIS DE CONEXÃO COM BANCO
$banco = "cantilever_cardapio";
$host = "localhost";
$login = "root";
$senha = "784015";

// CONEXÃO COM BANCO DE DADOS
$link = mysqli_connect($host, $login, $senha, $banco);

//FUNÇÃO DE INSERÇÃO DE DADOS NO BANCO
function insertBanco($dados, $tabela) {
    $i = 1;
    foreach ($dados as $chave => $valor) {
        $campos .= $chave; //Montagem dos campos da query
        $valores .= "'".$valor."'"; //Montagem dos valores da query
        if ($i < sizeof($dados)) {
            $campos .= ", "; //Inserção das virgulas entre os campos da query
            $valores .= ", "; //Inserção das virgulas entre os valores da query
        }
        $i++;
    }
    mysqli_query($GLOBALS["link"], "INSERT INTO $tabela ($campos) VALUES ($valores)");
    return (mysqli_affected_rows($GLOBALS["link"]) == 1) ? true : false;
}

//FUNÇÃO PARA ATUALIAZAR DADOS NO BANCO
function updateBanco($dados, $tabela, $pos) {
    $i = 1;
    foreach ($dados as $chave => $valor) {
        $campos = $chave;
        $valores = "'".$valor."'";
        if ($i < sizeof($dados)) {
            $valorQuery .= "$campos = $valores, ";
        }
        $i++;
    }
    $valorQuery .= "$campos = $valores ";
    $chavePrimaria =  explode(",",$valorQuery);
    mysqli_query($GLOBALS["link"], "UPDATE $tabela SET $valorQuery WHERE $chavePrimaria[$pos]");
    return (mysqli_affected_rows($GLOBALS["link"]) == 1) ? true : false;
}

//FUNÇÃO PARA DELETAR UM REGISTRO NO BANCO
function deleteBanco($tabela, $chave, $post) {
    mysqli_query($GLOBALS["link"], "DELETE FROM $tabela WHERE $chave = $post");
    return (mysqli_affected_rows($GLOBALS["link"]) == 1) ? true : false;
}

//FUNÇÃO PARA USO COM O EVENTSOURCE CRIADO PELO JS
function retornoBanco($coluna, $tabela) {
    $array = array();
    $resultado = mysqli_query($GLOBALS["link"], "SELECT $coluna, valor_produto, id_categoria FROM $tabela");
    while ($row = mysqli_fetch_assoc($resultado)) {
        $array[$tabela][] = $row;
    }
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    echo "data:". json_encode($array) . "\n\n";
}

//FUNÇÃO PARA VERIFICAÇÃO SE DADO JÁ EXISTE NO BANCO
function verificaBanco($dado, $tabela, $coluna) {
    $resultado = mysqli_query($GLOBALS["link"], "SELECT $coluna FROM $tabela WHERE $coluna = '$dado'");
    $row = mysqli_fetch_assoc($resultado);
    if ($row != 0) {
        $var = array("resposta" => array($row[$coluna]));
        echo json_encode($var);
    }
}

//FUNÇÃO PARA RETORNAR DADOS PARA INSERIR NO CAMPO SELECT
function dadosSelect($tabela, $chave, $dado) {
    $array = array();
    if ($chave) {
        $resultado = mysqli_query($GLOBALS["link"], "SELECT * FROM $tabela WHERE $chave = $dado");
    } else {
        $resultado = mysqli_query($GLOBALS["link"], "SELECT * FROM $tabela");
    }
    while ($row = mysqli_fetch_assoc($resultado)) {
        $array[$tabela][] = $row;
    }
    echo json_encode($array);
}
?>
