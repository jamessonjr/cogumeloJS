<?
include("include/conecta.php");
if (isset($_POST)) {
    foreach ($_POST as $chave => $valor){
        $retorno = deleteBanco("produtos", "id_produto", $_POST[$chave]);
    }
    $var = array("excluir" => array("valor" => $retorno));
    echo json_encode($var);
    mysqli_close($link);
}
?>
