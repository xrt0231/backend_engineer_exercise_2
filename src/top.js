const rp   = require('request-promise')
const util = require('util');
const readline = require('readline');

const apiHost = 'ats.api.alexa.com'

global.fetch = require("node-fetch");

console.log(process.argv);
console.log(process.argv[3], process.argv[4]);
console.log(process.argv.length);

function callATS(apikey, country) {
  var uri = '/api?Action=TopSites&Count=5&CountryCode=' + country + '&ResponseGroup=Country&Output=json';

  var opts = {
    host: apiHost,
    path: uri,
    uri: 'https://' + apiHost + uri,
    json: true,
    headers: {'x-api-key': apikey},
        resolveWithFullResponse: true
  }

  rp(opts)
  .then( (html)=> console.log(`${JSON.stringify(html.body, null, 2)}`) )
  .catch( (e)=> console.log('failed:'+e))
}

if (process.argv.length != 5) {
  console.log(`Usage: node ${process.argv[1]} APIKEY COUNTRY`);
  process.exit(0);
}

callATS(process.argv[3], process.argv[4]);

exports.callATS = callATS;
