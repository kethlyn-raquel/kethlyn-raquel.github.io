const lista = document.getElementById("lista-produtos");

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">×</span>
    <h3 id="m-nome"></h3>
    <p id="m-preco"></p>

    <div class="select-wrapper">
      <select id="m-var" class="select-premium"></select>
    </div>

    <button class="buy-btn" id="add">Adicionar</button>

    <div id="cart"></div>

    <div class="pix-box">
      Pix: SUA-CHAVE-PIX
    </div>

    <button class="buy-btn" id="finalizar">Finalizar WhatsApp</button>
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
      const o = document.createElement("option");
      o.value = t;
      o.innerText = t;
      sel.appendChild(o);
    });
  } else {
    const o = document.createElement("option");
    o.innerText = "Padrão";
    sel.appendChild(o);
  }
}

document.querySelector(".close").onclick = () => modal.style.display = "none";

document.getElementById("add").onclick = () => {
  carrinho.push({
    nome: atual.nome,
    variacao: document.getElementById("m-var").value
  });
  atualizar();
};

function atualizar() {
  const cart = document.getElementById("cart");
  cart.innerHTML = "";
  carrinho.forEach(p => {
    cart.innerHTML += `<div>• ${p.nome} (${p.variacao})</div>`;
  });
}

document.getElementById("finalizar").onclick = () => {
  let msg = "Pedido:%0A";
  carrinho.forEach(p => {
    msg += `- ${p.nome} (${p.variacao})%0A`;
  });
  window.open(`https://wa.me/5555999712009?text=${msg}`);
};

