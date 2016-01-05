# faye-ioredis

This plugin provides an redis based backend for the
[Faye](http://faye.jcoglan.com) messaging server.

It allows a single Faye service to be distributed
across many front-end web servers by storing state and
routing messages through a [Redis](http://redis.io)
database server.

It uses the [ioredis](https://github.com/luin/ioredis) client and
supports Redis Cluster and Sentinel.


## Usage

Pass in the engine and any settings you need when setting up your Faye server.

```js
var faye        = require('faye');
var fayeIoRedis = require('faye-ioredis');
var http        = require('http');

var server = http.createServer();

var bayeux = new faye.NodeAdapter({
  mount:    '/',
  timeout:  25,
  engine: {
    type: fayeIoRedis,
    redisConnectionOptions: {  // See https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new
      port: 6379,              // Redis port
      host: '127.0.0.1',       // Redis host
    }
  }
});

bayeux.attach(server);
server.listen(8000);
```

## Cluster Support

To use Redis Cluster support, use the `redisClass` option along-side
`redisConnectionOptions`, like so:

```js
var faye        = require('faye');
var fayeIoRedis = require('faye-ioredis');
var Redis       = require('ioredis');
var http        = require('http');

var server = http.createServer();

var bayeux = new faye.NodeAdapter({
  mount:    '/',
  timeout:  25,
  engine: {
    type: fayeIoRedis,
    redisClass: Redis.Cluster, // Use Clustering
    redisConnectionOptions: [{ // See https://github.com/luin/ioredis/blob/master/API.md#new-clusterstartupnodes-options
      port: 7000,
      host: '127.0.0.1'
    }, {
      port: 7001,
      host: '127.0.0.1'
    }],

  }
});

bayeux.attach(server);
server.listen(8000);
```


## License

(The MIT License)

Copyright (c) 2011-2013 James Coglan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
