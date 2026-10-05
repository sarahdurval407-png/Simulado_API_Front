const API_URL = "http://localhost:3000";

const formulario = document.getElementById("formPalestrante");
const mensagem = document.getElementById("mensagem");


formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();


    // Verifica os campos

    if (!nome || !email) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    try {

        const resposta = await fetch(
            `${API_URL}/palestrantes`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            }
        );


        const dados = await resposta.json();


        // Se a API retornar erro

        if (!resposta.ok) {

            mensagem.textContent =
                dados.mensagem || "Erro ao cadastrar palestrante.";

            mensagem.style.color = "red";

            return;
        }


        // Cadastro realizado

        mensagem.textContent =
            "Palestrante cadastrado com sucesso!";

        mensagem.style.color = "green";


        // Limpa os campos

        formulario.reset();


    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Não foi possível conectar com a API.";

        mensagem.style.color = "red";
    }

});