const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });


wss.on('connection', ws => 
{
  var xlsx = require('xlsx-populate');

    xlsx.fromFileAsync("info.xlsx")
        .then(workbook => {
            var value = workbook.sheet("Лист1").usedRange().value();
            

            value = value.map(function(rowItem)
            {
              return rowItem.filter((value)=>value !== undefined && value !== null);

              //return x !== undefined && x !== null;
            });

            console.log(value);

            ws.send(JSON.stringify(
              {
                type: "excel",
                data: value
              }));

        });
});


  