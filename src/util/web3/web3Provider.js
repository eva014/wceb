
import ProviderEngine from 'web3-provider-engine';
import DefaultFixture from 'web3-provider-engine/subproviders/default-fixture';
import NonceTrackerSubprovider from 'web3-provider-engine/subproviders/nonce-tracker';
import CacheSubprovider from 'web3-provider-engine/subproviders/cache';
import FilterSubprovider from 'web3-provider-engine/subproviders/filters.js';
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions'
import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet.js';
import InflightCacheSubprovider from 'web3-provider-engine/subproviders/inflight-cache.js';
import SanitizingSubprovider from 'web3-provider-engine/subproviders/sanitizer.js';
import InfuraSubprovider from 'web3-provider-engine/subproviders/infura.js';
import FetchSubprovider from 'web3-provider-engine/subproviders/fetch.js';
import WebSocketSubprovider from 'web3-provider-engine/subproviders/websocket.js';




function ZeroClientProvider(opts = {}){
    const connectionType = getConnectionType(opts)

    const engine = new ProviderEngine(opts.engineParams)

    // static
    const staticSubprovider = new DefaultFixture(opts.static)
    engine.addProvider(staticSubprovider)

    // nonce tracker
    engine.addProvider(new NonceTrackerSubprovider())

    // sanitization
    const sanitizer = new SanitizingSubprovider()
    engine.addProvider(sanitizer)

    // cache layer
    const cacheSubprovider = new CacheSubprovider()
    engine.addProvider(cacheSubprovider)

    // filters + subscriptions
    // for websockets, only polyfill filters
    if (connectionType === 'ws') {
        const filterSubprovider = new FilterSubprovider()
        engine.addProvider(filterSubprovider)
        // otherwise, polyfill both subscriptions and filters
    } else {
        const filterAndSubsSubprovider = new SubscriptionSubprovider()
        // forward subscription events through provider
        filterAndSubsSubprovider.on('data', (err, notification) => {
            engine.emit('data', err, notification)
        })
        engine.addProvider(filterAndSubsSubprovider)
    }

    // inflight cache
    const inflightCache = new InflightCacheSubprovider()
    engine.addProvider(inflightCache)

    // id mgmt
    const idmgmtSubprovider = new HookedWalletSubprovider({
        // accounts
        getAccounts: opts.getAccounts,
        // transactions
        processTransaction: opts.processTransaction,
        approveTransaction: opts.approveTransaction,
        signTransaction: opts.signTransaction,
        publishTransaction: opts.publishTransaction,
        // messages
        // old eth_sign
        processMessage: opts.processMessage,
        approveMessage: opts.approveMessage,
        signMessage: opts.signMessage,
        // new personal_sign
        processPersonalMessage: opts.processPersonalMessage,
        processTypedMessage: opts.processTypedMessage,
        approvePersonalMessage: opts.approvePersonalMessage,
        approveTypedMessage: opts.approveTypedMessage,
        signPersonalMessage: opts.signPersonalMessage,
        signTypedMessage: opts.signTypedMessage,
        personalRecoverSigner: opts.personalRecoverSigner,
    })
    engine.addProvider(idmgmtSubprovider)

    // data source
    const dataSubprovider = opts.dataSubprovider || createDataSubprovider(connectionType, opts)
    // for websockets, forward subscription events through provider
    if (connectionType === 'ws') {
        dataSubprovider.on('data', (err, notification) => {
            engine.emit('data', err, notification)
        })
    }
    engine.addProvider(dataSubprovider)

    // start polling
    engine.start()

    return engine

}

function createDataSubprovider(connectionType, opts) {
    const { rpcUrl, debug } = opts

    // default to infura
    if (!connectionType) {
        return new InfuraSubprovider()
    }
    if (connectionType === 'http') {
        return new FetchSubprovider({ rpcUrl, debug })
    }
    if (connectionType === 'ws') {
        return new WebSocketSubprovider({ rpcUrl, debug })
    }

    throw new Error(`ProviderEngine - unrecognized connectionType "${connectionType}"`)
}

function getConnectionType({ rpcUrl }) {
    if (!rpcUrl) return undefined

    const protocol = rpcUrl.split(':')[0]
    switch (protocol) {
        case 'http':
        case 'https':
            return 'http'
        case 'ws':
        case 'wss':
            return 'ws'
        default:
            throw new Error(`ProviderEngine - unrecognized protocol in "${rpcUrl}"`)
    }
}

module.exports = ZeroClientProvider
