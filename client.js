const dgram = require('node:dgram');
const dnsPacket = require('dns-packet');

const client = dgram.createSocket('udp4');

// Construct a DNS query packet for "example.com"
const message = dnsPacket.encode({
  type: 'query',
  id: 1,
  flags: dnsPacket.RECURSION_DESIRED,
  questions: [{
    type: 'A',
    name: 'example.com'
  }]
});

// Send to your DNS server on port 5333
client.send(message, 5333, '127.0.0.1', () => {
  console.log("✅ Sent DNS query to localhost:5333");
  client.close();
});
