import type { ChangeEvent } from "react";
import type { SignatureData } from "../types";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
  onCopy: () => void;
  copied: boolean;
  emailDomain: string;
}

export function SignatureForm({ data, onChange, onCopy, copied, emailDomain }: SignatureFormProps) {
  function handleChange(field: keyof SignatureData) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, [field]: e.target.value });
    };
  }

  return (
    <section className="panel">
      <h2 className="panel__title">Dados do Colaborador</h2>

      <div className="field">
        <label className="field__label" htmlFor="nome">Nome completo</label>
        <input
          className="field__input"
          type="text"
          id="nome"
          placeholder="Ex: Maria Silva"
          value={data.nome}
          onChange={handleChange("nome")}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="cargo">Cargo</label>
        <input
          className="field__input"
          type="text"
          id="cargo"
          placeholder="Ex: Engenheira Civil"
          value={data.cargo}
          onChange={handleChange("cargo")}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="setor">Setor</label>
        <input
          className="field__input"
          type="text"
          id="setor"
          placeholder="Ex: Engenharia"
          value={data.setor}
          onChange={handleChange("setor")}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="email">E-mail</label>
        <div className="email-group">
          <input
            className="field__input"
            type="text"
            id="email"
            placeholder="Ex: maria.silva"
            value={data.emailUser}
            onChange={handleChange("emailUser")}
          />
          <span className="email-group__suffix">{emailDomain}</span>
        </div>
      </div>

      <div className="actions">
        <button
          className={`btn btn--primary${copied ? " btn--copied" : ""}`}
          onClick={onCopy}
        >
          <span className="btn__icon" aria-hidden="true">
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
              </svg>
            )}
          </span>
          {copied ? "Copiado!" : "Copiar Assinatura"}
        </button>
      </div>
    </section>
  );
}
