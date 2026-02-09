const lista = document.getElementById("lista-produtos");

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
<div class="modal-content">
  <span class="close">×</span>
  <h3 id="m-nome"></h3>
  <p id="m-preco"></p>

  <button class="buy-btn" id="add">Adicionar</button>
  <div id="cart"></div>

  <div class="pix-box">
    <h4>💳 Pix</h4>
    <img id="pix-qrcode">
    <textarea id="pix-copia" readonly></textarea>
    <button class="buy-btn" id="copiarPix">Copiar Pix</button>
  </div>

  <button class="buy-btn" id="finalizar">Finalizar WhatsApp</button>
</div>`;
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
  const sec = document.createElement("section");
  sec.innerHTML = `<h2>${titulo}</h2><div class="products"></div>`;
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
      </div>`;
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
}

document.querySelector(".close").onclick = () => modal.style.display = "none";

document.getElementById("add").onclick = () => {
  carrinho.push(atual);
  atualizar();
};

function atualizar() {
  let total = 0;
  let texto = "Pedido Ketty Designer:%0A%0A";

  const cart = document.getElementById("cart");
  cart.innerHTML = "";

  carrinho.forEach(p => {
    cart.innerHTML += `<div>• ${p.nome}</div>`;
    texto += `• ${p.nome}%0A`;
    total += parseFloat(p.preco.replace("R$", "").replace(",", "."));
  });

  texto += `%0ATotal: R$ ${total.toFixed(2)}`;

  const pix =
`00020126360014BR.GOV.BCB.PIX011455999712009520400005303986540${total.toFixed(2)}5802BR5913KETHLYN RAQUEL6006QUARAI6304`;

  document.getElementById("pix-copia").value = pix;
  document.getElementById("pix-qrcode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(pix);

  document.getElementById("finalizar").onclick = () => {
    window.open(`https://wa.me/5555999712009?text=${texto}`);
  };
}

document.getElementById("copiarPix").onclick = () => {
  const campo = document.getElementById("pix-copia");
  campo.select();
  document.execCommand("copy");
  alert("Pix copiado!");
};
