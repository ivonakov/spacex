const http = require("http");
const url = require("url");
const axios = require("axios");

const hostname = "127.0.0.1";
const port = 3001;

const requestHandler = async (request, response) => {
    
    if (request.url === "/favicon.ico") {
        // !!! Chrome makes an extra request for the favicon
        response.writeHead(200, { "Content-Type": "image/x-icon" });
        response.end();
        return;
    }

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Max-Age": 600,
        "Content-Type": "application/json",
    };

    if (request.method === "OPTIONS") {
        response.writeHead(204, headers);
        response.end();
        return;
    }

    if (["GET"].indexOf(request.method) > -1) {
        const BASE_URL = "https://api.spacexdata.com/v3/launches";
        const fn = url.parse(request.url, true).query.flightNumber || null;
        const offset = url.parse(request.url, true).query.offset || 5;
        const limit = url.parse(request.url, true).query.limit || 5;
        const q = fn
            ? `/${fn}?id=true`
            : `?id=true&sort=flight_number&order=desc&limit=${limit}&offset=${offset}`;
        const API = BASE_URL + q;

        return await axios
            .get(API)
            .then((res) => {
                response.writeHead(200, headers);
                response.end(
                    JSON.stringify({
                        items: fn ? 1 : res.headers["spacex-api-count"],
                        content: res.data
                    })
                );
                return;
            })
            .catch((error) => {
                if (error.response && error.response.status === "404") {
                    response.writeHead(error.response.status, headers);
                    response.end(
                        JSON.stringify({
                            status: error.response.status,
                            msg: error.response.statusText,
                        })
                    );
                } else {
                    response.writeHead(500, headers);
                    response.end(JSON.stringify({ error }));
                }
            });
    }

    response.writeHead(405, headers);
    response.end(`${request.method} is not allowed for the request.`);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.error("something bad happened", err);
    }
    console.info(`Server running at http://${hostname}:${port}/`);
});
