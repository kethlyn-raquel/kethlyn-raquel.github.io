// ================= BOTÃO VER PRODUTOS =================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-ver-produtos");
  const produtos = document.getElementById("produtos");

  // Segurança: se não achar elementos, não quebra
  if (!btn || !produtos) return;

  btn.addEventListener("click", () => {
    produtos.style.display = "block";

    produtos.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ================= CARREGAR PRODUTOS DO JSON =================
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
  section.className = "category";

  section.innerHTML = `<h3>${titulo}</h3><div class="products"></div>`;
  const container = section.querySelector(".products");

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
      </div>
    `;

    card.addEventListener("click", () => contato(p.nome));

    container.appendChild(card);
  });

  lista.appendChild(section);
}

// ================= WHATSAPP =================
function contato(produto) {
  const msg = encodeURIComponent(`Oi! Tenho interesse no produto: ${produto}`);
  window.open(`https://wa.me/5555999712009?text=${msg}`, "_blank");
}
