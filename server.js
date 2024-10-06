import fs from 'node:fs/promises'
import express from 'express'

const app = express()

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

        let template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        let render = (await vite.ssrLoadModule('./src/entry-server.js')).render

        const rendered = await render(url)

        const html = template.replace(`<!--app-html-->`, rendered.html ?? '')

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