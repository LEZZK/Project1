<?php

require_once 'config.php';

?>



<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro Cliente</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Canvas para efeito de partículas -->
    <canvas id="particleCanvas"></canvas>
    
    <div class="container">
        <!-- Header -->
        <header class="header">
            <h1>Cadastro Cliente</h1>
        </header>

        <!-- Tabs -->
        <div class="tabs">
            <button class="tab-btn" onclick="changeTab('consulta')">Consulta</button>
            <button class="tab-btn active" onclick="changeTab('dados')">Dados Pessoais</button>
        </div>

        <!-- Tab Content: Consulta -->
        <div id="consulta-content" class="tab-content">
            <div class="consulta-section">
                <h2>🔍 Consultar Cliente</h2>
                <div class="search-box">
                    <input type="text" id="search" placeholder="Buscar por código, nome ou CPF...">
                    <button class="btn-search">Buscar</button>
                </div>
                <div class="results-info">
                    <p>Digite os dados do cliente para realizar a busca</p>
                </div>
            </div>
        </div>

        <!-- Tab Content: Dados Pessoais -->
        <div id="dados-content" class="tab-content active">
            <form id="formCliente" method="POST" action="view/config.php">
                <div class="form-grid">
                    <!-- Código -->
                    <div class="form-group">
                        <label for="id">id</label>
                        <input type="text" id="codigo" name="id" placeholder="Código automático" required>
                    </div>

                    <!-- Nome -->
                    <div class="form-group full-width">
                        <label for="nome">Nome</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite o nome completo" required>
                    </div>

                    <!-- E-mail -->
                    <div class="form-group full-width">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="exemplo@email.com" required>
                    </div>

                    <!-- Telefone -->
                    <div class="form-group">
                        <label for="telefone">Telefone</label>
                        <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>
                    </div>

                    <!-- CEP -->
                    <div class="form-group">
                        <label for="cep">CEP</label>
                        <input type="text" id="cep" name="cep" placeholder="00000-000" maxlength="9" required>
                    </div>

                    <!-- Endereço -->
                    <div class="form-group full-width">
                        <label for="endereco">Endereço</label>
                        <input type="text" id="endereco" name="endereco" placeholder="Rua, Avenida..." required>
                    </div>

                    <!-- Número -->
                    <div class="form-group">
                        <label for="numero">Número</label>
                        <input type="text" id="numero" name="numero" placeholder="Nº" required>
                    </div>

                    <!-- Cidade -->
                    <div class="form-group">
                        <label for="cidade">Cidade</label>
                        <input type="text" id="cidade" name="cidade" placeholder="Digite a cidade">
                    </div>

                    <!-- Bairro -->
                    <div class="form-group full-width">
                        <label for="bairro">Bairro</label>
                        <input type="text" id="bairro" name="bairro" placeholder="Digite o bairro">
                    </div>

                    <!-- RG -->
                    <div class="form-group">
                        <label for="rg">RG</label>
                        <input type="text" id="rg" name="rg" placeholder="00.000.000-0" required>
                    </div>

                    <!-- CPF -->
                    <div class="form-group">
                        <label for="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxlength="14" required>
                    </div>
                </div>

                <!-- Botões de Ação -->
                <div class="action-buttons">
                    <button type="button" class="btn btn-novo" onclick="novoCliente()">
                        <span class="icon">➕</span> Novo
                    </button>
                    <button type="submit" class="btn btn-salvar">
                        <span class="icon">💾</span> Salvar
                    </button>
                    <button type="button" class="btn btn-editar">
                        <span class="icon">✏️</span> Editar
                    </button>
                    <button type="button" class="btn btn-excluir" onclick="excluirCliente()">
                        <span class="icon">🗑️</span> Excluir
                    </button>
                    <button type="button" class="btn btn-imprimir">
                        <span class="icon">🖨️</span> Imprimir
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>