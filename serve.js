const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { exec } = require('child_process');

const PORTS = [3000, 3001, 8080, 5000];
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg']);

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    const filePath = path.join(__dirname, reqPath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found: ' + reqPath);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const etag = `W/"${stats.size}-${stats.mtimeMs}"`;

      // 304 Not Modified check
      if (req.headers['if-none-match'] === etag) {
        res.writeHead(304);
        res.end();
        return;
      }

      const headers = {
        'Content-Type': contentType,
        'ETag': etag,
        'Last-Modified': stats.mtime.toUTCString(),
      };

      // Caching strategy: HTML revalidates, assets cached for 24h
      if (ext === '.html') {
        headers['Cache-Control'] = 'no-cache, must-revalidate';
      } else {
        headers['Cache-Control'] = 'public, max-age=86400, stale-while-revalidate=604800';
      }

      // Compression for text/code assets
      const acceptEncoding = req.headers['accept-encoding'] || '';
      const canCompress = COMPRESSIBLE.has(ext);

      if (canCompress && /\bgzip\b/.test(acceptEncoding)) {
        headers['Content-Encoding'] = 'gzip';
        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
      } else if (canCompress && /\bdeflate\b/.test(acceptEncoding)) {
        headers['Content-Encoding'] = 'deflate';
        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(zlib.createDeflate()).pipe(res);
      } else {
        headers['Content-Length'] = stats.size;
        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(res);
      }
    });
  });
}

function startServer(portIndex) {
  if (portIndex >= PORTS.length) {
    console.error('All ports in use.');
    process.exit(1);
  }

  const port = PORTS[portIndex];
  const server = createServer();

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} busy, trying next port...`);
      startServer(portIndex + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    const url = `http://localhost:${port}`;
    console.log(`\n======================================================`);
    console.log(` Office Interiors Web Server Running!`);
    console.log(` Local URL: ${url}`);
    console.log(` Opening browser now...`);
    console.log(`======================================================\n`);

    // Auto open browser in Windows
    exec(`start ${url}`);
  });
}

startServer(0);
