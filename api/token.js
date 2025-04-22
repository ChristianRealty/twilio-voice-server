import twilio from 'twilio';

export default function handler(req, res) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const apiKey = process.env.TWILIO_API_KEY;
    const apiSecret = process.env.TWILIO_API_SECRET;
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID;

    if (!accountSid || !authToken || !apiKey || !apiSecret || !twimlAppSid) {
      throw new Error("❌ Faltan variables de entorno en Vercel");
    }

    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twimlAppSid,
      incomingAllow: true
    });

    const token = new AccessToken(accountSid, apiKey, apiSecret, {
      identity: "Christian"
    });

    token.addGrant(voiceGrant);

    res.status(200).json({ token: token.toJwt() });
  } catch (err) {
    console.error("❌ Error en /api/token:", err.message);
    res.status(500).json({ error: err.message });
  }
}
