<?
include("conecta.php");
if (isset($_POST)) {
    switch (key($_POST)) {
        case "produtos":
        if ($_POST["id_categoria"]) {
            dadosSelect("produtos", "id_categoria", $_POST["id_categoria"]);
            break;
        } else {
            dadosSelect("produtos");
            break;
        }
        case "categorias":
        dadosSelect("categorias");
    }
}
mysqli_close($link);
?>
