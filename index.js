var express = require('express');
var http = require('http');
var fs = require("fs");
var request = require('request');
var qr = require('qr-image');
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
var heroNodes = [];
var ipfsNodes = [];
ipfs.swarm.peers().then((peers)=>{
  for (var i = 0; i < peers.length; i++) {
    var ip = peers[i].addr+'';
    ipfsNodes.push(ip+'/'+peers[i].peer._idB58String)
    ip = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)[0];
    console.log(ip);
    request(ip+"/isHeroNode",function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        var isHeroNode = JSON.parse(body).isHeroNode;
        if (isHeroNode) {
          heroNodes.push(ip);
        };
      }
    });
  };
})
var app = express();

var server = http.createServer(app);
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/raw'}));


app.use('/hero', express.static('./', {
  maxAge: 0,
}));
function cros(res){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','*');
  res.header('Access-Control-Allow-Headers','X-PINGOTHER, Content-Type');
  res.end();
}
app.use('/isHeroNode',function(req,res,next){
  cros(res);
  res.send({isHeroNode:true});
  res.end();
});

app.use('/heroNodes',function(req,res,next){
  cros(res);
  res.send(heroNodes);
  res.end();
});
app.use('/ipfsNodes',function(req,res,next){
  cros(res);
  res.send(ipfsNodes);
  res.end();
});
app.use('/ipfsNodes',function(req,res,next){
  cros(res);
  res.send(ipfsNodes);
  res.end();
});
app.use('/qr',function(req,res,next){
  var code = qr.image(req.query.value, { type: 'png' });
  res.setHeader('Content-type', 'image/png');  //sent qr image to client side
  code.pipe(res);
});
app.use('/json2hash',function(req,res,next){
  if (req.method === 'POST') {
      cros(res);
      res.send(req.body);
      res.end();
  }else if(req.method === 'GET'){
    ipfs.add(new Buffer(JSON.stringify(req.query))).then((hash)=>{
      cros(res);
      res.send(hash[0].hash);
      res.end();
    })
  }
});


var proxy = require('http-proxy-middleware');
var ipfsProxy = proxy('/ipfs', {
  target: 'http://localhost:8080',
  changeOrigin: true
});
app.use(ipfsProxy);
var ipfsApiProxy = proxy('/ipfsapi', {
  target: 'http://localhost:5001',
  changeOrigin: true
});
app.use(ipfsApiProxy);

app.use('/eth',function(req,res,next){
  var options = {
    url: 'http://localhost:8545',
    method: req.method
  };
  if (req.method === 'POST') {
    options.body = JSON.stringify(req.body);
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cros(res);
      res.send(body);
      res.end();
    }else{
      cros(res);
      res.send(error);
      res.end();
    }
  });
})


var filterBTC = function (pathname, req) {
  return pathname.match(/^([\/][13][a-km-zA-HJ-NP-Z1-9]{25,34})|(uimedia)|(.bit)|(Websocket)$/)!=null;
};
var zeroNetProxy = proxy(filterBTC, {
  target: 'http://localhost:43110',
  changeOrigin: true,
  ws: true,
})
app.use(zeroNetProxy);

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isEthAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};
/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
var filterEth = function (pathname, req) {
  return isEthAddress(pathname.replace('/',''));
};
var heroNetProxy = proxy(filterEth, {
  target: 'http://localhost:43110',
  changeOrigin: true,
  ws: false,
})
app.use(heroNetProxy);

server.listen(3001);




