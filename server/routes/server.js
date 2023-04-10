const {Router} = require('express');
const route = Router()
const auth = require('./auth')

route.use("/api",auth)

module.exports = route  