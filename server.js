import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import path from 'path'
import cors from 'cors'
import {zkSyncData} from "./checkers/zksync.js"
import {starknetData} from "./checkers/starknet.js"
import {zoraData} from "./checkers/zora.js"
import {aptosData} from "./checkers/aptos.js"
import {lineaData} from "./checkers/linea.js"
import {balancesData} from "./checkers/balances.js"
import {evmData} from "./checkers/evm.js"
import {readWallets} from "./utils/common.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 80
const apiRoutes = express.Router()

app.use(cors())
app.use('/api', apiRoutes)

app.use(express.static(path.join(__dirname, '/web/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/web/dist/index.html'))
})

apiRoutes.get('/stats', async (req, res) => {
    const starknetWallets = readWallets('./addresses/starknet.txt')
    const zksyncWallets = readWallets('./addresses/zksync.txt')
    const zoraWallets = readWallets('./addresses/zora.txt')
    const aptosWallets = readWallets('./addresses/aptos.txt')
    const lineaWallets = readWallets('./addresses/linea.txt')
    const evmWallets = readWallets('./addresses/evm.txt')
    res.json({
        'starknet_wallets': starknetWallets,
        'zksync_wallets': zksyncWallets,
        'zora_wallets': zoraWallets,
        'aptos_wallets': aptosWallets,
        'linea_wallets': lineaWallets,
        'evm_wallets': evmWallets,
    })
})

apiRoutes.get('/zksync', async (req, res) => {
    const responseData = await zkSyncData()
    res.json(responseData)
})

apiRoutes.get('/starknet', async (req, res) => {
    const responseData = await starknetData()
    res.json(responseData)
})

apiRoutes.get('/zora', async (req, res) => {
    const responseData = await zoraData()
    res.json(responseData)
})

apiRoutes.get('/aptos', async (req, res) => {
    const responseData = await aptosData()
    res.json(responseData)
})

apiRoutes.get('/linea', async (req, res) => {
    const responseData = await lineaData()
    res.json(responseData)
})

apiRoutes.get('/balances', async (req, res) => {
    const network = req.query.network ? req.query.network : 'eth'
    const responseData = await balancesData(network)
    res.json(responseData)
})

apiRoutes.get('/evm', async (req, res) => {
    const network = req.query.network ? req.query.network : 'eth'
    const responseData = await evmData(network)
    res.json(responseData)
})

app.listen(port, () => {
  console.log(`Чекер запущен: http://localhost`);
})