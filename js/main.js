const lista = document.getElementById("lista-produtos");

// ================= CARREGAR PRODUTOS =================
fetch("data/produtos.json")
  .then(res => {
    if (!res.ok) throw new Error("Erro ao carregar JSON");
    return res.json();
  })
  .then(data => {
    if (data.papelaria) {
      criarCategoria("📄 Papelaria & Impressos", data.papelaria);
    }

    if (data.personalizados) {
      criarCategoria("🎁 Personalizados", data.personalizados);
    }

    if (data.eventos) {
      criarCategoria("🎉 Eventos", data.eventos);
    }
  })
  .catch(err => {
    console.error("Erro:", err);
    lista.innerHTML = "<p>Não foi possível carregar os produtos.</p>";
  });

// ================= CRIAR CATEGORIA =================
function criarCategoria(titulo, produtos) {
  const section = document.createElement("section");
  section.classList.add("category");

  section.innerHTML = `
    <h3>${titulo}</h3>
    <div class="products"></div>
  `;

  const container = section.querySelector(".products");

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.addEventListener("click", () => contato(produto.nome));

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="info">
        <h4>${produto.nome}</h4>
        <div class="price">${produto.preco}</div>
      </div>
    `;

    container.appendChild(card);
  });

  lista.appendChild(section);
}

// ================= CONTATO WHATSAPP =================
function contato(produto) {
  const msg = encodeURIComponent(
    `Oi! Tenho interesse no produto: ${produto}`
  );

  window.open(
    `https://wa.me/5555999712009?text=${msg}`,
    "_blank"
  );
}
