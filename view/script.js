//linhas que eu nao sei o nome
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.x<0||this.x>this.canvas.width)this.vx*=-1;
        if(this.y<0||this.y>this.canvas.height)this.vy*=-1;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle='rgba(139,92,246,0.6)';
        ctx.fill();
    }
}

class ParticleNetwork{
    constructor(canvas){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.particles=[];
        this.mouse={x:null,y:null,radius:150};
        this.numberOfParticles=80;
        this.maxDistance=150;
        this.init();
        this.animate();
        this.addEvents();
    }
    init(){
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight;
        this.particles=[];
        for(let i=0;i<this.numberOfParticles;i++) this.particles.push(new Particle(this.canvas));
    }
    addEvents(){
        window.addEventListener('resize',()=>this.init());
        window.addEventListener('mousemove', e=>{this.mouse.x=e.x;this.mouse.y=e.y;});
        window.addEventListener('mouseout', ()=>{this.mouse.x=null;this.mouse.y=null;});
    }
    animate(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.particles.forEach(p=>{p.update();p.draw(this.ctx);});
        this.connect();
        requestAnimationFrame(()=>this.animate());
    }
    connect(){
        for(let i=0;i<this.particles.length;i++){
            for(let j=i+1;j<this.particles.length;j++){
                const dx=this.particles[i].x-this.particles[j].x;
                const dy=this.particles[i].y-this.particles[j].y;
                const dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<this.maxDistance){
                    this.ctx.strokeStyle=`rgba(139,92,246,${1-dist/this.maxDistance*0.5})`;
                    this.ctx.lineWidth=1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x,this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x,this.particles[j].y);
                    this.ctx.stroke();
                }
            }
            if(this.mouse.x!==null&&this.mouse.y!==null){
                const dx=this.particles[i].x-this.mouse.x;
                const dy=this.particles[i].y-this.mouse.y;
                const dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<this.mouse.radius){
                    this.ctx.strokeStyle=`rgba(167,139,250,${1-dist/this.mouse.radius*0.8})`;
                    this.ctx.lineWidth=2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x,this.particles[i].y);
                    this.ctx.lineTo(this.mouse.x,this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// inicia elas
function initParticulas(){
    const canvas=document.getElementById('particleCanvas');
    if(canvas) new ParticleNetwork(canvas);
}


window.addEventListener('DOMContentLoaded', ()=>{
    gerarCodigo();
});

// gera cod
function gerarCodigo(){
    const codigo=document.getElementById('codigo');
    if(codigo) codigo.value=Math.floor(100000+Math.random()*900000);
}


function changeTab(tab){
    const tabs=document.querySelectorAll('.tab-btn');
    const contents=document.querySelectorAll('.tab-content');
    tabs.forEach(t=>t.classList.remove('active'));
    contents.forEach(c=>c.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(`${tab}-content`).classList.add('active');
}


function maskCPF(v){return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');}
function maskRG(v){return v.replace(/\D/g,'').replace(/(\d{2})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1})$/,'$1-$2');}
function maskTEL(v){return v.replace(/\D/g,'').replace(/^(\d{2})(\d)/g,'($1) $2').replace(/(\d)(\d{4})$/,'$1-$2');}
function maskCEP(v){return v.replace(/\D/g,'').replace(/^(\d{5})(\d)/,'$1-$2');}

document.getElementById('cpf')?.addEventListener('input', e=>{e.target.value=maskCPF(e.target.value);});
document.getElementById('rg')?.addEventListener('input', e=>{e.target.value=maskRG(e.target.value);});
document.getElementById('telefone')?.addEventListener('input', e=>{e.target.value=maskTEL(e.target.value);});
document.getElementById('cep')?.addEventListener('input', e=>{e.target.value=maskCEP(e.target.value);});

// CEP automático
document.getElementById('cep')?.addEventListener('blur', function(){
    const cep=this.value.replace(/\D/g,'');
    if(cep.length===8){
        ['endereco','bairro','cidade'].forEach(id=>document.getElementById(id).value='Buscando...');
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r=>r.json()).then(d=>{
            if(!d.erro){
                document.getElementById('endereco').value=d.logradouro||'';
                document.getElementById('bairro').value=d.bairro||'';
                document.getElementById('cidade').value=d.localidade||'';
                mostrarNotificacao('✅ Endereço encontrado','success');
            } else limparEndereco();
        }).catch(()=>limparEndereco());
    }
});
function limparEndereco(){['endereco','bairro','cidade'].forEach(id=>document.getElementById(id).value='');}

// Botões
function novoCliente(){document.getElementById('formCliente').reset(); gerarCodigo(); mostrarNotificacao('📝 Formulário limpo','info');}
function excluirCliente(){
    const nome=document.getElementById('nome').value;
    if(!nome){mostrarNotificacao('⚠️ Nenhum cliente','warning');return;}
    if(confirm(`Deseja realmente excluir "${nome}"?`)){
        document.getElementById('formCliente').reset();
        gerarCodigo();
        mostrarNotificacao('🗑️ Cliente excluído','success');
    }
}

// Submit
document.getElementById('formCliente')?.addEventListener('submit', e=>{
    e.preventDefault();
    const dados=Object.fromEntries(new FormData(e.target));
    console.log('Dados enviados:', dados);
    mostrarNotificacao('💾 Cliente salvo com sucesso','success');
});

// Notificações
function mostrarNotificacao(msg,tipo='info'){
    document.querySelector('.notificacao')?.remove();
    const n=document.createElement('div');
    n.className=`notificacao notificacao-${tipo}`;
    n.textContent=msg;
    n.style.background={
        success:'linear-gradient(135deg,#10b981,#059669)',
        error:'linear-gradient(135deg,#ef4444,#dc2626)',
        warning:'linear-gradient(135deg,#f59e0b,#d97706)',
        info:'linear-gradient(135deg,#8b5cf6,#6d28d9)'
    }[tipo]||'linear-gradient(135deg,#8b5cf6,#6d28d9)';
    n.style.animation='slideIn 0.3s ease';
    document.body.appendChild(n);
    setTimeout(()=>{n.style.animation='slideOut 0.3s ease'; setTimeout(()=>n.remove(),300);},3000);
}

// Busca na aba Consulta
document.querySelector('.btn-search')?.addEventListener('click', ()=>{
    const term=document.getElementById('search').value;
    if(!term)return mostrarNotificacao('⚠️ Digite algo para buscar','warning');
    mostrarNotificacao('🔍 Buscando clientes...','info');
    setTimeout(()=>mostrarNotificacao('ℹ️ Nenhum cliente encontrado','info'),1000);
});
