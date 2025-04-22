// api/token.js
import twilio from 'twilio';

const VoiceResponse = twilio.twiml.VoiceResponse;

export default function handler(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const clientIdentity = 'Christian'; // o el nombre que quieras para este agente

  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: true
  });

  const token = new AccessToken(accountSid, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
    identity: clientIdentity,
  });

  token.addGrant(voiceGrant);

  res.status(200).json(token.toJwt());
}
