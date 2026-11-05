import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
const require = createRequire(new URL('../segunda-entrega/package.json', import.meta.url))
const { build } = await import(pathToFileURL(require.resolve('vite')).href)
const root = fileURLToPath(new URL('../segunda-entrega', import.meta.url))
const outDir = await mkdtemp(path.join(tmpdir(), 'restaurante-build-nico-'))
await build({root,build:{outDir,emptyOutDir:false}})
console.log('Build de la aplicación integrada y SASS comprobado en:', outDir)
