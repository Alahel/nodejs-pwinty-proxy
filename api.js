const rp = require('request-promise')
const { BadRequest } = require('http-errors')
const {
  pwinty: { rootUrl, merchantId, apiKey },
} = require('./config')

const pwintyOpts = {
  json: true,
  resolveWIthFullResponse: true,
  headers: {
    'X-Pwinty-MerchantId': merchantId,
    'X-Pwinty-REST-API-Key': apiKey,
  },
}

const uri = r => `${rootUrl}/${r}`

const request = ({ r, ...opts }) => rp({ uri: uri(r), ...opts, ...pwintyOpts })

const imageOutput = ({ id, sku, url, copies, sizing, price }) => ({
  id,
  sku,
  url,
  copies,
  sizing,
  price,
})

const singleOrderOutput = ({ id, status, images = [] }) => ({
  id,
  status,
  images: images.map(i => imageOutput(i)),
})

const orderOutput = ({ data }) => singleOrderOutput(data)

const ordersOutput = ({ data: { content = [] } }) =>
  content.map(order => singleOrderOutput(order))

const getOrderBydId = id =>
  request({
    r: `orders/${id}`,
  })

const getOrders = () =>
  request({
    r: 'orders',
  })

const cancelOrder = id =>
  request({
    r: `orders/${id}/status`,
    method: 'post',
    form: {
      status: 'Cancelled',
    },
  })

const confirmOrder = id =>
  request({
    r: `orders/${id}/status`,
    method: 'post',
    form: {
      status: 'Submitted',
    },
  })

const submitOrder = async data => {
  const {
    country,
    name,
    addr1,
    city,
    county,
    zipCode,
    shippingMethod,
    imageUrl,
    imageCopies = 1,
    imageSizing = 'Crop',
    sku,
  } = data
  if (
    !(
      country &&
      name &&
      addr1 &&
      city &&
      county &&
      zipCode &&
      shippingMethod &&
      imageUrl &&
      imageCopies &&
      imageSizing &&
      sku
    )
  ) {
    throw new BadRequest()
  }
  const postData = {
    countryCode: country,
    recipientName: name,
    address1: addr1,
    addressTownOrCity: city,
    stateOrCounty: county,
    postalOrZipCode: zipCode,
    preferredShippingMethod: shippingMethod,
  }
  const orderData = await request({
    r: `orders`,
    method: 'post',
    form: postData,
  })
  const { data: { id } = {} } = orderData
  // add image to order
  await request({
    r: `orders/${id}/images`,
    method: 'post',
    form: {
      sku,
      url: imageUrl,
      copies: imageCopies,
      sizing: imageSizing,
    },
  })
  // then confirm
  await confirmOrder(id)
  return id
}

module.exports = {
  getOrderBydId,
  getOrders,
  cancelOrder,
  confirmOrder,
  submitOrder,
  orderOutput,
  ordersOutput,
}
