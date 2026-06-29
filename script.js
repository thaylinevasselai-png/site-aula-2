// ==========================================
// 1. ACESSIBILIDADE - MODO ESCURO
// ==========================================
const btnAcessibilidade = document.getElementById('btn-acessibilidade');
btnAcessibilidade.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ==========================================
// 2. IDENTIFICADORES DE VERACIDADE (BIOMETRIA)
// ==========================================
const btnScanFace = document.getElementById('btn-scan-face');
const videoFeed = document.getElementById('video-feed');
const resultadoFace = document.getElementById('resultado-face');

const btnScanVoz = document.getElementById('btn-scan-voz');
const visualizerVoz = document.getElementById('audio-visualizer');
const resultadoVoz = document.getElementById('resultado-voz');

// Limpa classes extras de feedback de cor
function resetarCoresStatus(elemento) {
    elemento.classList.remove('cor-erro', 'cor-sucesso');
}

// Scanner Facial Real + Análise Simulada
btnScanFace.addEventListener('click', async () => {
    resetarCoresStatus(resultadoFace);
    resultadoFace.textContent = "🔄 Acessando câmera e analisando malha facial...";
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoFeed.srcObject = stream;
        
        setTimeout(() => {
            const confiabilidade = Math.floor(Math.random() * 40) + 60; // 60% a 99%
            const isDeepfake = confiabilidade < 75;

            if (isDeepfake) {
                resultadoFace.innerHTML = `⚠️ Alerta: Confiabilidade de ${confiabilidade}%. Padrões de iluminação inconsistentes e artefatos piscantes detectados nas bordas dos olhos. Possível Deepfake!`;
                resultadoFace.classList.add('cor-erro');
            } else {
                resultadoFace.innerHTML = `✅ Sucesso: Confiabilidade de ${confiabilidade}%. Textura de pele íntegra e fluxo de movimento biométrico validado. Face Humana Real.`;
                resultadoFace.classList.add('cor-sucesso');
            }
        }, 3000);

    } catch (err) {
        resultadoFace.textContent = "❌ Permissão de câmera negada ou dispositivo indisponível. Simulando análise estática: Captura íntegra.";
        resultadoFace.classList.add('cor-erro');
    }
});

// Scanner de Voz Real + Análise Simulada
btnScanVoz.addEventListener('click', async () => {
    resetarCoresStatus(resultadoVoz);
    resultadoVoz.textContent = "🎙️ Escutando ruídos de compressão e frequências neurais...";
    visualizerVoz.classList.add('animando');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        setTimeout(() => {
            visualizerVoz.classList.remove('animando');
            stream.getTracks().forEach(track => track.stop());

            const repetibilidadeMetrica = Math.floor(Math.random() * 100);
            
            if (repetibilidadeMetrica > 50) {
                resultadoVoz.innerHTML = "🔴 Sintetizador de Voz Detectado! Ausência de micro-aspirações humanas normais e espectro de áudio artificialmente linear.";
                resultadoVoz.classList.add('cor-erro');
            } else {
                resultadoVoz.innerHTML = "🟢 Voz Humana Autêntica! Frequência harmônica natural e variações orgânicas de timbre validadas.";
                resultadoVoz.classList.add('cor-sucesso');
            }
        }, 3500);

    } catch (err) {
        visualizerVoz.classList.remove('animando');
        resultadoVoz.textContent = "❌ Microfone desativado. Ative as permissões para o teste interativo completo.";
        resultadoVoz.classList.add('cor-erro');
    }
});

// ==========================================
// 3. JOGO / QUIZ ANTI-DESINFORMAÇÃO
// ==========================================
const perguntasQuiz = [
    {
        texto: "Um vídeo mostra um líder político declarando guerra em tom robótico, mas nenhum grande portal de notícias publicou o fato. O que é?",
        resposta: "DEEPFAKE",
        explicacao: "Vídeos isolados com declarações bombásticas sem cobertura jornalística profissional são indícios claros de manipulação digital por IA."
    },
    {
        texto: "Um áudio de WhatsApp do seu tio avisa que o governo vai mudar as cores da bandeira amanhã, usando um link de um blog desconhecido.",
        resposta: "DEEPFAKE",
        explicacao: "Desinformação automatizada costuma usar canais informais e links obscuros para espalhar pânico e boatos falsos rapidamente."
    },
    {
        texto: "O site oficial da Organização Mundial da Saúde publica um relatório em texto e PDF assinado por cientistas sobre novas diretrizes.",
        resposta: "REAL",
        explicacao: "Canais institucionais e verificados com documentos técnicos assinados representam fontes seguras de cidadania e informação."
    }
];

let indiceAtual = 0;
let acertos = 0;

const elementoTextoPergunta = document.getElementById('texto-pergunta');
const elementoPerguntaAtual = document.getElementById('pergunta-atual');
const blocoPergunta = document.getElementById('bloco-pergunta');
const resultadoQuiz = document.getElementById('resultado-quiz');
const placarFinal = document.getElementById('placar-final');
const feedbackFinal = document.getElementById('feedback-final');
const btnReiniciar = document.getElementById('btn-reiniciar');
const botoesOpcao = document.querySelectorAll('.btn-opcao');

function carregarPergunta() {
    if (indiceAtual < perguntasQuiz.length) {
        elementoPerguntaAtual.textContent = indiceAtual + 1;
        elementoTextoPergunta.textContent = perguntasQuiz[indiceAtual].texto;
    } else {
        mostrarResultadoFinal();
    }
}

// Corrigido para currentTarget para evitar erros de clique nos emojis internos
botoesOpcao.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const escolhaUsuario = e.currentTarget.getAttribute('data-escolha');
        const questaoAtual = perguntasQuiz[indiceAtual];

        if (escolhaUsuario === questaoAtual.resposta) {
            acertos++;
            alert(`🎉 Correto!\n\n${questaoAtual.explicacao}`);
        } else {
            alert(`❌ Incorreto!\n\n${questaoAtual.explicacao}`);
        }

        indiceAtual++;
        carregarPergunta();
    });
});

function mostrarResultadoFinal() {
    blocoPergunta.classList.add('escondido');
    resultadoQuiz.classList.remove('escondido');
    placarFinal.textContent = `Você acertou ${acertos} de ${perguntasQuiz.length} perguntas.`;
    
    const aproveitamento = (acertos / perguntasQuiz.length) * 100;
    if (aproveitamento === 100) {
        feedbackFinal.textContent = "🥇 Excelente! Você é um mestre da Cidadania Digital e sabe combater as deepfakes!";
    } else if (aproveitamento >= 66) {
        feedbackFinal.textContent = "👏 Muito bom! Você possui olhos atentos, mas continue praticando a checagem de mídias.";
    } else {
        feedbackFinal.textContent = "📚 Atenção! Você precisa estudar mais os conceitos de mídias manipuladas para não cair em golpes digitais.";
    }
}

btnReiniciar.addEventListener('click', () => {
    indiceAtual = 0;
    acertos = 0;
    blocoPergunta.classList.remove('escondido');
    resultadoQuiz.classList.add('escondido');
    carregarPergunta();
});

carregarPergunta();
