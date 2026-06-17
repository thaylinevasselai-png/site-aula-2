document.addEventListener('DOMContentLoaded', () => {
    const btnCheck = document.getElementById('btnCheck');
    const quizResult = document.getElementById('quizResult');

    btnCheck.addEventListener('click', () => {
        const passos = [
            "1. Quem publicou? Verifique se a fonte é um veículo de imprensa conhecido ou um perfil oficial.",
            "2. Procure no Google: Se a notícia for real, outros sites de confiança também estarão falando sobre ela.",
            "3. Olhe a data: Muitas notícias velhas são compartilhadas como se fossem novas para gerar pânico.",
            "4. Desconfie do alarmismo: Títulos que geram muito medo ou raiva geralmente são fakes.",
            "💡 Lembre-se: Na dúvida, não compartilhe!"
        ];

        quizResult.innerHTML = passos.map(passo => `<p style="margin-bottom: 0.8rem;">${passo}</p>`).join('');
        quizResult.classList.remove('hidden');
        btnCheck.textContent = "Verificar Novamente";
    });
});
