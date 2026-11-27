/**
 * Vercel Serverless Function: /api/inquiry
 * Automatically runs on Vercel's global edge network.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, service, message } = req.body;

    // Optional: If DISCORD_WEBHOOK environment variable is set in Vercel
    if (process.env.DISCORD_WEBHOOK) {
      await fetch(process.env.DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **New Portfolio Client Inquiry on Vercel!**\n**Name:** ${name}\n**Email:** ${email}\n**Service:** ${service}\n**Message:** ${message}`
        })
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry successfully processed on Vercel Edge!',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
