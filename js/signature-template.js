const EMAIL_DOMAIN = "@antonelly.com.br";

function generateSignature({ nome, cargo, setor, emailUser }) {
  const emailFull = (emailUser || "email") + EMAIL_DOMAIN;

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
  <tr>
    <td style="padding: 0px 1px 0px 0px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0px;">
        <tr>
          <td align="center" valign="top" style="padding: 0px 25px 0px 0px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <img src="https://cdn.signaturehound.com/users/eahclml9jkr6c/5ibtulmltl0w16.png" alt="" title="Profile Picture" width="100" height="88" style="display: block; border: 0px; max-width: 100px;">
                  </p>
                </td>
              </tr>
            </table>
          </td>
          <td valign="top" style="padding: 0px 30px 0px 1px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px; font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap;">
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; font-weight: 700; color: rgb(0,53,59); margin: 1px; white-space: nowrap;">${nome || "Nome do Colaborador"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); margin: 1px;">${cargo || "Cargo"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); margin: 1px;">${setor || "Setor"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); margin: 1px;">Antonelly Construções e Serviços</p>
                </td>
              </tr>
            </table>
          </td>
          <td style="padding: 1px 0px 0px; border-right: 2px solid rgb(0,53,59);"></td>
          <td valign="top" style="padding: 0px 1px 0px 30px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                    <tr>
                      <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <img src="https://cdn.signaturehound.com/icons/email_default_5cab1d.png" alt="" width="18" height="18" style="display: block; border: 0px; margin: 0px; width: 18px; height: 18px;">
                        </p>
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,135) !important; padding: 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <a href="mailto:${emailFull}" target="_blank" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;">
                            <span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;">${emailFull}</span>
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <img src="https://cdn.signaturehound.com/icons/phone_default_5cab1d.png" alt="" width="18" height="18" style="display: block; border: 0px; margin: 0px; width: 18px; height: 18px;">
                        </p>
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,135) !important; padding: 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <a href="tel:+559232363572" target="_blank" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;">
                            <span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;">+55 92 3236-3572</span>
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <img src="https://cdn.signaturehound.com/icons/map_default_5cab1d.png" alt="" width="18" height="18" style="display: block; border: 0px; margin: 0px; width: 18px; height: 18px;">
                        </p>
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,135) !important; padding: 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;">Av. Amazonas Cavalcante, 25 - Parque 10 de Novembro, Manaus -AM, 69054-738</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <img src="https://cdn.signaturehound.com/icons/website_default_5cab1d.png" alt="" width="18" height="18" style="display: block; border: 0px; margin: 0px; width: 18px; height: 18px;">
                        </p>
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(92,171,28) !important; font-weight: 700; padding: 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <a href="https://antonelly.com.br/" target="_blank" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(92,171,29); font-weight: 700; text-decoration: none !important;">
                            <span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(92,171,29); font-weight: 700; text-decoration: none !important;">antonelly.com.br</span>
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 25px 1px 0px 0px;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <a href="https://antonelly.com.br/" target="_blank">
                      <img src="https://cdn.signaturehound.com/users/eahclml9jkr6c/iohgmlmlfkbx1a.png" alt="" title="Logo" width="150" height="20" style="display: block; border: 0px; max-width: 150px;">
                    </a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
          <td valign="middle" colspan="2" style="padding: 25px 1px 0px 25px; vertical-align: middle;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td width="30" style="font-size: 0px; line-height: 0px; padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <a href="https://www.instagram.com/antonelly.construcoes/" target="_blank">
                      <img src="https://cdn.signaturehound.com/icons/instagram_default_92c110.png" alt="" width="30" height="30" style="display: block; border: 0px; margin: 0px; width: 30px; height: 30px;">
                    </a>
                  </p>
                </td>
                <td width="3" style="padding: 0px 0px 1px;"></td>
                <td width="30" style="font-size: 0px; line-height: 0px; padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <a href="https://linkedin.com/company/antonelly" target="_blank">
                      <img src="https://cdn.signaturehound.com/icons/linkedin_default_92c110.png" alt="" width="30" height="30" style="display: block; border: 0px; margin: 0px; width: 30px; height: 30px;">
                    </a>
                  </p>
                </td>
                <td width="3" style="padding: 0px 0px 1px;"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
