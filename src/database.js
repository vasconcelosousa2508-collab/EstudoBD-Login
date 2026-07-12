require('dotenv').config(); 
const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function inicializarBanco() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `);
}

async function cadastrarUsuario(nome, email, senha) {
  await client.execute({
    sql: "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    args: [nome, email, senha]
  });
}

async function buscarUsuarioPorEmail(email) {
  const resultado = await client.execute({
    sql: "SELECT * FROM usuarios WHERE email = ?",
    args: [email]
  });

  return resultado.rows[0];
}

module.exports = {
  inicializarBanco,
  cadastrarUsuario,
  buscarUsuarioPorEmail
};
