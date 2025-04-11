// const dgram = require('node:dgram');
// const server = dgram.createSocket('udp4');

// server.on('message', (msg, rinfo) => {
//     console.log('Incoming message',msg.toString());
//   });

//   server.bind(53 ,()=> {
//     console.log('DNS server running on port 53');
//   } )
const dgram = require('node:dgram');
const dnsPacket = require('dns-packet'); // For parsing DNS packets
const server = dgram.createSocket('udp4');

// Define PORT and HOST
const PORT = 5333; // Use 53 only if running with sudo/admin privileges
const HOST = '0.0.0.0'; // Listen on all interfaces

// Handle incoming DNS queries
server.on('message', (msg, rinfo) => {
  try {
    const incomingMessage = dnsPacket.decode(msg);
    console.log({
      questions: incomingMessage.questions,
      rinfo,
    });
  } catch (err) {
    console.error("❌ Failed to decode DNS packet:", err);
  }
});

// Confirm server is listening
server.on('listening', () => {
  const address = server.address();
  console.log(`✅ DNS Server listening on ${address.address}:${address.port}`);
});

// Bind the server
server.bind(PORT, HOST, () => {
  console.log(`🚀 DNS Server started on UDP ${HOST}:${PORT}`);
});
