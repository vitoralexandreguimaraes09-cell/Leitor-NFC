/*
========================================
DADOS
========================================
*/

let usuarioLogado =
    localStorage.getItem(
        "usuarioLogado"
    );


/*
========================================
FUNÇÕES DE DADOS
========================================
*/

function carregarUsuarios() {

    const dados =
        localStorage.getItem(
            "usuarios"
        );

    if (!dados) {
        return {};
    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(erro);

        return {};

    }

}


function salvarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}


function carregarAvaliacoes() {

    const dados =
        localStorage.getItem(
            "avaliacoes"
        );

    if (!dados) {
        return [];
    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(erro);

        return [];

    }

}


function salvarAvaliacoes(avaliacoes) {

    localStorage.setItem(
        "avaliacoes",
        JSON.stringify(avaliacoes)
    );

}


/*
========================================
NAVEGAÇÃO
========================================
*/

function mostrar(id) {

    const telas =
        document.querySelectorAll(
            ".tela"
        );

    telas.forEach(
        tela => {
            tela.classList.remove(
                "ativa"
            );
        }
    );


    const tela =
        document.getElementById(id);


    if (tela) {

        tela.classList.add(
            "ativa"
        );

    }


    if (id === "painel") {

        atualizarPainel();

    }


    if (id === "configuracoes") {

        atualizarConfiguracoes();

    }


    if (id === "avaliacoes") {

        carregarListaAvaliacoes();

    }

}


/*
========================================
CADASTRO
========================================
*/

function criarConta() {

    const nome =
        document
            .getElementById(
                "cadastroUsuario"
            )
            .value
            .trim();


    const senha =
        document
            .getElementById(
                "cadastroSenha"
            )
            .value;


    const mensagem =
        document.getElementById(
            "mensagemCadastro"
        );


    if (!nome || !senha) {

        mensagem.innerText =
            "❌ Preencha todos os campos.";

        return;

    }


    const usuarios =
        carregarUsuarios();


    if (usuarios[nome]) {

        mensagem.innerText =
            "❌ Esse usuário já existe.";

        return;

    }


    usuarios[nome] = {

        senha: senha

    };


    salvarUsuarios(
        usuarios
    );


    mensagem.innerText =
        "✅ Conta criada com sucesso!";


    document
        .getElementById(
            "cadastroUsuario"
        )
        .value = "";


    document
        .getElementById(
            "cadastroSenha"
        )
        .value = "";


    setTimeout(
        () => {

            mostrar("login");

        },
        1000
    );

}


/*
========================================
LOGIN
========================================
*/

function entrar() {

    const nome =
        document
            .getElementById(
                "loginUsuario"
            )
            .value
            .trim();


    const senha =
        document
            .getElementById(
                "loginSenha"
            )
            .value;


    const mensagem =
        document.getElementById(
            "mensagemLogin"
        );


    const usuarios =
        carregarUsuarios();


    if (
        usuarios[nome] &&
        usuarios[nome].senha === senha
    ) {

        usuarioLogado =
            nome;


        localStorage.setItem(
            "usuarioLogado",
            nome
        );


        mensagem.innerText =
            "✅ Login realizado!";


        setTimeout(
            () => {

                mostrar("painel");

            },
            500
        );

    }

    else {

        mensagem.innerText =
            "❌ Usuário ou senha incorretos.";

    }

}


/*
========================================
PAINEL
========================================
*/

function atualizarPainel() {

    const elemento =
        document.getElementById(
            "bemVindo"
        );


    if (usuarioLogado) {

        elemento.innerText =
            "Seja bem-vindo(a), " +
            usuarioLogado + "!";

    }

}


function atualizarConfiguracoes() {

    const elemento =
        document.getElementById(
            "usuarioAtual"
        );


    elemento.innerText =
        usuarioLogado || "Nenhum";

}


/*
========================================
LOGOUT
========================================
*/

function sair() {

    usuarioLogado = null;

    localStorage.removeItem(
        "usuarioLogado"
    );


    document
        .getElementById(
            "loginUsuario"
        )
        .value = "";


    document
        .getElementById(
            "loginSenha"
        )
        .value = "";


    mostrar("login");

}


/*
========================================
EXCLUIR CONTA
========================================
*/

function excluirConta() {

    if (!usuarioLogado) {

        return;

    }


    const senha =
        document
            .getElementById(
                "excluirSenha"
            )
            .value;


    const mensagem =
        document.getElementById(
            "mensagemExcluir"
        );


    const usuarios =
        carregarUsuarios();


    if (
        !usuarios[usuarioLogado] ||
        usuarios[usuarioLogado].senha !== senha
    ) {

        mensagem.innerText =
            "❌ Senha incorreta.";

        return;

    }


    const confirmacao =
        confirm(
            "Tem certeza que deseja excluir sua conta?"
        );


    if (!confirmacao) {

        mensagem.innerText =
            "Exclusão cancelada.";

        return;

    }


    delete usuarios[
        usuarioLogado
    ];


    salvarUsuarios(
        usuarios
    );


    localStorage.removeItem(
        "usuarioLogado"
    );


    usuarioLogado = null;


    mensagem.innerText =
        "✅ Conta excluída.";


    setTimeout(
        () => {

            mostrar("login");

        },
        1000
    );

}


/*
========================================
CALCULADORA
========================================
*/

function calcular() {

    const numero1 =
        Number(
            document
                .getElementById(
                    "numero1"
                )
                .value
        );


    const numero2 =
        Number(
            document
                .getElementById(
                    "numero2"
                )
                .value
        );


    const operacao =
        document
            .getElementById(
                "operacao"
            )
            .value;


    const resultado =
        document.getElementById(
            "resultado"
        );


    let valor;


    if (
        Number.isNaN(numero1) ||
        Number.isNaN(numero2)
    ) {

        resultado.innerText =
            "Digite dois números.";

        return;

    }


    switch (operacao) {

        case "+":

            valor =
                numero1 +
                numero2;

            break;


        case "-":

            valor =
                numero1 -
                numero2;

            break;


        case "*":

            valor =
                numero1 *
                numero2;

            break;


        case "/":

            if (numero2 === 0) {

                resultado.innerText =
                    "❌ Não é possível dividir por zero.";

                return;

            }

            valor =
                numero1 /
                numero2;

            break;

    }


    resultado.innerText =
        "Resultado: " +
        valor;

}


/*
========================================
AVALIAÇÕES
========================================
*/

function enviarAvaliacao() {

    if (!usuarioLogado) {

        return;

    }


    const nota =
        Number(
            document
                .getElementById(
                    "nota"
                )
                .value
        );


    const comentario =
        document
            .getElementById(
                "comentario"
            )
            .value
            .trim();


    const mensagem =
        document.getElementById(
            "mensagemAvaliacao"
        );


    if (
        nota < 1 ||
        nota > 10 ||
        !Number.isInteger(nota)
    ) {

        mensagem.innerText =
            "❌ A nota deve ser de 1 a 10.";

        return;

    }


    if (!comentario) {

        mensagem.innerText =
            "❌ Digite um comentário.";

        return;

    }


    const avaliacoes =
        carregarAvaliacoes();


    avaliacoes.push({

        nome:
            usuarioLogado,

        nota:
            nota,

        comentario:
            comentario

    });


    salvarAvaliacoes(
        avaliacoes
    );


    mensagem.innerText =
        "✅ Avaliação enviada!";


    document
        .getElementById(
            "nota"
        )
        .value = "";


    document
        .getElementById(
            "comentario"
        )
        .value = "";

}


/*
========================================
VER AVALIAÇÕES
========================================
*/

function verAvaliacoes() {

    mostrar(
        "avaliacoes"
    );

}


function carregarListaAvaliacoes() {

    const lista =
        document.getElementById(
            "listaAvaliacoes"
        );


    const avaliacoes =
        carregarAvaliacoes();


    lista.innerHTML = "";


    if (
        avaliacoes.length === 0
    ) {

        lista.innerHTML =
            "<p>Não há avaliações.</p>";

        return;

    }


    avaliacoes.forEach(
        avaliacao => {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "avaliacao";


            elemento.innerHTML =

                "<strong>" +
                escapeHTML(
                    avaliacao.nome
                ) +
                "</strong>" +

                "<div class='nota'>" +
                "⭐ " +
                avaliacao.nota +
                "/10" +
                "</div>" +

                "<p>" +
                escapeHTML(
                    avaliacao.comentario
                ) +
                "</p>";


            lista.appendChild(
                elemento
            );

        }
    );

}


/*
========================================
LIMPAR AVALIAÇÕES
========================================
*/

function limparAvaliacoes() {

    const confirmacao =
        confirm(
            "Tem certeza que deseja apagar todas as avaliações?"
        );


    if (!confirmacao) {

        return;

    }


    localStorage.removeItem(
        "avaliacoes"
    );


    carregarListaAvaliacoes();

}


/*
========================================
SEGURANÇA DO TEXTO
========================================
*/

function escapeHTML(texto) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        texto;


    return div.innerHTML;

}


/*
========================================
INÍCIO
========================================
*/

window.addEventListener(
    "load",
    () => {

        if (usuarioLogado) {

            mostrar("painel");

        }

        else {

            mostrar("login");

        }

    }
);
