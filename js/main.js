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

    // ===== TEXTO DE ESTOQUE =====
    let estoqueTexto = "";
    let estoqueClasse = "";

    if (p.estoque === 0) {
      estoqueTexto = "❌ Esgotado";
      estoqueClasse = "esgotado";
    } else if (p.estoque <= 5) {
      estoqueTexto = `🔥 Últimas unidades! (${p.estoque})`;
      estoqueClasse = "alerta";
    } else {
      estoqueTexto = `Disponível: ${p.estoque}`;
    }

    // ===== SELECT DE TAMANHOS =====
    let selectHTML = "";
    if (p.variacoes && p.variacoes.tamanhos) {
      selectHTML = `
        <select class="variacao">
          <option value="">Selecione o tamanho</option>
          ${p.variacoes.tamanhos
            .map(t => `<option value="${t}">${t}</option>`)
            .join("")}
        </select>
      `;
    }

    card.innerHTML = `
      ${p.novidade ? `<span class="badge">Novidade ✨</span>` : ""}
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>

        ${selectHTML}

        <div class="stock ${estoqueClasse}">${estoqueTexto}</div>

        <button class="buy-btn" ${p.estoque === 0 ? "disabled" : ""}>
          ${p.estoque === 0 ? "Indisponível" : "Comprar"}
        </button>
      </div>
    `;

    // ===== BOTÃO COMPRAR =====
    const btnComprar = card.querySelector(".buy-btn");

    btnComprar.addEventListener("click", (e) => {
      e.stopPropagation();

      if (p.estoque === 0) {
        alert("Produto esgotado 😞");
        return;
      }

      let tamanhoEscolhido = "";
      const select = card.querySelector(".variacao");

      if (select) {
        if (select.value === "") {
          alert("Selecione o tamanho antes de continuar 🙂");
          return;
        }
        tamanhoEscolhido = select.value;
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
  if (tamanho) msg += ` | Tamanho: ${tamanho}`;

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
