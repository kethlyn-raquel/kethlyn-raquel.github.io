const lista = document.getElementById("lista-produtos");

fetch("data/produtos.json")
  .then(r => r.json())
  .then(d => {
    // Carrega cada categoria se ela existir no seu arquivo JSON
    if(d.papelaria) criar("📄 Papelaria Profissional", d.papelaria);
    if(d.personalizados) criar("🎁 Itens Personalizados", d.personalizados);
    if(d.eventos) criar("🎉 Materiais para Eventos", d.eventos);
  });

function criar(titulo, produtos) {
  const sec = document.createElement("div");
  sec.innerHTML = `<h3>${titulo}</h3><div class="products"></div>`;
  const grid = sec.querySelector(".products");

  produtos.forEach(p => {
    const c = document.createElement("div");
    c.className = "card";

    // Mostra a descrição apenas se houver uma no JSON. 
    // Removido o texto genérico automático.
    const descHtml = p.descricao ? `<p class="descricao">${p.descricao}</p>` : "";

    c.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h4>${p.nome}</h4>
        <div class="price">${p.preco}</div>
        ${descHtml}
        <button class="buy-btn">Pedir pelo WhatsApp</button>
      </div>
    `;

    c.querySelector(".buy-btn").onclick = () => {
      const mensagem = `Olá Ketty! Tenho interesse no produto: ${p.nome} (${p.preco})`;
      window.open(`https://wa.me/5524976063666?text=${encodeURIComponent(mensagem)}`);
    };

    grid.appendChild(c);
  });

  lista.appendChild(sec);
}
