import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1x1 transparent PNG pixel
const TRANSPARENT_PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);

// Webhook config - loaded from environment
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

async function getGeoData(ip) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=city,regionName,country,org`);
    if (response.ok) {
      const data = await response.json();
      return {
        city: data.city,
        region: data.regionName,
        country: data.country,
        org: data.org
      };
    }
  } catch (e) {}
  return {};
}

async function sendToDiscord(webhook, data) {
  const embed = {
    embeds: [{
      title: '📄 Document Consulté',
      color: 0x5865F2,
      fields: [
        { name: '📋 Document', value: data.documentName, inline: true },
        { name: '🕐 Date', value: data.timestamp, inline: true },
        { name: '🌍 IP', value: `\`${data.ip}\``, inline: true },
        { name: '📍 Localisation', value: data.geo.city ? `${data.geo.city}, ${data.geo.region}, ${data.geo.country}` : 'Inconnu', inline: true },
        { name: '🏢 FAI/Org', value: data.geo.org || 'Inconnu', inline: true },
        { name: '🔗 Referer', value: data.referer || 'Direct', inline: true },
        { name: '🖥️ User-Agent', value: `\`\`\`${data.userAgent.substring(0, 500)}\`\`\`` }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(embed)
    });
  } catch (e) {
    console.error('Discord webhook error:', e);
  }
}

// Tracking endpoint - accepts any token
app.get('/t/:token/pixel.png', async (req, res) => {
  res.set('Content-Type', 'image/png');
  res.set('Content-Length', TRANSPARENT_PIXEL.length.toString());
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  if (DISCORD_WEBHOOK) {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
      || req.headers['x-real-ip']
      || req.socket.remoteAddress
      || 'Unknown';

    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referer = req.headers['referer'] || '';

    // Fire and forget
    getGeoData(ip).then(geo => {
      sendToDiscord(DISCORD_WEBHOOK, {
        ip,
        userAgent,
        referer,
        timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        documentName: 'Document consulté',
        geo
      });
    });
  }

  res.send(TRANSPARENT_PIXEL);
});

// Serve static files from dist
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback - Express 5 syntax
app.use((req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`mmaa.dev server running on http://localhost:${PORT}`);
});
