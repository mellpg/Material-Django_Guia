// ============================================
// SISTEMA DE PROGRESSO
// ============================================
(function() {
  const progressBar = document.getElementById('progressBarFill');
  const progressText = document.getElementById('progressText');
  const overlay = document.getElementById('parabensOverlay');
  const confettiContainer = document.getElementById('confettiContainer');

  const secoesComBotao = ['passos_iniciais', 'Parte1', 'hello_world', 'Parte2', 'parte3'];
  const totalSecoes = secoesComBotao.length;
  let lidos = JSON.parse(localStorage.getItem('secoesLidas')) || [];

  function atualizarProgresso() {
    const progresso = Math.min((lidos.length / totalSecoes) * 100, 100);
    const percentual = Math.round(progresso);
    progressBar.style.width = percentual + '%';
    progressText.textContent = percentual + '%';
    if (percentual === 100 && totalSecoes > 0) mostrarParabens();
  }

  function marcarLido(botao) {
    const secaoId = botao.getAttribute('data-secao');
    if (!lidos.includes(secaoId)) {
      lidos.push(secaoId);
      localStorage.setItem('secoesLidas', JSON.stringify(lidos));
      botao.classList.add('lido');
      botao.innerHTML = '<i class="bi bi-check-circle-fill"></i> Lido ✓';
      atualizarProgresso();
    }
  }

  function verificarEstadoInicial() {
    document.querySelectorAll('.btn-lido').forEach(botao => {
      const secaoId = botao.getAttribute('data-secao');
      if (lidos.includes(secaoId)) {
        botao.classList.add('lido');
        botao.innerHTML = '<i class="bi bi-check-circle-fill"></i> Lido ✓';
      }
    });
    atualizarProgresso();
  }

  function mostrarParabens() {
    overlay.classList.add('active');
    gerarConfetes();
  }

  window.fecharParabens = function() {
    overlay.classList.remove('active');
    confettiContainer.innerHTML = '';
  };

  function gerarConfetes() {
    const cores = ['#4cbb7a', '#ff6b6b', '#ffd93d', '#6bcbff', '#ff6fb7', '#a66cff', '#ff9f43'];
    confettiContainer.innerHTML = '';
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = cores[Math.floor(Math.random() * cores.length)];
      confetti.style.width = (Math.random() * 8 + 4) + 'px';
      confetti.style.height = (Math.random() * 8 + 4) + 'px';
      confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confettiContainer.appendChild(confetti);
    }
    setTimeout(() => { confettiContainer.innerHTML = ''; }, 6000);
  }

  function adicionarBotoesLido() {
    secoesComBotao.forEach(id => {
      const secao = document.getElementById(id);
      if (!secao || secao.querySelector('.btn-lido')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'btn-lido-wrapper';
      const botao = document.createElement('button');
      botao.className = 'btn-lido';
      botao.setAttribute('data-secao', id);
      botao.innerHTML = '<i class="bi bi-check-circle"></i> Marcar como lido';
      botao.onclick = function(e) { e.stopPropagation(); marcarLido(this); };
      wrapper.appendChild(botao);
      secao.appendChild(wrapper);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      adicionarBotoesLido();
      verificarEstadoInicial();
    });
  } else {
    adicionarBotoesLido();
    verificarEstadoInicial();
  }
})();
function copiarCodigo(botao) {
      const codeBlock = botao.closest('.code-block');
      const codigo = codeBlock.querySelector('pre').innerText;

      navigator.clipboard.writeText(codigo).then(() => {
        botao.innerHTML = '<i class="bi bi-check2"></i> Copiado!';
        botao.classList.add('copiado');

        setTimeout(() => {
          botao.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
          botao.classList.remove('copiado');
        }, 2000);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = codigo;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        botao.innerHTML = '<i class="bi bi-check2"></i> Copiado!';
        botao.classList.add('copiado');

        setTimeout(() => {
          botao.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
          botao.classList.remove('copiado');
        }, 2000);
      });
    }