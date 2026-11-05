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
    const api = await server.ssrLoadModule('/src/api/productos.js')
    const fetchAnterior = globalThis.fetch
    globalThis.fetch = async () => { throw new Error('Failed to fetch') }
    try {
      await assert.rejects(() => api.obtenerProductos(), /servicio mock/)
    } finally { globalThis.fetch = fetchAnterior }
    const render = async (pagina) => {
      const {default: Page} = await server.ssrLoadModule(`/src/pages/${pagina}.jsx`)
      return renderToStaticMarkup(h(MemoryRouter, null, h(Page)))
    }
    const inicio = await render('Inicio')
    assert.match(inicio, /Buena comida, directo a tu mesa/)
    assert.match(inicio, /href="\/menu"/)
    assert.match(inicio, /href="\/pedido"/)
    assert.match(inicio, /alt="Hamburguesa completa emplatada con papas fritas, imagen orientativa"/)
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
    const {default: App} = await server.ssrLoadModule('/src/App.jsx')
    for (const [ruta, esperado] of [['/','Buena comida'],['/nosotros','Nuestra historia'],['/ubicacion','Horarios de atención'],['/pedido','Resumen del pedido'],['/no-existe','Página no encontrada']]) {
      const html = renderToStaticMarkup(h(MemoryRouter, {initialEntries:[ruta]}, h(App)))
      assert.ok(html.includes(esperado), `La ruta ${ruta} debe mostrar su página real`)
      assert.equal((html.match(/<main/g)||[]).length, 1)
      assert.equal((html.match(/<h1/g)||[]).length, 1)
    }
  } finally { await server.close() }
})
