const { response } = require('express');
const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express()
app.enable('trust proxy');
 const port = 3001
 const UA='UA-222714834-1'
 const cors=require("cors");
const corsOptions ={
   origin:'*', 

}
const path = require('path')
app.use(express.static(path.join(__dirname + "/public")))
app.use(cors(corsOptions))


 app.get('/', async(req, res) => {
  await fetch(`https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-222714834-2&cid=5555&dp=%2Fhome`,
  {
    method:'POST',
    headers:{
      'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    },
  })
   res.send('Hello World!')
 })

 app.get('/getadmin', async(req, res) => {
  await fetch(`https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-222714834-2&cid=5555&dp=%2Fgetadmin`,
  {
    method:'POST',
    headers:{
      'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    },
  })
   res.send('Hello World!')
 })
 app.get('/getview', async(req, res) => {
  await fetch(`https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-222714834-2&cid=5555&dp=%2Fgetview`,
  {
    method:'POST',
    headers:{
      'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    },
  })
   res.send('Hello World!')
 })


 app.get('/view/:s/:e/:id', async(req, res) => {
   
  await fetch(`https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-222714834-2&cid=5555&dp=%2Fview`,
  {
    method:'POST',
    headers:{
      'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    },
  })
  gaApi( {
    ...options,
    ids: req.params.id,//"ga:262509547",
      startDate: req.params.s,
      endDate: req.params.e,
      dimensions: "ga:affiliation,ga:date",
      metrics: "ga:users,ga:avgSessionDuration"
  }, function(err, data) {
      console.log(data.totalsForAllResults);
      res.send(data.totalsForAllResults);
  });
  
  
 })

 var options = {
  clientId: "113674787172188893015",
  email: " hsingh@myreact-343917.iam.gserviceaccount.com",
  key: "myreact-343917-8913fa330365.json",
  
};
gaApi = require('ga-api');
 

 
 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

