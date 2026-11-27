/**
 * Cloudflare Pages Function: /api/inquiry
 * Automatically runs on Cloudflare's global edge network.
 * Replaces Supabase backend and handles inquiries natively on Cloudflare.
 */
export async function onRequestPost(context) {
  try {
    const contentType = context.request.headers.get("content-type") || "";
    let name, email, service, message;

    if (contentType.includes("application/json")) {
      const body = await context.request.json();
      name = body.name;
      email = body.email;
      service = body.service;
      message = body.message;
    } else {
      const formData = await context.request.formData();
      name = formData.get("name");
      email = formData.get("email");
      service = formData.get("service");
      message = formData.get("message");
    }

    // Optional: If you set a DISCORD_WEBHOOK or RESEND_API_KEY environment variable in Cloudflare
    if (context.env && context.env.DISCORD_WEBHOOK) {
      await fetch(context.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **New Portfolio Client Inquiry on Cloudflare!**\n**Name:** ${name}\n**Email:** ${email}\n**Service:** ${service}\n**Message:** ${message}`
        })
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Inquiry successfully processed on Cloudflare Edge!",
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
