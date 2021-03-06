const superagent = require('superagent');

// check if captcha token is valid
// returns boolean 
async function validateReCaptchaToken(token) {
    if (process.env.NODE_ENV === 'test') {
        return true;
    }
    let googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CAPTCHA_KEY}&response=${token}`;
    return (async () => {
        try {
            const res = await superagent.post(googleUrl);
            console.log(res.body);
            return res.body.success;
        } catch (err) {
            return false;
        }
    })();
}

module.exports = {validateReCaptchaToken} 
