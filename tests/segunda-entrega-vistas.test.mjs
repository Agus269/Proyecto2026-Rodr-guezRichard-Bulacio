import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
const require = createRequire(new URL('../segunda-entrega/package.json', import.meta.url))
const { createElement: h } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { MemoryRouter } = require('react-router-dom')
const { createServer } = await import(pathToFileURL(require.resolve('vite')).href)

test('las páginas de contenido se renderizan con enlaces internos, imagen y tabla accesibles', async () => {
  const server = await createServer({root:fileURLToPath(new URL('../segunda-entrega',import.meta.url)),server:{middlewareMode:true},appType:'custom'})
  try {
    const render = async (pagina) => {
      const {default: Page} = await server.ssrLoadModule(`/src/pages/${pagina}.jsx`)
      return renderToStaticMarkup(h(MemoryRouter, null, h(Page)))
    }
    const inicio = await render('Inicio')
    assert.match(inicio, /href="\/menu"/)
    assert.match(inicio, /href="\/pedido"/)
    assert.match(inicio, /alt="Ilustración de una hamburguesa completa"/)
    assert.match(inicio, /Para compartir/)
    const nosotros = await render('Nosotros')
    assert.match(nosotros, /href="\/ubicacion"/)
    assert.match(nosotros, /<ul>/)
    const ubicacion = await render('Ubicacion')
    assert.match(ubicacion, /<caption>Horarios de atención<\/caption>/)
    assert.match(ubicacion, /<address>/)
    assert.match(ubicacion, /rel="noopener noreferrer"/)
    for (const contenido of [inicio,nosotros,ubicacion]) {
      assert.doesNotMatch(contenido, /<(main|header|nav|footer)[ >]/)
    }
    const pedido = await render('Pedido')
    assert.match(pedido, /<caption>Productos seleccionados e importes en pesos argentinos<\/caption>/)
    assert.match(pedido, /<button[^>]*type="submit"[^>]*disabled/)
    assert.match(pedido, /<label for="apellido">/)
    assert.match(pedido, /<label for="mesa">/)
    assert.match(pedido, /<label for="metodoPago">/)
    assert.match(pedido, /aria-live="polite"/)
    assert.match(pedido, /\$0,00/)
  } finally { await server.close() }
})
