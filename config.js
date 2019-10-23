const {
  PORT,
  PWINTY_ROOT_URL,
  PWINTY_MERCHANT_ID,
  PWINTY_API_KEY,
} = process.env

module.exports = {
  port: PORT || 3001,
  pwinty: {
    rootUrl: PWINTY_ROOT_URL || 'https://sandbox.pwinty.com/v3.0',
    merchantId: PWINTY_MERCHANT_ID || 'xxxMerchantId',
    apiKey: PWINTY_API_KEY || 'xxxApiKey',
  },
}
