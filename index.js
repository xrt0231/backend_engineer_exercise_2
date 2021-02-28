#!/usr/bin/env node
require('dotenv').config();
const rp   = require('request-promise')
const util = require('util');
const readline = require('readline');
const { conflicts } = require('yargs');

const apiHost = 'ats.api.alexa.com';

//Get apikey from .env file
const {apikey} = process.env;

global.fetch = require("node-fetch");

//Select function to be used
//Top sites numbers function
if(process.argv[2] == 'top'){

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

//Top sites countries function
}else if(process.argv[2] == 'country'){
    
  function callATS(apikey, country) {
    var uri = '/api?Action=TopSites&Count=20&CountryCode=' + country + '&ResponseGroup=Country&Output=json';
  
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
      for(let i=0; i<20; i++){
      console.log(`${JSON.stringify(html.body.Ats.Results.Result.Alexa.TopSites.Country.Sites.Site[i].DataUrl, null, 2)}`)
      }
    })
  
    .catch( (e)=> console.log('failed:'+e))
  }
  //If input wrong argument
  }else{
      console.log("Wrong arg... Please try again...");
      process.exit(0);
  }


if (process.argv.length != 4) {
  console.log(`Usage: node ${process.argv[1]} APIKEY COUNTRY`);
  process.exit(0);
}

callATS(apikey, process.argv[3], process.argv[2]);


