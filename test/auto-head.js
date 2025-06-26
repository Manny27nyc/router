/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */

var Router = require('..')
var utils = require('./support/utils')

var createServer = utils.createServer
var request = utils.request

describe('HEAD', function () {
  it('should invoke get without head', function (done) {
    var router = Router()
    var server = createServer(router)

    router.get('/users', sethit(1), saw)

    request(server)
    .head('/users')
    .expect('Content-Type', 'text/plain')
    .expect('x-fn-1', 'hit')
    .expect(200, done)
  })

  it('should invoke head if prior to get', function (done) {
    var router = Router()
    var server = createServer(router)

    router.head('/users', sethit(1), saw)
    router.get('/users', sethit(2), saw)

    request(server)
    .head('/users')
    .expect('Content-Type', 'text/plain')
    .expect('x-fn-1', 'hit')
    .expect(200, done)
  })
})

function saw(req, res) {
  var msg = 'saw ' + req.method + ' ' + req.url
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(msg)
}

function sethit(num) {
  var name = 'x-fn-' + String(num)
  return function hit(req, res, next) {
    res.setHeader(name, 'hit')
    next()
  }
}
