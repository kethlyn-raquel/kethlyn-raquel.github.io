const btn = document.getElementById("btn-ver-produtos");
const conteudo = document.getElementById("conteudo");
const lista = document.getElementById("lista-produtos");

btn.onclick = () => {
  document.getElementById("hero").style.display = "none";
  conteudo.style.display = "block";
};

fetch("data/produtos.json")
  .then(r => r.json())
  .then(d => {
    criar("📄 Papelaria", d.papelaria);
    criar("🎁 Personalizados", d.personalizados);
    criar("🎉 Eventos", d.eventos);
  });

function criar(titulo, produtos) {
  const sec = document.createElement("div");
  sec.innerHTML = `<h3>${titulo}</h3><div class="products"></div>`;
  const grid = sec.querySelector(".products");

  produtos.forEach(p => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `
      <img src="${p.imagem}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
        <button class="buy-btn">Comprar</button>
      </div>
    `;
    c.querySelector("button").onclick = () => {
      window.open(`https://wa.me/5555999712009?text=Olá! Tenho interesse no produto: ${p.nome}`);
    };
    grid.appendChild(c);
  });

  lista.appendChild(sec);
}
