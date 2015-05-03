<?
include("include/conecta.php");
if (isset($_POST)) {
    $resultado = mysqli_query($link, "SELECT * FROM usuarios WHERE usuario = '$_POST[usuario]' AND hash = '$_POST[senha]'");
    $row = mysqli_fetch_assoc($resultado);
    if ($row != 0) {
        $var = array("w" => array("x" => $row["usuario"], "y" => $row["hash"], "z" => $row["nivel"]));
        echo json_encode($var);
    } else {
        $var = array("w" => array("x" => 0));
        echo json_encode($var);
    }
    mysqli_close($link);
}
?>
