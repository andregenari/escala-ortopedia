const leitos = [
  1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1186,
  1188, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198
];
const corpo = document.getElementById("corpo-tabela");

leitos.forEach((leito, idx) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${leito}</td>
    <td><input data-id="l${idx}-nome"></td>
    <td><input data-id="l${idx}-diag"></td>
    <td class="small">
      <input data-id="l${idx}-m0">
      <button class="close-btn" data-idx="${idx}" data-col="m0" type="button" aria-label="Limpar campo">&times;</button>
    </td>
    <td class="small">
      <input data-id="l${idx}-m1">
      <button class="close-btn" data-idx="${idx}" data-col="m1" type="button" aria-label="Limpar campo">&times;</button>
    </td>
    <td class="small">
      <input data-id="l${idx}-m2">
      <button class="close-btn" data-idx="${idx}" data-col="m2" type="button" aria-label="Limpar campo">&times;</button>
    </td>
    <td class="fluxo-cell">
      <input data-id="l${idx}-fluxo">
      <button class="close-btn" data-idx="${idx}" data-col="fluxo" type="button" aria-label="Limpar campo">&times;</button>
    </td>
    <td class="fluxo-cell">
      <input data-id="l${idx}-banho">
      <button class="close-btn" data-idx="${idx}" data-col="banho" type="button" aria-label="Limpar campo">&times;</button>
    </td>
    <td><input data-id="l${idx}-m3"></td>
    <td><input data-id="l${idx}-exames"></td>
    <td><input data-id="l${idx}-alta"></td>
    <td><input data-id="l${idx}-técnico"></td>
  `;
  corpo.appendChild(tr);
});

// Salvar e carregar localStorage para inputs
["data"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.value = localStorage.getItem(id) || "";
    el.oninput = () => localStorage.setItem(id, el.value);
  }
});

window.onload = () => {
  document.querySelectorAll("input[data-id]").forEach((inp) => {
    inp.value = localStorage.getItem(inp.getAttribute("data-id")) || "";
    inp.oninput = () =>
      localStorage.setItem(inp.getAttribute("data-id"), inp.value);
  });

  // Controle do botão X para mostrar/esconder e limpar input
  document.querySelectorAll("td.small, td.fluxo-cell").forEach((td) => {
    const btn = td.querySelector(".close-btn");
    const input = td.querySelector("input");

    td.addEventListener("click", (e) => {
      if (e.target === btn) return;
      btn.classList.toggle("visible");
    });

    btn.onclick = (e) => {
      e.stopPropagation();
      input.value = "";
      localStorage.setItem(input.getAttribute("data-id"), "");
      btn.classList.remove("visible");
      input.focus();
    };
  });
};
