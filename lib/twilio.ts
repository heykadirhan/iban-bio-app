import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendVerficationCode(to: string) {
    try {
        const verification = await client.verify.v2
            .services(serviceSid)
            .verifications.create({ to, channel: 'sms' });

        return { success: true, status: verification.status };
    } catch (error: any) {
        console.error('SMS Error:', error);
        return { success: false, message: error.message };
    }
}

export async function checkVerificationCode(to: string, code: string) {
    try {
        const verificationCheck = await client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to, code });

        return {
            success: true,
            valid: verificationCheck.status === 'approved',
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function sendCustomSMS(to: string, body: any) {
    try {
        const message = await client.messages.create({
            body: body,
            from: fromPhone,
            to: to,
        });
        return { success: true, sid: message.sid };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
