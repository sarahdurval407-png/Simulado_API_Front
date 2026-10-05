const API = "http://localhost:3000";

const listaEventos = document.getElementById("listaEventos");

// Busca os eventos da API
async function carregarEventos() {
    try {
        const resposta = await fetch(`${API}/eventos`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os eventos.");
        }

        const eventos = await resposta.json();

        listaEventos.innerHTML = "";

        if (eventos.length === 0) {
            listaEventos.innerHTML = "<p>Nenhum evento cadastrado.</p>";
            return;
        }

        eventos.forEach(evento => {

            const card = document.createElement("div");

            card.classList.add("evento");

            card.innerHTML = `
                <p>
                    <strong>Nome:</strong>
                    ${evento.nome}
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${evento.descricao}
                </p>

                <p>
                    <strong>Local:</strong>
                    ${evento.local}
                </p>

                <div class="botoes">

                    <button onclick="editarEvento(${evento.id})">
                        Editar
                    </button>

                    <button onclick="excluirEvento(${evento.id})">
                        Excluir
                    </button>

                </div>
            `;

            listaEventos.appendChild(card);
        });

    } catch (erro) {

        console.error(erro);

        listaEventos.innerHTML = `
            <p class="erro">
                Não foi possível carregar os eventos.
            </p>
        `;
    }
}


// Editar evento
function editarEvento(id) {

    alert(`Editar evento ${id}`);

}


// Excluir evento
async function excluirEvento(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este evento?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(`${API}/eventos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir evento.");
        }

        alert("Evento excluído com sucesso!");

        carregarEventos();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível excluir o evento.");
    }
}


// Carrega os eventos ao abrir a página
carregarEventos();