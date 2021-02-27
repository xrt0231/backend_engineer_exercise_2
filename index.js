#!/usr/bin/env node

const rp   = require('request-promise')
const util = require('util');
const readline = require('readline');

const apiHost = 'ats.api.alexa.com'

global.fetch = require("node-fetch");

console.log(process.argv);
console.log(process.argv[2], process.argv[3]);
console.log(process.argv.length);

function callATS(apikey, num) {
  var uri = '/api?Action=TopSites&Count=' + num + '&CountryCode=US&ResponseGroup=Country&Output=json';

  var opts = {
    host: apiHost,
    path: uri,
    uri: 'https://' + apiHost + uri,
    json: true,
    headers: {'x-api-key': apikey},
        resolveWithFullResponse: true
  }

  rp(opts)
  .then(function (html){ 
  for(let i=0; i<num; i++){
    
    console.log(`${JSON.stringify(html.body.Ats.Results.Result.Alexa.TopSites.Country.Sites.Site[i].DataUrl, null, 2)}`)
    }
  })

  .catch( (e)=> console.log('failed:'+e))
}

if (process.argv.length != 4) {
  console.log(`Usage: node ${process.argv[1]} APIKEY COUNTRY`);
  process.exit(0);
}

callATS(process.argv[2], process.argv[3]);


