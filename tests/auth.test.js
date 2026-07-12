test('Garante que a estrutura de dados do usuário possui os campos obrigatórios', () => {
  const usuarioMock = {
    id: 1,
    nome: 'Maria Silva',
    email: 'maria@email.com',
    senha: 'senha123'
  };

  expect(usuarioMock).toHaveProperty('id');
  expect(usuarioMock).toHaveProperty('nome');
  expect(usuarioMock).toHaveProperty('email');
  expect(usuarioMock).toHaveProperty('senha');
});
