import * as HDNodeWallet from "@ethersproject/hdnode";

export function createETHAddress(seedHex,addressIndex) {
    const node=HDNodeWallet.HDNode
    let hdnode=node.fromSeed(Buffer.from(seedHex,"hex"))
    const {
        privateKey,
        publicKey,
        address
    } = hdnode.derivePath(HDNodeWallet.defaultPath+addressIndex+"")

    return JSON.stringify(
        privateKey,
        publicKey,
        address
    )
}