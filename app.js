const express = require('express');
const app = express();

// Middleware para obter o endereço IP do usuário
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.headers['X-Real-IP'] || req.connection.remoteAddress;
  req.userIP = ip; // Armazena o endereço IP no objeto de solicitação para uso posterior
  next();
});

// Rota de exemplo que exibe o endereço IP do usuário
app.get('/', (req, res) => {
  const userIP = req.userIP;
  res.send(`Seu endereço IP é: ${userIP}`);
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
