const lista = document.getElementById("lista-produtos");

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

  <div class="pix-box">
    <h4>💳 Pix</h4>
    <img id="pix-qrcode">
    <input id="pix-copia" readonly>
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

  const sel = document.getElementById("m-var");
  sel.innerHTML = "";

  if (p.variacoes?.tamanhos) {
    p.variacoes.tamanhos.forEach(t => {
      sel.innerHTML += `<option>${t}</option>`;
    });
  } else {
    sel.innerHTML = "<option>Padrão</option>";
  }
}

document.querySelector(".close").onclick = () => modal.style.display = "none";

function gerarPix(valor) {
  const chave = "55999712009";
  const nome = "KETHLYN RAQUEL";
  const cidade = "QUARAI";

  let payload =
`00020126360014BR.GOV.BCB.PIX0114${chave}52040000530398654${valor.toFixed(2).length}${valor.toFixed(2)}5802BR59${nome.length}${nome}60${cidade.length}${cidade}6304`;

  payload += crc16(payload);
  return payload;
}

function crc16(str) {
  let crc = 0xFFFF;
  for (let c of str) {
    crc ^= c.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++)
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
  }
  return (crc & 0xFFFF).toString(16).toUpperCase();
}

document.getElementById("add").onclick = () => {
  carrinho.push(atual);
  atualizar();
};

function atualizar() {
  let total = 0;
  const cart = document.getElementById("cart");
  cart.innerHTML = "";

  carrinho.forEach(p => {
    cart.innerHTML += `<div>• ${p.nome}</div>`;
    total += parseFloat(p.preco.replace("R$", "").replace(",", "."));
  });

  const pix = gerarPix(total);
  document.getElementById("pix-copia").value = pix;
  document.getElementById("pix-qrcode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + pix;
};

document.getElementById("copiarPix").onclick = () => {
  navigator.clipboard.writeText(document.getElementById("pix-copia").value);
  alert("Pix copiado!");
};

document.getElementById("finalizar").onclick = () => {
  window.open("https://wa.me/5555999712009");
};
