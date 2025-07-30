document.addEventListener('DOMContentLoaded', () => {
    const listaProdutosEl = document.getElementById('lista-produtos');

    // Mostra um feedback de carregamento enquanto os produtos não chegam
    if (listaProdutosEl) {
        listaProdutosEl.innerHTML = '<p class="text-center">Carregando produtos...</p>';
    }

    /**
     * Busca os produtos da Fake Store API.
     */
    async function fetchProdutos() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error(`Erro na rede! Status: ${response.status}`);
            }
            const produtos = await response.json();
            displayProdutos(produtos);
        } catch (error) {
            console.error("Falha ao buscar os produtos:", error);
            if (listaProdutosEl) {
                listaProdutosEl.innerHTML = '<p class="text-center text-danger">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
            }
        }
    }

    /**
     * Cria e exibe os cards dos produtos na página.
     * @param {Array} produtos - A lista de produtos vinda da API.
     */
    function displayProdutos(produtos) {
        if (!listaProdutosEl) return;

        listaProdutosEl.innerHTML = ''; // Limpa a mensagem de "Carregando..."

        produtos.forEach(produto => {
            // Cria um card do Bootstrap para cada produto
            const cardHtml = `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <img src="${produto.image}" class="card-img-top p-3" alt="${produto.title}" style="height: 320px; object-fit: contain;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${produto.title}</h5>
                            <p class="card-text text-muted">${produto.category}</p>
                            <p class="card-text fs-4 fw-bold mt-2">R$ ${produto.price.toFixed(2).replace('.', ',')}</p>
                            <a href="#" class="btn btn-primary mt-auto">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            `;
            listaProdutosEl.innerHTML += cardHtml;
        });
    }

    // Inicia o processo de busca e exibição dos produtos
    fetchProdutos();
});