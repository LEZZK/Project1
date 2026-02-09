// =================================================================
// SISTEMA DE PARTÍCULAS ANIMADAS
// =================================================================

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.y = Math.random() * canvas.height;
        this.previousX = this.x;
        this.previousY = this.y;
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.previousX = this.x;
        this.previousY = this.y;
        
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.vy *= -1;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
    }
}

class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 80;
        this.maxDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.init();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Atualizar e desenhar partículas
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        // Conectar partículas próximas
        this.connectParticles();

        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.5;
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }

            // Conectar com o mouse
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.particles[i].x - this.mouse.x;
                const dy = this.particles[i].y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const opacity = (1 - distance / this.mouse.radius) * 0.8;
                    this.ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Inicializar o sistema de partículas
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    new ParticleNetwork(canvas);
    gerarCodigo();
});

// =================================================================
// RESTO DO CÓDIGO ORIGINAL
// =================================================================

// Gerar código automático
function gerarCodigo() {
    const codigo = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('codigo').value = codigo;
}

// Função para trocar de aba
function changeTab(tabName) {
    // Remove active de todas as abas
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Adiciona active na aba clicada
    event.target.classList.add('active');
    
    if (tabName === 'consulta') {
        document.getElementById('consulta-content').classList.add('active');
    } else {
        document.getElementById('dados-content').classList.add('active');
    }
}

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    }
});

// Máscara para RG
document.getElementById('rg').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1})$/, '$1-$2');
        e.target.value = value;
    }
});

// Máscara para Telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    }
});

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// Buscar CEP automaticamente
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        // Mostrar loading
        document.getElementById('endereco').value = 'Buscando...';
        document.getElementById('bairro').value = 'Buscando...';
        document.getElementById('cidade').value = 'Buscando...';
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    
                    // Mostrar notificação de sucesso
                    mostrarNotificacao('✅ Endereço encontrado com sucesso!', 'success');
                } else {
                    limparEndereco();
                    mostrarNotificacao('❌ CEP não encontrado', 'error');
                }
            })
            .catch(error => {
                limparEndereco();
                mostrarNotificacao('⚠️ Erro ao buscar CEP', 'error');
                console.error('Erro:', error);
            });
    }
});

function limparEndereco() {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
}

// Função Novo Cliente
function novoCliente() {
    const form = document.getElementById('formCliente');
    form.reset();
    gerarCodigo();
    mostrarNotificacao('📝 Novo formulário limpo', 'info');
}

// Função Excluir Cliente
function excluirCliente() {
    const nome = document.getElementById('nome').value;
    
    if (!nome) {
        mostrarNotificacao('⚠️ Nenhum cliente para excluir', 'warning');
        return;
    }
    
    if (confirm(`Deseja realmente excluir o cliente "${nome}"?`)) {
        document.getElementById('formCliente').reset();
        gerarCodigo();
        mostrarNotificacao('🗑️ Cliente excluído com sucesso', 'success');
    }
}

// Submeter formulário
document.getElementById('formCliente').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const dados = Object.fromEntries(formData);
    
    // Validar campos obrigatórios
    if (!dados.nome) {
        mostrarNotificacao('⚠️ Por favor, preencha o nome do cliente', 'warning');
        return;
    }
    
    console.log('Dados do cliente:', dados);
    
    mostrarNotificacao('💾 Cliente salvo com sucesso!', 'success');
    
    // Aqui você pode adicionar lógica para enviar ao servidor
    // fetch('/api/clientes', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dados)
    // });
});

// Sistema de Notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remove notificação existente
    const existente = document.querySelector('.notificacao');
    if (existente) {
        existente.remove();
    }
    
    // Cria nova notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    // Adiciona CSS inline para notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
    `;
    
    // Define cor baseada no tipo
    const cores = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
    };
    
    notificacao.style.background = cores[tipo] || cores.info;
    
    document.body.appendChild(notificacao);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Adiciona animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Busca na aba Consulta
document.querySelector('.btn-search')?.addEventListener('click', function() {
    const searchTerm = document.getElementById('search').value;
    
    if (!searchTerm) {
        mostrarNotificacao('⚠️ Digite algo para buscar', 'warning');
        return;
    }
    
    // Simular busca
    mostrarNotificacao('🔍 Buscando clientes...', 'info');
    
    setTimeout(() => {
        mostrarNotificacao('ℹ️ Nenhum cliente encontrado', 'info');
    }, 1000);
});