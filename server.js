import fs from 'node:fs/promises'
import express from 'express'
import { LRUCache } from 'lru-cache'

const app = express()

// Cache setup with LRU (adjust options to your needs)
const cache = new LRUCache({
    max: 500, // Maximum number of items in the cache
    ttl: 1000 * 60 * 10, // Cache expiration time (10 minutes)
})

let vite
const {createServer} = await import('vite')
vite = await createServer({
    server: {middlewareMode: true},
    appType: 'custom',
})
app.use(vite.middlewares)

app.use('*', async (req, res) => {
    try {
        const url = req.originalUrl

        // Check if the response for this URL is already cached
        const cachedHTML = cache.get(url)
        if (cachedHTML) {
            console.log('Serving from cache:', url)
            return res.status(200).set({'Content-Type': 'text/html'}).send(cachedHTML)
        }

        let template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        let render = (await vite.ssrLoadModule('./src/entry-server.js')).render

        const rendered = await render(url)

        const html = template.replace(`<!--app-html-->`, rendered.html ?? '')

        // Store the rendered HTML in the cache before sending it to the client
        cache.set(url, html)

        res.status(200).set({'Content-Type': 'text/html'}).send(html)
    } catch (e) {
        vite?.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
    }
})

app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`)
})
