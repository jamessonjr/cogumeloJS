<?
include("include/conecta.php");
if (isset($_POST)) {
    $retorno = updateBanco($_POST, "produtos", 1);
    $var = array("alterar" => array("valor" => $retorno));
    echo json_encode($var);
    mysqli_close($link);
}
?>
