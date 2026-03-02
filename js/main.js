const lista = document.getElementById("lista-produtos");

// Carregar Produtos
fetch("data/produtos.json")
  .then(r => r.json())
  .then(d => {
    // Organiza as seções com ícones e títulos profissionais
    criar("Papelaria Profissional", d.papelaria);
    criar("Itens Personalizados", d.personalizados);
    criar("Materiais para Eventos", d.eventos);
  });

function criar(titulo, produtos) {
  const sec = document.createElement("div");
  sec.innerHTML = `<h3>${titulo}</h3><div class="products"></div>`;
  const grid = sec.querySelector(".products");

  produtos.forEach(p => {
    const c = document.createElement("div");
    c.className = "card";

    c.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
        <p class="descricao">${p.descricao || 'Personalize com sua arte ou fotos exclusivas.'}</p>
        <button class="buy-btn">Pedir Orçamento</button>
      </div>
    `;

    c.querySelector(".buy-btn").onclick = () => {
      const mensagem = `Olá Ketty! Gostaria de um orçamento para: ${p.nome} (${p.preco})`;
      window.open(`https://wa.me/5555999712009?text=${encodeURIComponent(mensagem)}`);
    };

    grid.appendChild(c);
  });

  lista.appendChild(sec);
}
