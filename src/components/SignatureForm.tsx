import type { ChangeEvent } from "react";
import { Button as StatefulButton } from "@/components/ui/stateful-button";
import type { SignatureData } from "../types";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
  onCopy: () => void;
  emailDomain: string;
}

export function SignatureForm({ data, onChange, onCopy, emailDomain }: SignatureFormProps) {
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
        <StatefulButton
          className="btn btn--primary signature-copy-button"
          onClick={onCopy}
        >
          Copiar Assinatura
        </StatefulButton>
      </div>
    </section>
  );
}
