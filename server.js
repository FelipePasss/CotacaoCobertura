const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure o transporte SMTP (exemplo com Outlook)
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'feriasecotacoes@gscia.com.br',
    pass: '25%@$TBAWrh'
  }
});

app.post('/enviar-email', async (req, res) => {
  const { condominio, data_inicio, data_fim, colaboradores, solicitante, email, observacoes } = req.body;

  const mailOptions = {
    from: 'feriasecotacoes@gscia.com.br',
    to: 'atendimento@gscia.com.br, rh55@gscia.com.br, coberturas@gscia.com.br', // Pode ser o próprio solicitante ou outro e-mail
    subject: 'Nova Cotação Recebida',
    text: `
      Condomínio: ${condominio}
      Data Início: ${data_inicio}
      Data Fim: ${data_fim}
      Colaboradores: ${colaboradores}
      Solicitante: ${solicitante}
      E-mail: ${email}
      Observações: ${observacoes}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true, message: 'E-mail enviado com sucesso!' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail', error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});