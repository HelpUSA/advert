const http = require('http');

const PORT = Number(process.env.PORT || 3001);
const SERVICE_NAME = 'advert-api';
const VERSION = '0.1.0';

function sendJson(res, statusCode, payload) {
 const body = JSON.stringify(payload, null, 2);
 res.writeHead(statusCode, {
 'content-type': 'application/json; charset=utf-8',
 'cache-control': 'no-store',
 });
 res.end(body);
}

function notFound(res, req) {
 sendJson(res, 404, {
 ok: false,
 error: 'not_found',
 path: req.url,
 });
}

function handleHealth(res) {
 sendJson(res, 200, {
 ok: true,
 service: SERVICE_NAME,
 version: VERSION,
 time: new Date().toISOString(),
 stage: 'stage_4_railway_api',
 });
}

function handleVersion(res) {
 sendJson(res, 200, {
 ok: true,
 service: SERVICE_NAME,
 version: VERSION,
 });
}

function handleEntities(res) {
 sendJson(res, 200, {
 ok: true,
 entities: [
 'BrandProfile',
 'Campaign',
 'CalendarItem',
 'ContentDraft',
 'Approval',
 'PublishingTask',
 'PublishingLog',
 'MetricSnapshot',
 'Report',
 'WatcherHandoff',
 ],
 });
}

const server = http.createServer((req, res) => {
 const host = req.headers.host || 'localhost';
 const url = new URL(req.url || '/', 'http://' + host);
 if (req.method === 'GET' && url.pathname === '/health') return handleHealth(res);
 if (req.method === 'GET' && url.pathname === '/version') return handleVersion(res);
 if (req.method === 'GET' && url.pathname === '/entities') return handleEntities(res);
 return notFound(res, req);
});

server.listen(PORT, () => {
 console.log(SERVICE_NAME + ' listening on port ' + PORT);
});
