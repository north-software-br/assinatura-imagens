import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./App.css";
import { SignatureForm } from "./components/SignatureForm";
import { SignaturePreview } from "./components/SignaturePreview";
import { CompanyTabs } from "./components/CompanyTabs";
import { companies, defaultCompany } from "./data/companies";
import type { SignatureData } from "./types";

const INITIAL_DATA: SignatureData = {
  nome: "",
  cargo: "",
  setor: "",
  emailUser: "",
};

function App() {
  const [data, setData] = useState<SignatureData>(INITIAL_DATA);
  const [companyId, setCompanyId] = useState<string>(defaultCompany.id);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const company = useMemo(
    () => companies.find((c) => c.id === companyId) ?? defaultCompany,
    [companyId],
  );

  // Injeta as cores da empresa ativa nos tokens da UI. Todo o CSS existente já
  // consome estas variáveis, então a interface inteira passa a refletir a marca.
  const themeStyle = {
    "--color-accent": company.colors.accent,
    "--color-brand": company.colors.brand,
  } as CSSProperties;

  function copyRichText() {
    const preview = previewRef.current;
    if (!preview) return;

    const range = document.createRange();
    range.selectNodeContents(preview);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand("copy");
    selection?.removeAllRanges();

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={themeStyle}>
      <header className="header">
        <img
          className="header__logo"
          src={company.logo.src}
          alt={company.name}
        />
        <h1 className="header__title">Gerador de Assinatura de E-mail</h1>
      </header>

      <main className="container">
        <div className="tabs-bar">
          <CompanyTabs
            companies={companies}
            value={companyId}
            onValueChange={setCompanyId}
          />
        </div>

        <SignatureForm
          data={data}
          onChange={setData}
          onCopy={copyRichText}
          copied={copied}
          emailDomain={company.emailDomain}
        />
        <SignaturePreview data={data} company={company} ref={previewRef} />

        <section className="instructions">
          <h2 className="instructions__title">Como usar</h2>
          <ol className="instructions__list">
            <li>Selecione a <strong>empresa</strong> na aba acima.</li>
            <li>Preencha <strong>Nome</strong>, <strong>Cargo</strong>, <strong>Setor</strong> e <strong>E-mail</strong> nos campos ao lado.</li>
            <li>Clique em <strong>"Copiar Assinatura"</strong>.</li>
            <li><strong>Gmail:</strong> Configurações &rarr; Ver todas as configurações &rarr; Assinatura &rarr; cole com <strong>Ctrl+V</strong>.</li>
            <li><strong>Outlook:</strong> Arquivo &rarr; Opções &rarr; Email &rarr; Assinaturas &rarr; cole com <strong>Ctrl+V</strong>.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}

export default App;
