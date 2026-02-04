// ================= BOTÃO VER PRODUTOS =================
const btn = document.getElementById("btn-produtos");
const hero = document.getElementById("hero");
const produtos = document.getElementById("produtos");

btn.addEventListener("click", () => {
  hero.style.display = "none";
  produtos.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================= CARREGAR PRODUTOS =================
const lista = document.getElementById("lista-produtos");

fetch("data/produtos.json")
  .then(res => res.json())
  .then(data => {
    criarCategoria("📄 Papelaria & Impressos", data.papelaria);
    criarCategoria("🎁 Personalizados", data.personalizados);
    criarCategoria("🎉 Eventos", data.eventos);
  });

function criarCategoria(titulo, produtos) {
  const section = document.createElement("div");
  section.className = "category hidden";

  section.innerHTML = `
    <h3>${titulo}</h3>
    <div class="products"></div>
  `;

  const container = section.querySelector(".products");

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card hidden";
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
  observer.observe(section);
}

// ================= WHATSAPP =================
function contato(produto) {
  const msg = encodeURIComponent(`Oi! Tenho interesse no produto: ${produto}`);
  window.open(`https://wa.me/5555999712009?text=${msg}`, "_blank");
}

// ================= ANIMAÇÕES =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });
