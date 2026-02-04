// ================= CONFIG =================
const lista = document.getElementById("lista-produtos");
const btnVerProdutos = document.getElementById("btn-ver-produtos");
const hero = document.getElementById("hero");
const produtosSecao = document.getElementById("produtos");

// ================= HERO → PRODUTOS =================
if (btnVerProdutos) {
  btnVerProdutos.addEventListener("click", () => {
    produtosSecao.style.display = "block"; // garante que a seção apareça
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
  .catch(err => {
    console.error("Erro ao carregar produtos:", err);
  });

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

    // Conteúdo do card com estoque
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
        <div class="stock">${p.estoque > 0 ? 'Disponível: ' + p.estoque : 'Esgotado'}</div>
      </div>
    `;

    // Cor do estoque
    const stockDiv = card.querySelector(".stock");
    if (p.estoque === 0) stockDiv.style.color = "red";

    // Clique seguro: mobile + desktop
    card.addEventListener("click", () => {
      if (p.estoque === 0) {
        alert("Produto esgotado 😞");
      } else {
        contato(p.nome);
      }
    });

    container.appendChild(card);
  });

  lista.appendChild(section);
}

// ================= WHATSAPP =================
function contato(produto) {
  const msg = encodeURIComponent(`Oi! Tenho interesse no produto: ${produto}`);
  window.open(`https://wa.me/5555999712009?text=${msg}`, "_blank");
}

// ================= ANIMAÇÕES =================
function ativarAnimacoes() {
  const elementos = document.querySelectorAll(".card, .testimonial-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elementos.forEach(el => observer.observe(el));
}
