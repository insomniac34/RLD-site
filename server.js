/* 
    A simple HTTP server 
        Written by Tyler Raborn
*/

var mysql = require('mysql');
var ns = require('node-static');
var fileServer = new ns.Server('./');

require('http').createServer(function (request, response) {

        console.log("Request: " + request.url);
        if (request.method == 'POST') {
            // serverside actions based on post url:
            switch(request.url) {

                case '/server.js': 
                    console.log("POST TO SERVER!");

                    var dbResults = [];

                    request.on('data', function(chunk) {
                        var jsonPayload = JSON.parse(chunk);
                        console.log("Received body data: " + JSON.parse(chunk).toString() + "\nACTION: " + jsonPayload.action);

                        switch(jsonPayload.action) {

                            default:
                                request.on('end', function() {
                                    // empty 200 OK response for now
                                    response.writeHead(200, "OK", {'Content-Type': 'text/html'});
                                    console.log("dbresults being written: " + dbResults.toString());

                                    dbResults.forEach(function(dbResult) {
                                        console.log("results: " + dbResult);
                                    });

                                    response.write(dbResults.toString());
                                    response.end();
                                });
                                break;
                        }
                    });

                    break;
                
                default:
                    console.log("[200] " + request.method + " to " + request.url);
                    request.on('data', function(chunk) {
                        console.log("Received body data:");
                        console.log(chunk.toString());
                    });

                    request.on('end', function() {
                        // empty 200 OK response for now
                        response.writeHead(200, "OK", {'Content-Type': 'text/html'});
                        response.end();
                    });

                    break;
            }
        } else {
            fileServer.serve(request, response);
        }

}).listen(8080);

