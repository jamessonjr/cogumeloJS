<?
include("include/conecta.php");
if (isset($_POST)) {
    $retorno = insertBanco($_POST, "categorias");
    $var = array("cadastro" => array("valor" => $retorno));
    echo json_encode($var);
    mysqli_close($link);
}
?>
