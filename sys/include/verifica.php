<?
//ARQUIVO COM CHAVES POST PARA FAZER VERIFIÇÃO SE DADO JÁ EXITE NO BANCO
include("conecta.php");
if (isset($_POST)) {
    switch (key($_POST)) {
        case "nome_categoria":
        verificaBanco($_POST["nome_categoria"], "categorias", "nome_categoria");
        break;
        case "nome_produto":
        verificaBanco($_POST["nome_produto"], "produtos", "nome_produto");
        break;
    }
}
mysqli_close($link);
?>
