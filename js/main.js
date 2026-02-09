const lista = document.getElementById("lista-produtos");
const btn = document.getElementById("btn-ver-produtos");
const produtosSecao = document.getElementById("produtos");

btn.onclick = () => {
  produtosSecao.style.display = "block";
  produtosSecao.scrollIntoView({ behavior: "smooth" });
};

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">×</span>
    <h3 id="m-nome"></h3>
    <p id="m-preco"></p>
    <select id="m-var" class="select-premium"></select>
    <button class="buy-btn" id="add">Adicionar</button>
    <div id="cart"></div>
    <button class="buy-btn" id="finalizar">Finalizar no WhatsApp</button>
  </div>
`;
document.body.appendChild(modal);

let carrinho = [];
let atual = null;

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
    c.querySelector("button").onclick = () => abrir(p);
    grid.appendChild(c);
  });

  lista.appendChild(sec);
}

function abrir(p) {
  atual = p;
  modal.style.display = "flex";
  document.getElementById("m-nome").innerText = p.nome;
  document.getElementById("m-preco").innerText = p.preco;

  const sel = document.getElementById("m-var");
  sel.innerHTML = "";

  if (p.variacoes?.tamanhos) {
    p.variacoes.tamanhos.forEach(t => {
      sel.innerHTML += `<option>${t}</option>`;
    });
  } else {
    sel.innerHTML = `<option>Padrão</option>`;
  }
}

document.querySelector(".close").onclick = () => modal.style.display = "none";

document.getElementById("add").onclick = () => {
  carrinho.push({
    nome: atual.nome,
    var: document.getElementById("m-var").value
  });
  atualizar();
};

function atualizar() {
  const cart = document.getElementById("cart");
  cart.innerHTML = carrinho.map(i => `• ${i.nome} (${i.var})`).join("<br>");
}

document.getElementById("finalizar").onclick = () => {
  let msg = "Olá! Quero fazer um pedido:%0A";
  carrinho.forEach(i => msg += `- ${i.nome} (${i.var})%0A`);
  window.open(`https://wa.me/5555999712009?text=${msg}`);
};
