const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // Verifique se o IP está no formato IPv6 e pegue apenas a parte IPv4
  const ipv4 = ip.includes(':') ? ip.split(':').pop() : ip;
  res.send(`Seu endereço IPv4 é: ${ipv4}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
