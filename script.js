let isLoggedIn = false;
let userName = 'Renan';

// Banco de Dados das especificações técnicas avançadas de cada máquina FORGE
const BANCO_DE_HARDWARE = {
  'Frost G-1': {
    name: 'FORGE G-1: Frost',
    tagline: 'Setup All-White completo voltado para alta taxa de quadros e excelente estabilidade térmica.',
    price: 'R$ 8.900',
    badge: 'GAMING WHITE',
    renderClass: 'chassis-silhouette white',
    specs: {
      cpu: 'Intel Core i5-14600KF (14 Cores / 20 Threads / Turbo 5.3GHz)',
      gpu: 'NVIDIA GeForce RTX 4070 12GB GDDR6X White Edition',
      motherboard: 'ASUS ROG Strix B760-A Gaming WiFi D5 White',
      ram: '32GB (2x16GB) DDR5 6000MHz Corsair Vengeance RGB WH',
      storage: '1TB SSD NVMe M.2 Kingston Renegade Gen4 (7.300 MB/s)',
      cooler: 'Water Cooler 240mm Deepcool LT520 WH (Liquid AIO)',
      psu: '750W Corsair 80 Plus Gold Modular SFX White',
      cabinet: 'Lian Li O11 Dynamic Mini White Edition'
    },
    benchmarks: {
      cinebench: '18.900 pts',
      timespy: '17.200 pts',
      fps: '310 FPS Avg',
      temp: '62°C Estável'
    }
  },
  'Frost G-2': {
    name: 'FORGE G-2: Dark Knight',
    tagline: 'Setup All-White completo voltado para alta taxa de quadros e excelente estabilidade térmica.',
    price: 'R$ 8.900',
    badge: 'GAMING WHITE',
    renderClass: 'chassis-silhouette white',
    specs: {
      cpu: 'Intel Core i5-14600KF (14 Cores / 20 Threads / Turbo 5.3GHz)',
      gpu: 'NVIDIA GeForce RTX 4070 12GB GDDR6X White Edition',
      motherboard: 'ASUS ROG Strix B760-A Gaming WiFi D5 White',
      ram: '32GB (2x16GB) DDR5 6000MHz Corsair Vengeance RGB WH',
      storage: '1TB SSD NVMe M.2 Kingston Renegade Gen4 (7.300 MB/s)',
      cooler: 'Water Cooler 240mm Deepcool LT520 WH (Liquid AIO)',
      psu: '750W Corsair 80 Plus Gold Modular SFX White',
      cabinet: 'Lian Li O11 Dynamic Mini White Edition'
    },
    benchmarks: {
      cinebench: '18.900 pts',
      timespy: '17.200 pts',
      fps: '310 FPS Avg',
      temp: '62°C Estável'
    }
  },
  'Business Pro': {
    name: 'FORGE Business Pro',
    tagline: 'Silencioso, altamente compacto e dimensionado para altíssima agilidade em desenvolvimento de códigos e planilhas massivas.',
    price: 'R$ 3.500',
    badge: 'OFFICE SILENT',
    renderClass: 'chassis-silhouette black',
    specs: {
      cpu: 'AMD Ryzen 5 8600G (6 Cores / 12 Threads / Gráficos 760M)',
      gpu: 'Gráficos Integrados Radeon 760M (RDNA 3 / 8 CUs)',
      motherboard: 'MSI PRO A620M-E DDR5 AM5',
      ram: '16GB (2x8GB) DDR5 5200MHz Crucial Classic',
      storage: '1TB SSD NVMe M.2 Kingston NV2 Gen4 (3.500 MB/s)',
      cooler: 'AMD Wraith Stealth Premium Silent',
      psu: '500W MSI Mag A500DN 80 Plus Standard',
      cabinet: 'AP201 ASUS Prime MicroATX Mesh Black'
    },
    benchmarks: {
      cinebench: '13.400 pts',
      timespy: '2.800 pts',
      fps: '140 FPS (1080p)',
      temp: '55°C Silencioso'
    }
  },
  'Titan IA': {
    name: 'FORGE Titan: IA',
    tagline: 'O ápice da performance de computação local. Desenvolvido especificamente para Deep Learning e renderizações em tempo real.',
    price: 'R$ 25.000',
    badge: 'TITAN HIGH-END',
    renderClass: 'chassis-silhouette titan',
    specs: {
      cpu: 'AMD Ryzen 9 7950X3D (16 Cores / 32 Threads / V-Cache)',
      gpu: 'NVIDIA GeForce RTX 4090 24GB VRAM GDDR6X (CUDA & Tensor Cores)',
      motherboard: 'Gigabyte X670E AORUS Master AM5 WiFi',
      ram: '128GB (4x32GB) DDR5 5600MHz Kingston Fury Beast',
      storage: '2TB SSD NVMe Gen5 Crucial T700 Extreme (12.400 MB/s)',
      cooler: 'Custom Liquid AIO 360mm Arctic Liquid Freezer III',
      psu: '1200W ATX 3.0 Corsair Shift PCIe 5.0 80 Plus Platinum',
      cabinet: 'NZXT H9 Flow Matte Black Premium Glass'
    },
    benchmarks: {
      cinebench: '38.400 pts',
      timespy: '32.100 pts',
      fps: '540 FPS Ultra',
      temp: '68°C Sob Carga'
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  showSection('hero');
  updateNav();
});

// FUNÇÃO MESTRE: ABRE O PRODUTO SELECIONADO EM UMA NOVA ABA COM PAINEL TÉCNICO EXCLUSIVO
function abrirProdutoEmNovaAba(idMaquina) {
  const pc = BANCO_DE_HARDWARE[idMaquina];
  if (!pc) return;

  const novaAba = window.open('', '_blank');
  if (!novaAba) {
    alert("O bloqueador de pop-ups do seu navegador impediu a abertura automática da aba técnica. Por favor, autorize pop-ups para este site.");
    return;
  }
  
  const mensagemWhatsapp = `Olá, gostaria de solicitar um orçamento para a build *${pc.name}* (${pc.badge}) no valor de ${pc.price}. Seguem as especificações técnicas desejadas: CPU: ${pc.specs.cpu}, GPU: ${pc.specs.gpu}, RAM: ${pc.specs.ram}.`;
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=5531900000000&text=${encodeURIComponent(mensagemWhatsapp)}`;

  // Captura o local físico de onde o site está rodando para que a nova aba possa resolver as rotas do CSS perfeitamente
  const basePath = window.location.origin + window.location.pathname;

  novaAba.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>FORGE — ${pc.name}</title>
      <base href="${basePath}">
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
      <style>
        /* CSS de Fallback Embutido para Garantir Estilo Premium Imediato */
        html, body {
          background: #0B0907 !important;
          margin: 0 !important;
          padding: 0 !important;
          color: #F4EDE4 !important;
          font-family: 'Barlow', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        body {
          padding: 60px 5% 100px !important;
          background-image: 
            linear-gradient(rgba(42, 132, 208, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42, 132, 208, 0.02) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .btn-voltar {
          display: inline-flex; align-items: center; gap: 8px; 
          margin-bottom: 25px;
          background: rgba(42, 132, 208, 0.05); color: #2a84d0; 
          border: 1px solid rgba(42, 132, 208, 0.4);
          padding: 10px 18px; font-family: 'JetBrains Mono', monospace; 
          text-transform: uppercase; font-size: 11px;
          text-decoration: none; transition: 0.3s; cursor: pointer;
          letter-spacing: 1px;
        }
        .btn-voltar:hover { background: #2a84d0; color: #0b0907; }

        .linha-neon {
          width: 100%; 
          height: 2px; 
          background: #2a84d0;
          box-shadow: 0 0 15px rgba(42, 132, 208, 0.8); 
          margin-bottom: 50px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 48px;
          align-items: start;
        }

        .blueprint-panel {
          background: #14110e;
          border: 1px solid rgba(42, 132, 208, 0.15);
          border-radius: 6px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 400px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .chassis-isometric {
          transform: scale(1.4);
          margin-bottom: 40px;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: scale(1.4) translateY(0px) rotate(0deg); }
          50% { transform: scale(1.4) translateY(-8px) rotate(1deg); }
        }

        .specs-panel {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .machine-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #2a84d0;
          letter-spacing: 3px;
          border: 1px solid rgba(42, 132, 208, 0.3);
          padding: 6px 14px;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 16px;
          background: rgba(42, 132, 208, 0.05);
        }

        .machine-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 56px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          line-height: 1;
          margin: 0;
        }

        .machine-tagline {
          font-size: 16px;
          color: #7A6A5E;
          line-height: 1.6;
          margin: 12px 0 0 0;
        }

        .section-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #2a84d0;
          border-left: 2px solid #2a84d0;
          padding-left: 12px;
          margin-bottom: 20px;
        }

        .hardware-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #14110e;
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 24px;
          border-radius: 6px;
        }

        .hardware-item {
          display: flex;
          font-size: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 10px;
        }

        .hardware-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .hardware-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #2a84d0;
          width: 150px;
          flex-shrink: 0;
          text-transform: uppercase;
        }

        .hardware-value {
          color: #F4EDE4;
        }

        .telemetria-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .telemetria-card {
          background: #14110e;
          border: 1px solid rgba(42, 132, 208, 0.1);
          padding: 20px;
          border-radius: 4px;
          text-align: left;
        }

        .telemetria-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #7A6A5E;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .telemetria-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #2a84d0;
        }

        .buy-action-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #14110e;
          border: 1px solid rgba(42, 132, 208, 0.2);
          padding: 28px 40px;
          border-radius: 6px;
          margin-top: 16px;
        }

        .price-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #7A6A5E;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }

        .price-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 40px;
          font-weight: 900;
          color: #F4EDE4;
          line-height: 1;
        }

        .btn-solicitar {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 36px;
          background: #2a84d0;
          color: #0B0907;
          border: none;
          cursor: pointer;
          border-radius: 2px;
          text-decoration: none;
          transition: 0.3s;
          box-shadow: 0 4px 15px rgba(42, 132, 208, 0.3);
          display: inline-flex;
          align-items: center;
        }

        .btn-solicitar:hover {
          background: #3a94e0;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(42, 132, 208, 0.5);
        }

        @media (max-width: 900px) {
          .product-grid { grid-template-columns: 1fr; }
          .telemetria-container { grid-template-columns: 1fr 1fr; }
          .buy-action-panel { flex-direction: column; gap: 20px; align-items: flex-start; }
          .btn-solicitar { width: 100%; justify-content: center; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="javascript:void(0)" class="btn-voltar" onclick="window.close()">← VOLTAR AO CATÁLOGO</a>
        <div class="linha-neon"></div>

        <div class="product-grid">
          <div class="blueprint-panel">
            <div class="blueprint-lines"></div>
            <div class="chassis-isometric ${pc.renderClass}"></div>
            <div class="machine-badge">${pc.badge}</div>
          </div>

          <div class="specs-panel">
            <div>
              <h1 class="machine-title">${pc.name}</h1>
              <p class="machine-tagline">${pc.tagline}</p>
            </div>

            <div>
              <div class="section-subtitle">Especificações de Hardware</div>
              <div class="hardware-list">
                <div class="hardware-item"><div class="hardware-label">PROCESSADOR</div><div class="hardware-value">${pc.specs.cpu}</div></div>
                <div class="hardware-item"><div class="hardware-label">PLACA DE VÍDEO</div><div class="hardware-value">${pc.specs.gpu}</div></div>
                <div class="hardware-item"><div class="hardware-label">PLACA MÃE</div><div class="hardware-value">${pc.specs.motherboard}</div></div>
                <div class="hardware-item"><div class="hardware-label">MEMÓRIA RAM</div><div class="hardware-value">${pc.specs.ram}</div></div>
                <div class="hardware-item"><div class="hardware-label">ARMAZENAMENTO</div><div class="hardware-value">${pc.specs.storage}</div></div>
                <div class="hardware-item"><div class="hardware-label">REFRIGERAÇÃO</div><div class="hardware-value">${pc.specs.cooler}</div></div>
                <div class="hardware-item"><div class="hardware-label">FONTE</div><div class="hardware-value">${pc.specs.psu}</div></div>
                <div class="hardware-item"><div class="hardware-label">GABINETE</div><div class="hardware-value">${pc.specs.cabinet}</div></div>
              </div>
            </div>

            <div>
              <div class="section-subtitle">Telemetria de Benchmarks</div>
              <div class="telemetria-container">
                <div class="telemetria-card">
                  <span class="telemetria-label">CINEBENCH R23</span>
                  <div class="telemetria-value">${pc.benchmarks.cinebench}</div>
                </div>
                <div class="telemetria-card">
                  <span class="telemetria-label">3DMARK SPY</span>
                  <div class="telemetria-value">${pc.benchmarks.timespy}</div>
                </div>
                <div class="telemetria-card">
                  <span class="telemetria-label">CS2 @ 1440P</span>
                  <div class="telemetria-value">${pc.benchmarks.fps}</div>
                </div>
                <div class="telemetria-card">
                  <span class="telemetria-label">ESTABILIDADE</span>
                  <div class="telemetria-value">${pc.benchmarks.temp}</div>
                </div>
              </div>
            </div>

            <div class="buy-action-panel">
              <div>
                <span class="price-label">INVESTIMENTO ESTIMADO</span>
                <div class="price-value">${pc.price}</div>
              </div>
              <a href="${linkWhatsApp}" target="_blank" class="btn-solicitar">Solicitar esta Build via WhatsApp →</a>
            </div>

          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  novaAba.document.close();
}

function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navItem = document.getElementById('nav-' + id);
  if (navItem) navItem.classList.add('active');
}

function updateNav() {
  const navUser = document.getElementById('nav-user-area');
  const navCta = document.getElementById('nav-cta-btn');

  if (isLoggedIn) {
    if (navUser) navUser.classList.add('visible');
    if (navCta) navCta.style.display = 'none';
  } else {
    if (navUser) navUser.classList.remove('visible');
    if (navCta) navCta.style.display = 'block';
  }
}

function doLogin() {
  isLoggedIn = true;
  const email = document.getElementById('login-email').value || 'Usuário';
  const display = document.getElementById('client-name-display');
  if (display) display.textContent = email.split('@')[0];
  updateNav();
  showSection('hero');
}

function doRegister() {
  isLoggedIn = true;
  updateNav();
  showSection('hero');
}

function doLogout() {
  isLoggedIn = false;
  updateNav();
  showSection('hero');
}

/* FUNÇÕES DO CONFIGURADOR (QUIZ) */
let qSelections = [null, null, null, null];

function selectOption(step, idx, val) {
  qSelections[step] = val;
  const opts = document.querySelectorAll('#qstep' + step + ' .quiz-option');
  opts.forEach((o, i) => o.classList.toggle('selected', i === idx));
  
  const btn = document.getElementById('qnext' + step);
  if (btn) {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  }
}

function nextStep(to) {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('qstep' + to).classList.add('active');
}

function prevStep(to) {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('qstep' + to).classList.add('active');
}

function showQuizResult() {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('qresult').classList.add('active');
  document.getElementById('result-name').textContent = "Workstation personalizada Forge";
  
  const quizBuyBtn = document.getElementById('btn-solicitar-quiz');
  if (quizBuyBtn) {
    quizBuyBtn.onclick = function() {
      openBuildModal('Workstation Customizada', 'Sob Consulta');
    }
  }
}

/* MODAL DE SOLICITAÇÃO */
function openBuildModal(name, price) {
  const modalName = document.getElementById('modal-build-name');
  const modalPrice = document.getElementById('modal-build-price');
  
  if (modalName) modalName.textContent = name;
  if (modalPrice) modalPrice.textContent = price;
  
  document.getElementById('build-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('build-modal').classList.remove('open');
}

function submitBuildRequest() {
  alert('Solicitação de orçamento técnico recebida! Entraremos em contato via WhatsApp/E-mail nas próximas horas.');
  closeModal();
}

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  
  if(tab === 'login') {
    document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
    document.getElementById('form-login').classList.add('active');
  } else {
    document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
    document.getElementById('form-register').classList.add('active');
  }
}

/* NAVEGAÇÃO DE PÁGINAS EM NOVAS ABAS */
function abrirEmNovaAba(secaoId) {
  const secaoElemento = document.getElementById(secaoId);
  if (!secaoElemento) return;

  const conteudo = secaoElemento.innerHTML;
  const novaAba = window.open('', '_blank');
  
  novaAba.document.write(`
      <html>
      <head>
          <title>FORGE - ${secaoId.toUpperCase()}</title>
          <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="style.css">
          <style>
              html, body { 
                  background: #0B0907 !important; 
                  margin: 0 !important; 
                  padding: 0 !important; 
                  display: block !important;
              }
              body {
                  padding: 40px 5% 100px !important;
              }
              .btn-voltar {
                  display: inline-flex; align-items: center; gap: 8px; 
                  margin-bottom: 25px;
                  background: rgba(42, 132, 208, 0.05); color: #2a84d0; 
                  border: 1px solid rgba(42, 132, 208, 0.4);
                  padding: 10px 18px; font-family: 'JetBrains Mono'; 
                  text-transform: uppercase; font-size: 11px;
                  text-decoration: none; transition: 0.3s; cursor: pointer;
                  letter-spacing: 1px;
              }
              .btn-voltar:hover { background: #2a84d0; color: #0b0907; }

              .linha-neon-horizontal {
                  width: 100%; 
                  height: 2px; 
                  background: #2a84d0;
                  box-shadow: 0 0 15px rgba(42, 132, 208, 0.8); 
                  margin-bottom: 50px;
                  border: none;
                  display: block !important;
              }
              main {
                  display: block !important;
                  margin: 0 !important;
                  padding: 0 !important;
              }
              .sec-header { 
                  margin: 0 0 50px 0 !important; 
                  padding: 0 !important;
                  display: block !important;
              }
              .sec-title { 
                  font-size: 54px !important; 
                  margin: 0 !important; 
                  text-align: center; 
                  font-family: 'Barlow Condensed';
                  line-height: 1.1;
              }
              section { display: block !important; padding: 0 !important; margin: 0 !important; }
          </style>
      </head>
      <body>
          <a href="javascript:void(0)" class="btn-voltar" onclick="window.close()">← VOLTAR AO INÍCIO</a>
          <div class="linha-neon-horizontal"></div>
          <main>
              ${conteudo}
          </main>

          <script>
            const BANCO_DE_HARDWARE = ${JSON.stringify(BANCO_DE_HARDWARE)};

            function filtrarBuilds() {
                const uso = document.getElementById('filter-usage').value;
                const cor = document.getElementById('filter-color').value;
                const preco = document.getElementById('filter-price').value;
                const cards = document.querySelectorAll('.build-card');
                cards.forEach(card => {
                    const matchUso = (uso === 'all' || card.getAttribute('data-usage') === uso);
                    const matchCor = (cor === 'all' || card.getAttribute('data-color') === cor);
                    const matchPreco = (preco === 'all' || card.getAttribute('data-price') === preco);
                    card.style.display = (matchUso && matchCor && matchPreco) ? 'block' : 'none';
                });
            }

            function abrirProdutoEmNovaAba(idMaquina) {
                if (window.opener && !window.opener.closed) {
                    window.opener.abrirProdutoEmNovaAba(idMaquina);
                }
            }

            function solicitarVenda(nomePC, event) {
                if (event) event.stopPropagation();
                if (window.opener && !window.opener.closed) {
                    window.opener.solicitarVenda(nomePC);
                }
            }
          </script>
      </body>
      </html>
  `);
  novaAba.document.close();
}

function filtrarBuilds() {
  const uso = document.getElementById('filter-usage').value;
  const cor = document.getElementById('filter-color').value;
  const preco = document.getElementById('filter-price').value;

  const cards = document.querySelectorAll('.build-card');

  cards.forEach(card => {
    const matchUso = (uso === 'all' || card.getAttribute('data-usage') === uso);
    const matchCor = (cor === 'all' || card.getAttribute('data-color') === cor);
    const matchPreco = (preco === 'all' || card.getAttribute('data-price') === preco);

    if (matchUso && matchCor && matchPreco) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function solicitarVenda(nomePC, event) {
  if (event) {
    event.stopPropagation();
  }
  
  const pc = BANCO_DE_HARDWARE[nomePC];
  if (pc) {
    openBuildModal(pc.name, pc.price);
  } else {
    openBuildModal(nomePC, 'Sob Consulta');
  }
}
// BANCO DE DATOS DE 30 COMPUTADORES
const computadores = [
    { id: "Frost G-1", badge: "Gaming", cor: "white", preco: "R$ 8.900", img: "R.jpg", cpu: "i5-14600KF", gpu: "RTX 4070 White", ram: "32GB DDR5", ssd: "1TB Gen4", psu: "750W Gold", case: "O11 Mini" },
    { id: "Obsidian X", badge: "Workstation", cor: "black", preco: "R$ 12.500", img: "pc-preto.png", cpu: "i7-14700K", gpu: "RTX 4070 Ti Super", ram: "64GB DDR5", ssd: "2TB Gen4", psu: "850W Gold", case: "H9 Flow" },
    { id: "Titan IA", badge: "High-End", cor: "black", preco: "R$ 25.000", img: "titan.png", cpu: "Ryzen 9 7950X", gpu: "RTX 4090 24GB", ram: "128GB DDR5", ssd: "4TB Gen4", psu: "1200W Platinum", case: "Forge Case" },
    { id: "Nebula", badge: "Gaming", cor: "black", preco: "R$ 5.800", img: "nebula.png", cpu: "i5-13400F", gpu: "RTX 4060 Ti", ram: "16GB DDR4", ssd: "1TB NVMe", psu: "650W Bronze", case: "Standard" },
    { id: "Spectre", badge: "Gaming", cor: "white", preco: "R$ 4.500", img: "spectre.png", cpu: "Ryzen 5 5600", gpu: "RTX 3060 White", ram: "16GB DDR4", ssd: "500GB NVMe", psu: "600W", case: "Mini White" },
    { id: "Valkyrie", badge: "Ultra", cor: "white", preco: "R$ 22.000", img: "valkyrie.png", cpu: "i9-14900K", gpu: "RTX 4080 Super White", ram: "64GB DDR5", ssd: "2TB Gen4", psu: "1000W Gold", case: "Lian Li Dynamic" }
    // O sistema vai repetir esses modelos até chegar em 30 para preencher o site
];

// GERADOR AUTOMÁTICO DOS 30 CARDS
function carregarCards() {
    const container = document.getElementById('builds-container');
    container.innerHTML = ""; // Limpa

    for (let i = 0; i < 30; i++) {
        const pc = computadores[i % computadores.length]; // Repete os modelos para completar 30
        const card = document.createElement('div');
        card.className = 'build-card';
        card.onclick = () => abrirDetalhes(pc);
        
        card.innerHTML = `
            <div class="build-card-img">
                <span class="build-badge">${pc.badge}</span>
                <div class="blueprint-lines"></div>
                <img src="${pc.img}" class="pc-photo">
            </div>
            <div class="build-card-body">
                <div style="font-family:JetBrains Mono; font-size:10px; color:#2a84d0">${pc.gpu} • ${pc.cpu}</div>
                <h3 class="build-name">${pc.id}</h3>
                <p class="build-tagline">Alta performance garantida para seu workload.</p>
                <div class="build-price">${pc.preco}</div>
            </div>
        `;
        container.appendChild(card);
    }
}

// FUNÇÃO PARA ABRIR A SEGUNDA TELA
function abrirDetalhes(pc) {
    document.getElementById('vendas').style.display = 'none';
    document.getElementById('detalhes-produto').style.display = 'block';

    document.getElementById('detalhe-nome').innerText = pc.id;
    document.getElementById('detalhe-img').src = pc.img;
    document.getElementById('detalhe-preco').innerText = pc.preco;
    document.getElementById('detalhe-tagline').innerText = `Setup completo otimizado para ${pc.badge}.`;

    const tabela = document.getElementById('tabela-specs');
    tabela.innerHTML = `
        <tr><td>PROCESSADOR</td><td>${pc.cpu}</td></tr>
        <tr><td>PLACA DE VÍDEO</td><td>${pc.gpu}</td></tr>
        <tr><td>MEMÓRIA RAM</td><td>${pc.ram}</td></tr>
        <tr><td>ARMAZENAMENTO</td><td>${pc.ssd}</td></tr>
        <tr><td>FONTE</td><td>${pc.psu}</td></tr>
        <tr><td>GABINETE</td><td>${pc.case}</td></tr>
    `;
    window.scrollTo(0,0);
}

function fecharDetalhes() {
    document.getElementById('vendas').style.display = 'block';
    document.getElementById('detalhes-produto').style.display = 'none';
}

// Inicia o site
carregarCards();
// BANCO DE DADOS DOS 30 PCs (Preencha os dados de cada um aqui)
const baseDadosPCs = {
  "Frost G-1": { cpu: "i5-14600KF", gpu: "RTX 4070 White", ram: "32GB DDR5", ssd: "1TB Gen4", psu: "750W Gold", case: "Lian Li White", preco: "R$ 8.900", img: "R.jpg" },
  "Dark Knight": { cpu: "Ryzen 7 7700X", gpu: "RTX 4070 Super Black", ram: "32GB DDR5", ssd: "1TB Fury", psu: "850W Gold", case: "NZXT H9 Flow", preco: "R$ 9.500", img: "pc-preto.png" },
  "Titan IA": { cpu: "Ryzen 9 7950X", gpu: "RTX 4090 24GB", ram: "128GB DDR5", ssd: "4TB Gen4", psu: "1200W Plat", case: "Forge Case", preco: "R$ 25.000", img: "titan.png" },
  // ... adicione os outros 27 nomes e peças seguindo esse padrão
};

function abrirProdutoEmNovaAba(id) {
  const pc = baseDadosPCs[id];
  if (!pc) return;

  // Troca as telas
  document.getElementById('vendas').style.display = 'none';
  document.getElementById('detalhes-produto').style.display = 'block';

  // Preenche os textos da segunda tela
  document.getElementById('detalhe-nome').innerText = id;
  document.getElementById('detalhe-preco').innerText = pc.preco;
  document.getElementById('detalhe-img').src = pc.img;

  // Monta a tabela de peças
  const corpoTabela = document.getElementById('tabela-specs-corpo');
  corpoTabela.innerHTML = `
    <tr><td style="color:var(--blue); padding:12px 0; font-family:var(--font-mono);">PROCESSADOR</td><td style="color:var(--ash);">${pc.cpu}</td></tr>
    <tr><td style="color:var(--blue); padding:12px 0; font-family:var(--font-mono);">PLACA DE VÍDEO</td><td style="color:var(--ash);">${pc.gpu}</td></tr>
    <tr><td style="color:var(--blue); padding:12px 0; font-family:var(--font-mono);">MEMÓRIA RAM</td><td style="color:var(--ash);">${pc.ram}</td></tr>
    <tr><td style="color:var(--blue); padding:12px 0; font-family:var(--font-mono);">ARMAZENAMENTO</td><td style="color:var(--ash);">${pc.ssd}</td></tr>
    <tr><td style="color:var(--blue); padding:12px 0; font-family:var(--font-mono);">FONTE</td><td style="color:var(--ash);">${pc.psu}</td></tr>
    <tr><td style="color:var(--blue); padding:12px 0; font-family:var(--font-mono);">GABINETE</td><td style="color:var(--ash);">${pc.case}</td></tr>
  `;
  window.scrollTo(0, 0);
}

function fecharDetalhes() {
  document.getElementById('vendas').style.display = 'block';
  document.getElementById('detalhes-produto').style.display = 'none';
}
