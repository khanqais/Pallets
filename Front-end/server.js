import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = express()

  let vite
  if (!isProduction) {
   
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })

   
    app.use(vite.middlewares)
  } else {
    
    app.use(express.static(path.resolve(__dirname, 'dist/client')))
  }

 
  app.use(async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template
      let render

      if (!isProduction) {
       
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        )

       
        template = await vite.transformIndexHtml(url, template)

       
        const entryModule = await vite.ssrLoadModule('/src/entry-server.jsx')
        render = entryModule.render
      } else {
        
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8',
        )
        const entryServer = await import('./dist/server/entry-server.js')
        render = entryServer.render
      }

     
      const appHtml = await render(url)

    
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

    
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
    
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e)
      }
      console.error(e)
      next(e)
    }
  })

  app.listen(5173, () => {
    console.log(`Server running at http://localhost:5173`)
  })
}


createServer()