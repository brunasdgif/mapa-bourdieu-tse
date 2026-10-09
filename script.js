// Seleção dos elementos do DOM
const form = document.getElementById('bourdieu-form');
const quizCard = document.getElementById('quiz-card');
const resultCard = document.getElementById('result-card');
const analiseTexto = document.getElementById('analise-texto');
const btnReiniciar = document.getElementById('btn-reiniciar');

let chartInstance = null;

// Dados de referência histórica / sociológica para plotar junto com o usuário
const perfisReferencia = [
  { label: 'Classes Populares (Tendência Esquerda)', x: -6, y: 1.5, color: '#ef4444' },
  { label: 'Classe Média Baixa (Indecisos/Centro)', x: 0, y: 3.5, color: '#eab308' },
  { label: 'Classe Média Alta (Tendência Direita)', x: 5, y: 6.5, color: '#3b82f6' },
  { label: 'Alta Finança / Proprietários', x: 8, y: 9.0, color: '#10b981' }
];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // 1. Obter valores do formulário
  const renda = parseFloat(document.getElementById('renda').value);
  const patrimonio = parseFloat(document.getElementById('patrimonio').value);
  const orientacaoPolitica = parseFloat(document.getElementById('orientacao').value);

  // 2. Calcular Capital Financeiro (Eixo Y: escala de 0 a 10)
  const capitalFinanceiro = ((renda + patrimonio) / 8) * 10;

  // 3. Alternar visibilidade
  quizCard.classList.add('hidden');
  resultCard.classList.remove('hidden');

  // 4. Gerar Análise em Texto
  gerarAnaliseTexto(orientacaoPolitica, capitalFinanceiro);

  // 5. Renderizar Gráfico 2D no Canvas
  renderizarGrafico(orientacaoPolitica, capitalFinanceiro);
});

function gerarAnaliseTexto(x, y) {
  let texto = "";

  if (y >= 6 && x > 2) {
    texto = "<strong>Fração Dominante (Alinhamento Conservador/Liberal):</strong> Alto Capital Financeiro acompanhado de preferência por políticas de livre mercado. Segundo Bourdieu, o acúmulo econômico tende a buscar a preservação das estruturas de propriedade.";
  } else if (y >= 6 && x <= 2) {
    texto = "<strong>Fração Culturalmente Progressista de Alta Renda:</strong> Alto Capital Financeiro, mas com voto voltado à Esquerda/Centro-Esquerda. Representa setores intelectuais ou urbanos com forte acúmulo de Capital Cultural.";
  } else if (y < 6 && x > 2) {
    texto = "<strong>Classe Média/Trabalhadora com Voto à Direita:</strong> Capital Financeiro moderado ou baixo com alinhamento à Direita. A análise sociológica aponta forte influência do Capital Social, valores religiosos ou pautas morais.";
  } else {
    texto = "<strong>Classes Populares / Esquerda Social:</strong> Menor acúmulo de Capital Financeiro com foco de voto em políticas de redistribuição de renda e seguridade social pública.";
  }

  analiseTexto.innerHTML = texto;
}

function renderizarGrafico(userX, userY) {
  const ctx = document.getElementById('bourdieuChart').getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'VOCÊ',
          data: [{ x: userX, y: userY }],
          backgroundColor: '#f43f5e',
          pointRadius: 12,
          pointHoverRadius: 14,
          order: 1
        },
        ...perfisReferencia.map(p => ({
          label: p.label,
          data: [{ x: p.x, y: p.y }],
          backgroundColor: p.color,
          pointRadius: 6,
          order: 2
        }))
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          min: -10,
          max: 10,
          title: { 
            display: true, 
            text: '← ESQUERDA | Espectro Político / Voto | DIREITA →', 
            color: '#94a3b8' 
          },
          grid: { color: '#334155' }
        },
        y: {
          min: 0,
          max: 10,
          title: { 
            display: true, 
            text: 'Capital Financeiro / Patrimônio (0 a 10) ↑', 
            color: '#94a3b8' 
          },
          grid: { color: '#334155' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#f8fafc', font: { size: 11 } }
        }
      }
    }
  });
}

btnReiniciar.addEventListener('click', () => {
  resultCard.classList.add('hidden');
  quizCard.classList.remove('hidden');
});