const { response } = require('express');
const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express()
app.enable('trust proxy');
 const port = 3001
 const UA='UA-222714834-1'
 
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


 app.get('/view', async(req, res) => {
   
  function handleReportingResults(response) {
    if (!response.code) {
      res.send('Query Success');
      for( var i = 0, report; report = response.reports[i]; ++i )
      {
        output.push('<h3>All Rows Of Data</h3>');
        if (report.data.rows && report.data.rows.length) {
          var table = ['<table>'];
  
          // Put headers in table.
          table.push('<tr><th>', report.columnHeader.dimensions.join('</th><th>'), '</th>');
          table.push('<th>Date range #</th>');
  
          for (var i=0, header; header = report.columnHeader.metricHeader.metricHeaderEntries[i]; ++i) {
            table.push('<th>', header.name, '</th>');
          }
  
          table.push('</tr>');
  
          // Put cells in table.
          for (var rowIndex=0, row; row = report.data.rows[rowIndex]; ++rowIndex) {
            for(var dateRangeIndex=0, dateRange; dateRange = row.metrics[dateRangeIndex]; ++dateRangeIndex) {
              // Put dimension values
              table.push('<tr><td>', row.dimensions.join('</td><td>'), '</td>');
              // Put metric values for the current date range
              table.push('<td>', dateRangeIndex, '</td><td>', dateRange.values.join('</td><td>'), '</td></tr>');
            }
          }
          table.push('</table>');
  
          output.push(table.join(''));
        } else {
          output.push('<p>No rows found.</p>');
        }
      }
      res.send(output.join(''));
  
    } else {
      res.send('There was an error: ' + response.message);
    }
  }
  await fetch(`https://analyticsreporting.googleapis.com/v4/reports:batchGet`,
  {
    method:'POST',
    headers:{
      'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    },
    body: JSON.stringify(
    {
      "reportRequests":[
        {
          
          "dateRanges": [{"startDate": "2022-03-01", "endDate": "2022-03-15"}],
          "metrics": [
            {
               "expression": "ga:users"
            }
          ],
         "viewId": "262509547",
         "dimensions":[
         {
           "name":"ga:sessionCount",
           "histogramBuckets":["1","10","100","200","400"]
         }],
         "orderBys":[
         {
           "fieldName":"ga:sessionCount",
           "orderType":"HISTOGRAM_BUCKET"
         }],
        }]
    } )
  }).then(response=>handleReportingResults(response))
   res.send('done')
 })

 
 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

