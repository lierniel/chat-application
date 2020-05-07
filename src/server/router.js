import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(renderHtml());
});

function renderHtml(){
    return `
  <!doctype html>
    <html>
    <head>
        <title>Server app</title>
        <link rel="stylesheet" type="text/css" href="/static/client.js.css">
    </head>
    <body>
        <div id="root"></div>
        <script src="/static/bundle.js"></script>
  </body>
  </html>`;
}

export default router;