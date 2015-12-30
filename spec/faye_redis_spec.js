var RedisEngine = require('../faye-redis')
var Redis = require('ioredis');

JS.Test.describe("Redis engine", function() { with(this) {
  before(function() {
    this.engineOpts = {
      type: RedisEngine,
      redisClass: Redis.Cluster,
      redisConnectionOptions: [{
        port: 7000,
        host: '127.0.0.1'
      }, {
        port: 7001,
        host: '127.0.0.1'
      }],
      namespace: new Date().getTime().toString() }

  })

  after(function(resume) { with(this) {
    disconnect_engine()
    resume();
  }})

  itShouldBehaveLike("faye engine")

  describe("distribution", function() { with(this) {
    itShouldBehaveLike("distributed engine")
  }})

  if (process.env.TRAVIS) return

  describe("using a Unix socket", function() { with(this) {
    before(function() { with(this) {
      this.engineOpts.socket = "/tmp/redis.sock"
    }})

    itShouldBehaveLike("faye engine")
  }})
}})
