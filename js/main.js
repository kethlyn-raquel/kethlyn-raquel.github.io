alert("JS carregou");
const lista = document.getElementById("lista-produtos");

// ================== ABRIR PRODUTOS ==================
function abrirSite() {
  const secaoProdutos = document.getElementById("produtos");

  secaoProdutos.style.display = "block";

  secaoProdutos.scrollIntoView({
    behavior: "smooth"
  });
}

// deixa a função acessível pro HTML
window.abrirSite = abrirSite;

// ================== CARREGAR PRODUTOS ==================
fetch("data/produtos.json")
  .then(res => res.json())
  .then(data => {
    criarCategoria("📄 Papelaria & Impressos", data.papelaria);
    criarCategoria("🎁 Personalizados", data.personalizados);
    criarCategoria("🎉 Eventos", data.eventos);
  })
  .catch(err => console.error("Erro ao carregar produtos:", err));

function criarCategoria(titulo, produtos) {
  const section = document.createElement("div");
  section.className = "category";

  section.innerHTML = `<h3>${titulo}</h3><div class="products"></div>`;
  const container = section.querySelector(".products");

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => contato(p.nome);

    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
      </div>
    `;

    container.appendChild(card);
  });

  lista.appendChild(section);
}

function contato(produto) {
  const msg = encodeURIComponent(`Oi! Tenho interesse no produto: ${produto}`);
  window.open(`https://wa.me/5555999712009?text=${msg}`, "_blank");
}
