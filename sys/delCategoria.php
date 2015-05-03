<?
include("include/conecta.php");
if (isset($_POST)) {
    $retorno = deleteBanco("categorias", "id_categoria", $_POST["id_categoria"]);
    if ($retorno) {
        mysqli_query($link, "UPDATE produtos SET id_categoria = 0 WHERE id_categoria = $_POST[id_categoria]");
    }
    $var = array("excluir" => array("valor" => $retorno));
    echo json_encode($var);
    mysqli_close($link);
}
?>
