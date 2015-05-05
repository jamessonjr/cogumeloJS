<?
include("include/conecta.php");
$arrayRetorno = array();
$i = 0;
$categorias = mysqli_query($link, "SELECT nome_categoria FROM categorias");
while ($row = mysqli_fetch_assoc($categorias)) {
    $arrayRetorno[categorias][] = $row;
}

$qntCategorias = count($arrayRetorno[categorias]);
while ($i < $qntCategorias) {
    $qtdCategoria = mysqli_query($link, "SELECT COUNT(id_categoria) AS categoria FROM produtos WHERE id_categoria = $i");
    while ($row = mysqli_fetch_assoc($qtdCategoria)) {
        $arrayRetorno[qtdCategorias][] = $row;
        $i++;
    }
}

$resultado = mysqli_query($link, "SELECT nome_produto, valor_produto, id_categoria FROM produtos");
while ($row = mysqli_fetch_assoc($resultado)) {
    $arrayRetorno[produtos][] = $row;
}
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
echo "data:". json_encode($arrayRetorno) . "\n\n";
?>
