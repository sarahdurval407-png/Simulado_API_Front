const API = "http://localhost:3000";

const formulario = document.getElementById("formEvento");
const mensagem = document.getElementById("mensagem");


// Quando clicar em "Cadastrar"
formulario.addEventListener("submit", async function (event) {

    // Impede a página de recarregar
    event.preventDefault();


    // Pega os valores digitados
    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const local = document.getElementById("local").value.trim();
    const palestrante = document.getElementById("palestrante").value;


    // Verifica se todos os campos foram preenchidos
    if (!nome || !descricao || !local || !palestrante) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    try {

        // Envia os dados para a API
        const resposta = await fetch(`${API}/eventos`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                nome: nome,

                descricao: descricao,

                local: local,

                palestrantes: [
                    Number(palestrante)
                ]

            })

        });


        // Pega a resposta da API
        const dados = await resposta.json();


        // Se a API retornar algum erro
        if (!resposta.ok) {

            mensagem.textContent =
                dados.mensagem ||
                dados.message ||
                "Não foi possível cadastrar o evento.";

            mensagem.style.color = "red";

            return;
        }


        // Cadastro realizado
        mensagem.textContent =
            "Evento cadastrado com sucesso!";

        mensagem.style.color = "green";


        // Limpa os campos
        formulario.reset();


    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao conectar com a API.";

        mensagem.style.color = "red";
    }

});