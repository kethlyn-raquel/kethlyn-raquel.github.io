// ================= CONFIG =================
const lista = document.getElementById("lista-produtos");
const btnVerProdutos = document.getElementById("btn-ver-produtos");
const produtosSecao = document.getElementById("produtos");

// ================= HERO → PRODUTOS =================
if (btnVerProdutos) {
  btnVerProdutos.addEventListener("click", () => {
    produtosSecao.style.display = "block";
    window.scrollTo({
      top: produtosSecao.offsetTop,
      behavior: "smooth"
    });
  });
}

// ================= CARREGAR PRODUTOS =================
fetch("data/produtos.json")
  .then(res => res.json())
  .then(data => {
    criarCategoria("📄 Papelaria & Impressos", data.papelaria);
    criarCategoria("🎁 Personalizados", data.personalizados);
    criarCategoria("🎉 Eventos", data.eventos);
    ativarAnimacoes();
  })
  .catch(err => console.error("Erro ao carregar produtos:", err));

// ================= CRIAR CATEGORIA =================
function criarCategoria(titulo, produtos) {
  const section = document.createElement("div");
  section.className = "category";

  section.innerHTML = `
    <h3>${titulo}</h3>
    <div class="products"></div>
  `;

  const container = section.querySelector(".products");

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card hidden";

    if (p.estoque === 0) {
      card.classList.add("esgotado");
    }

    // TEXTO DE ESTOQUE
    let estoqueTexto = "";
    if (p.estoque === 0) {
      estoqueTexto = "❌ Esgotado";
    } else if (p.estoque <= 5) {
      estoqueTexto = `🔥 Últimas unidades! (${p.estoque})`;
    } else {
      estoqueTexto = `Disponível: ${p.estoque}`;
    }

    card.innerHTML = `
      ${p.novidade ? `<span class="badge">Novidade ✨</span>` : ""}
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
        <div class="stock">${estoqueTexto}</div>
      </div>
    `;

    // CLIQUE NO PRODUTO
    card.addEventListener("click", () => {
      if (p.estoque === 0) {
        alert("Produto esgotado 😞");
        return;
      }

      let tamanhoEscolhido = "";

      if (p.variacoes && p.variacoes.tamanhos) {
        tamanhoEscolhido = prompt(
          `Escolha o tamanho:\n${p.variacoes.tamanhos.join(" | ")}`
        );

        if (!tamanhoEscolhido) return;
      }

      contato(p.nome, tamanhoEscolhido);
    });

    container.appendChild(card);
  });

  lista.appendChild(section);
}

// ================= WHATSAPP =================
function contato(produto, tamanho = "") {
  let msg = `Oi! Tenho interesse no produto: ${produto}`;

  if (tamanho) {
    msg += ` | Tamanho: ${tamanho}`;
  }

  window.open(
    `https://wa.me/5555999712009?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

// ================= ANIMAÇÕES =================
function ativarAnimacoes() {
  const elementos = document.querySelectorAll(".card, .testimonial-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
}
