document.getElementById("calorieForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const dados = obterDadosFormulario();

    if (!dados.age || !dados.weight || !dados.height) {
        document.getElementById("result").innerText = "Preencha todos os campos corretamente.";
        return; 
    }

    salvarDados(dados);
    const resultados = calcularCalorias(dados);
    exibirResultados(resultados);
});

document.getElementById("toggleTheme").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const botao = document.getElementById("toggleTheme");
    botao.textContent = document.body.classList.contains("dark-mode") 
        ? "☀️ Modo Claro"
        : "🌙 Modo Escuro";
});

window.addEventListener("DOMContentLoaded", function () {
    const campos = ["gender", "age", "weight", "height", "activity"];
    campos.forEach(id => {
        if (localStorage.getItem(id)) {
            document.getElementById(id).value = localStorage.getItem(id);
        }
    });
});

function obterDadosFormulario() {
    return {
        gender: document.getElementById("gender").value,
        age: parseInt(document.getElementById("age").value),
        weight: parseFloat(document.getElementById("weight").value),
        height: parseFloat(document.getElementById("height").value),
        activity: parseFloat(document.getElementById("activity").value)
    };
}

function salvarDados(dados) {
    for (let chave in dados) {
        localStorage.setItem(chave, dados[chave]);
    }
}

function calcularCalorias({ gender, age, weight, height, activity }) {
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += (gender === "male") ? 5 : -161;
    const manutencao = bmr * activity;

    return [
        Math.round(manutencao),
        Math.round(manutencao - 500),
        Math.round(manutencao + 500)
    ];
}

function exibirResultados([manter, perder, ganhar]) {
    document.getElementById("result").innerHTML = `
        <h2>Resultados:</h2>
        <p><strong>Manutenção:</strong> ${manter} calorias/dia</p>
        <p><strong>Perda de peso:</strong> ${perder} calorias/dia</p>
        <p><strong>Ganho de peso:</strong> ${ganhar} calorias/dia</p>
    `;
}