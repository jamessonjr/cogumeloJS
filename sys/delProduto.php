<?
include("include/conecta.php");
if (isset($_POST)) {
    $retorno = deleteBanco("produtos", "id_produto", $_POST["id_produto"]);
    $var = array("excluir" => array("valor" => $retorno));
    echo json_encode($var);
    mysqli_close($link);
}
?>
