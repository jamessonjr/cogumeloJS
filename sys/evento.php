<?
include("include/conecta.php");
$coluna = array("nome_produto", "valor_produto", "id_categoria");
retornoBanco($coluna, "produtos");
?>
