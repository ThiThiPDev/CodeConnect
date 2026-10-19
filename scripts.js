// Carregamento da imagem
const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-image");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);

            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro na leitura do arquivo")
        }
    }
})


// Gerenciamento das tags
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

const tagsDisponiveis = ["Front-End", "Programação", "Data Science", "Full-Stack", "HTML", "CSS", "JavaScript", "Back-End", "VS Code"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;

        listaTags.removeChild(tagQueQueremosRemover);
    }
})

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();

        const tagTexto = inputTags.value.trim();

        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);

                if (tagExiste) {
                    const tagsAdicionadas = Array.from(
                        listaTags.querySelectorAll("p")
                    ).map((tag) => tag.textContent.toLowerCase());

                    if (tagsAdicionadas.includes(tagTexto.toLowerCase())) {
                        alert("Essa tag já foi adicionada!");
                        return;
                    }

                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não identificada.");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag.");
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})


// Limpeza do formulário
function limparFormulario() {
    const formulario = document.querySelector("form");

    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    inputUpload.value = "";
    listaTags.innerHTML = "";

    contadorNome.textContent = "0/50 caracteres";
    contadorDescricao.textContent = "0/395 caracteres";
}


// Publicação do projeto
const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const imagemSelecionada = inputUpload.files.length > 0;

            if (
                imagemSelecionada &&
                nomeDoProjeto.trim() !== "" &&
                descricaoProjeto.trim() !== "" &&
                tagsProjeto.length > 0
            ) {
                resolve("Projeto publicado com sucesso.");
            } else {
                reject("Preencha todos os campos obrigatórios.");
            }
        }, 2000);
    });
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;

    const tagsProjeto = Array.from(
        listaTags.querySelectorAll("p")
    ).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(
            nomeDoProjeto,
            descricaoDoProjeto,
            tagsProjeto
        );

        console.log(resultado);
        alert("Projeto publicado com sucesso!");

        limparFormulario();

    } catch (error) {
        console.log("Deu errado: ", error);
        alert(error);
    }
});


// Descarte do projeto
const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();
    limparFormulario();
});

const campoNome = document.getElementById("nome");
const campoDescricao = document.getElementById("descricao");

const contadorNome = document.getElementById("contador-nome");
const contadorDescricao = document.getElementById("contador-descricao");

// Atualiza os contadores enquanto a pessoa digita
campoNome.addEventListener("input", () => {
    contadorNome.textContent = `${campoNome.value.length}/50 caracteres`;
});

campoDescricao.addEventListener("input", () => {
    contadorDescricao.textContent = `${campoDescricao.value.length}/395 caracteres`;
});

// Define os valores iniciais dos contadores
contadorNome.textContent = "0/50 caracteres";
contadorDescricao.textContent = "0/395 caracteres";

const botaoMenu = document.querySelector(".menu-hamburguer");
const menu = document.querySelector(".menu");

botaoMenu.addEventListener("click", () => {
    const menuAberto = menu.classList.toggle("ativo");

    botaoMenu.setAttribute("aria-expanded", menuAberto);
});