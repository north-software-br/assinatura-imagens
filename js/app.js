function getFormData() {
  return {
    nome: document.getElementById("nome").value.trim(),
    cargo: document.getElementById("cargo").value.trim(),
    setor: document.getElementById("setor").value.trim(),
    emailUser: document.getElementById("email").value.trim(),
  };
}

function updatePreview() {
  const data = getFormData();
  document.getElementById("signature-preview").innerHTML =
    generateSignature(data);
}

function copyRichText(btn) {
  const preview = document.getElementById("signature-preview");
  const range = document.createRange();
  range.selectNodeContents(preview);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();

  showCopied(btn);
}

function showCopied(btn) {
  var original = btn.textContent;
  btn.textContent = "Copiado!";
  btn.classList.add("btn--copied");

  setTimeout(function () {
    btn.textContent = original;
    btn.classList.remove("btn--copied");
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  var fields = document.querySelectorAll(".field__input");
  fields.forEach(function (field) {
    field.addEventListener("input", updatePreview);
  });

  document
    .getElementById("btn-copy-signature")
    .addEventListener("click", function () {
      copyRichText(this);
    });

updatePreview();
});
