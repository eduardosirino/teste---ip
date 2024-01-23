const express = require('express');
const os = require('os');
const app = express();

app.get('/', (req, res) => {
  const ipv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipv6 = req.connection.remoteAddress;
  const macAddress = getMacAddress();

  const userAgent = req.headers['user-agent'];
  const language = req.headers['accept-language'];

  const info = {
    ipv4,
    ipv6,
    macAddress,
    userAgent,
    language,
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
  };

  res.json(info);
});

function getMacAddress() {
  const networkInterfaces = os.networkInterfaces();
  const interfaceNames = Object.keys(networkInterfaces);

  for (const name of interfaceNames) {
    const networkInterface = networkInterfaces[name];
    const interfaceWithMac = networkInterface.find(
      (iface) => iface.mac && iface.mac !== '00:00:00:00:00:00'
    );

    if (interfaceWithMac) {
      return interfaceWithMac.mac;
    }
  }

  return 'MAC address not found';
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
