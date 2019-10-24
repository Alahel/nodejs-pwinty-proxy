const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { port } = require('./config')
const {
  getOrders,
  getOrderBydId,
  submitOrder,
  cancelOrder,
  orderOutput,
  ordersOutput,
} = require('./api')

const handle = prom => async (req, res, next) => {
  try {
    await prom(req, res, next)
  } catch (e) {
    console.error(e)
    res.status(e.statusCode || e.status || 500).json([e.message])
  }
}

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/health', (req, res) => res.sendStatus(200))

app.get(
  '/orders',
  handle(async (req, res) => res.json(ordersOutput(await getOrders()))),
)

app.get(
  '/orders/:id',
  handle(async ({ params: { id } }, res) =>
    res.json(orderOutput(await getOrderBydId(id))),
  ),
)

app.post(
  '/orders',
  handle(async ({ body }, res) =>
    res
      .status(201)
      .json(orderOutput(await getOrderBydId(await submitOrder(body)))),
  ),
)

app.put(
  '/orders/:id/cancel',
  handle(async ({ params: { id } }, res) => {
    await cancelOrder(id)
    res.json(orderOutput(await getOrderBydId(id)))
  }),
)

app.use((err, req, res, next) => res.sendStatus(500))
app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
