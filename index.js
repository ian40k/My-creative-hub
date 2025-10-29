const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const http = require('http');

// Create HTTP server to keep Replit alive
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WhatsApp Bot is running!');
});

server.listen(3000, () => {
  console.log('Keep-alive server running on port 3000');
});

// WhatsApp Bot
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Bot is READY! 24/7 Online!');
});

client.on('message', async (message) => {
  if (message.body.startsWith('.')) {
    const command = message.body.split(' ')[0].toLowerCase();
    const query = message.body.slice(command.length).trim();

    try {
      let response = '';
      
      switch (command) {
        case '.movie':
          if (!query) {
            response = '🎬 Usage: .movie <query>\nExample: .movie avengers';
          } else {
            response = `🎬 Movie Search: "${query}"\n🔗 https://www.themoviedb.org/search?query=${encodeURIComponent(query)}`;
          }
          break;
          
        case '.ping':
          response = `🏓 Bot is active!\n\n📢 WhatsApp Channel:\nhttps://whatsapp.com/channel/0029Vb71mgIElaglZCU0je0x`;
          break;
          
        case '.tt':
          if (!query) {
            response = '📱 Usage: .tt <query>\nExample: .tt dance tutorial';
          } else {
            response = `📱 TikTok Search: "${query}"\n🔗 https://www.tiktok.com/search?q=${encodeURIComponent(query)}`;
          }
          break;
          
        case '.gg':
          if (!query) {
            response = '🔍 Usage: .gg <query>\nExample: .gg weather today';
          } else {
            response = `🔍 Google Search: "${query}"\n🔗 https://www.google.com/search?q=${encodeURIComponent(query)}`;
          }
          break;
          
        case '.yt':
          if (!query) {
            response = '📺 Usage: .yt <query>\nExample: .yt funny cats';
          } else {
            response = `📺 YouTube Search: "${query}"\n🔗 https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
          }
          break;
          
        case '.menu':
          response = `🤖 BOT MENU 🤖\n\n🎬 .movie <query> - Search movies\n📺 .yt <query> - Search YouTube\n🔍 .gg <query> - Search Google\n📱 .tt <query> - Search TikTok\n🏓 .ping - Bot status\n📖 .menu - Show this menu`;
          break;
          
        default:
          response = '❌ Unknown command. Type .menu for available commands.';
      }
      
      message.reply(response);
      
    } catch (error) {
      console.error('Command error:', error);
      message.reply('❌ Error processing command. Please try again.');
    }
  }
});

client.initialize();

// Keep the process alive
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('🤖 WhatsApp Bot Starting...');
