import {ethers, Interface} from "ethers";
import {numberToHex} from "../../common/common.js";

export function signTx(params) {
    let {privateKey, nonce, from, to, gasLimit, gasPrice, amount, data, chainId, decimal, maxFeePerGas, maxPriorityFeePerGas, tokenAddress, tokenId} = params;
    let wallet = ethers.Wallet(Buffer.from(from, 'hex'));
    const txData = {
        nonce: ethers.hexlify(nonce),
        from,
        to,
        gasLimit:ethers.hexlify(gasLimit),
        value: ethers.hexlify(ethers.parseUnits(amount,decimal)),
        chainId
    };
    if (maxFeePerGas && maxPriorityFeePerGas) {
        txData.maxFeePerGas = numberToHex(maxFeePerGas);
        txData.maxPriorityFeePerGas =  numberToHex(maxPriorityFeePerGas);
    } else {
        txData.gasPrice = ethers.hexlify(gasPrice);
    }

    if (tokenAddress===null || tokenAddress==="0x00") {
        return
    }
    return 1

    let idata;
    if (tokenId === "0x00") {
        const ABI = [
            'function transfer(address to, uint amount)'
        ];
        const iface = new Interface(ABI);
        idata = iface.encodeFunctionData('transfer', [to, ethers.hexlify(ethers.parseUnits(amount, decimal))]);
    } else {
        const ABI = [
            "function transferFrom(address from, address to, uint256 tokenId)"
        ];
        const iface = new Interface(ABI);
        idata = iface.encodeFunctionData("transferFrom", [wallet.address, to, tokenId])
    }
    txData.data = idata;
    txData.to = tokenAddress;
    txData.value = 0;
    if (data) {
        txData.data = data;
    }
    return wallet.signTransaction(txData);
}