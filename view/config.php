<?php
// Conexão com o banco
$conexao = mysqli_connect("localhost", "root", "", "dataBase");

// Checa conexão
if (!$conexao) {
    die("❌ Erro ao conectar: " . mysqli_connect_error());
}

// Recupera os dados do POST e escapa para segurança
$nome     = mysqli_real_escape_string($conexao, $_POST['nome']);
$email    = mysqli_real_escape_string($conexao, $_POST['email']);
$telefone = mysqli_real_escape_string($conexao, $_POST['telefone']);
$cep      = mysqli_real_escape_string($conexao, $_POST['cep']);
$endereco = mysqli_real_escape_string($conexao, $_POST['endereco']);
$numero   = mysqli_real_escape_string($conexao, $_POST['numero']);
$cidade   = mysqli_real_escape_string($conexao, $_POST['cidade']);
$bairro   = mysqli_real_escape_string($conexao, $_POST['bairro']);
$rg       = mysqli_real_escape_string($conexao, $_POST['rg']);
$cpf      = mysqli_real_escape_string($conexao, $_POST['cpf']);

// Verifica se o CPF já existe
$verifica = "SELECT cpf FROM dados WHERE cpf='$cpf'";
$resultado = mysqli_query($conexao, $verifica);

if (!$resultado) {
    die("❌ Erro na consulta: " . mysqli_error($conexao));
}

if (mysqli_num_rows($resultado) > 0) {
    echo "⚠️ CPF já cadastrado!";
} else {
    // Insere os dados na tabela (id auto-increment)
    $sql = "INSERT INTO dados (nome, email, telefone, cep, endereco, numero, cidade, bairro, rg, cpf)
            VALUES ('$nome', '$email', '$telefone', '$cep', '$endereco', '$numero', '$cidade', '$bairro', '$rg', '$cpf')";

    if (mysqli_query($conexao, $sql)) {
        echo "✅ Usuário cadastrado com sucesso!";
    } else {
        echo "❌ Erro ao cadastrar: " . mysqli_error($conexao);
    }
}

// Fecha a conexão
mysqli_close($conexao);
?>
