
const perfis = [
    {
        id: 1,
        nome: "Engenheira",
        categoria: "Construção",
        descricao: "Gosta de resolver problemas e criar soluções.",
        imagem: "img/perfil1.png",
        recomendacao: "Ajude a equipe consertando a nave e criando equipamentos."
    },
    {
        id: 2,
        nome: "Cientista",
        categoria: "Investigação",
        descricao: "Gosta de pesquisar e descobrir coisas novas.",
        imagem: "img/perfil2.png",
        recomendacao: "Investigue o planeta e analise suas descobertas."
    },
    {
        id: 3,
        nome: "Explorador",
        categoria: "Exploração",
        descricao: "Gosta de aventuras e lugares desconhecidos.",
        imagem: "img/perfil3.png",
        recomendacao: "Explore o planeta e encontre novos recursos."
    },
    {
        id: 4,
        nome: "Capitão da Missão",
        categoria: "Planejamento",
        descricao: "Gosta de organizar tarefas e tomar decisões.",
        imagem: "img/perfil4.png",
        recomendacao: "Organize a equipe e planeje a expedição."
    }
];

const formulario = document.getElementById("formulario");
const hoje = new Date();
const dataHoje = hoje.toISOString().split("T")[0];

document.getElementById("nascimento").max = dataHoje;

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const erro = document.getElementById("mensagemErro");

    if (nome === "" || nascimento === "") {
        erro.textContent = "Preencha todos os campos!";
        return;
    }

    if (nascimento > dataHoje) {
        erro.textContent = "A data não pode ser futura!";
        return;
    }

    const dataNasc = new Date(nascimento + "T12:00:00");

    let idade = hoje.getFullYear() - dataNasc.getFullYear();

    if (
        hoje.getMonth() < dataNasc.getMonth() ||
        (hoje.getMonth() === dataNasc.getMonth() &&
         hoje.getDate() < dataNasc.getDate())
    ) {
        idade--;
    }

    const pontos = [0, 0, 0, 0];

    for (let i = 1; i <= 4; i++) {
        const resposta = document.querySelector(
            `input[name="p${i}"]:checked`
        );

        if (!resposta) {
            erro.textContent = "Responda todas as perguntas!";
            return;
        }

        pontos[Number(resposta.value)]++;
    }

    const maior = Math.max(...pontos);
    const vencedores = [];

    for (let i = 0; i < pontos.length; i++) {
        if (pontos[i] === maior) {
            vencedores.push(perfis[i]);
        }
    }

    const perfil = vencedores[0];

    document.getElementById("saudacao").textContent =
        `Olá, ${nome}! Você tem ${idade} anos.`;

    document.getElementById("nomePerfil").textContent = perfil.nome;

    document.getElementById("categoriaPerfil").textContent =
        "Categoria: " + perfil.categoria;

    document.getElementById("descricaoPerfil").textContent =
        perfil.descricao;


    const imagem = document.getElementById("imagemPerfil");
    imagem.style.display = "block";
    imagem.src = perfil.imagem;
    imagem.alt = perfil.nome;

    imagem.onerror = function() {
        this.style.display = "none";
    };

    if (vencedores.length > 1) {
        document.getElementById("mensagemEmpate").textContent =
            "Houve empate entre " +
            vencedores.map(p => p.nome).join(", ") +
            ". Um dos perfis empatados foi escolhido como destaque.";
    } else {
        document.getElementById("mensagemEmpate").textContent = "";
    }

    erro.textContent = "";
    document.getElementById("telaTeste").hidden = true;
    document.getElementById("telaResultado").hidden = false;
});

document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();

    document.getElementById("telaResultado").hidden = true;
    document.getElementById("telaTeste").hidden = false;
    document.getElementById("mensagemErro").textContent = "";
});
