require('dotenv').config();
const express = require('express');
const path = require('path');
const { inicializarBanco, cadastrarUsuario, buscarUsuarioPorEmail } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Serve a interface visual (HTML/CSS) que vai ficar na pasta public
app.use(express.static(path.join(__dirname, '../public')));

// ROTA DE CADASTRO
app.post('/api/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    await cadastrarUsuario(nome, email, senha);
    res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado." });
    }
    res.status(500).json({ error: error.message });
  }
});

// ROTA DE LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await buscarUsuarioPorEmail(email);

    // Se não achar o usuário ou a senha estiver errada (atenção: em produção usaríamos criptografia como bcrypt!)
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    // Retorna os dados do usuário para serem exibidos na tela (como você planejou!)
    res.json({
      success: true,
      usuario: {
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function iniciarServidor() {
  try {
    await inicializarBanco();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Falha crítica ao iniciar o servidor:", erro.message);
  }
}

iniciarServidor();
