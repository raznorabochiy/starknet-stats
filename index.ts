import { Contract, RpcProvider } from "starknet";
import { formatUnits } from "ethers";
import {
  ABI_CONTRACT_ADDRESS,
  DELAY_SECONDS,
  RPC_URL,
  TOKEN_ADDRESS,
} from "./constants";
import { delay, loadAddresses, writeCsvData } from "./utils";
import { Token } from "./types";

const addresses = await loadAddresses();
const tokens = [Token.ETH, Token.USDC, Token.USDT, Token.DAI, Token.WBTC];

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const { abi } = await provider.getClassAt(ABI_CONTRACT_ADDRESS);

async function getTxCount(address: string) {
  const hexNonce = await provider.getNonceForAddress(address);
  const nonce = parseInt(hexNonce, 16);

  return nonce;
}

async function getBalance(address: string, token: Token) {
  const tokenAddress = TOKEN_ADDRESS[token];
  const contract = new Contract(abi, tokenAddress, provider);
  const { decimals } = await contract.functions.decimals();
  const { balance } = await contract.functions.balanceOf(address);

  return formatUnits(balance.low, decimals);
}

writeCsvData(["address", "txCount", ...tokens]);

for (const address of addresses) {
  try {
    const txCount = await getTxCount(address);

    const balances = await Promise.all(
      tokens.map((token) => getBalance(address, token)),
    );

    const formattedBalances = balances.map((value, index) =>
      `${value} ${tokens[index]}`.padEnd(24)
    );

    console.log(address, "\t", txCount, "\t", formattedBalances.join("\t"));

    writeCsvData([address, txCount, ...balances.map(parseFloat)]);
  } catch (_) {
    console.log("Can't get data for ", address);
  }

  if (DELAY_SECONDS) {
    await delay(DELAY_SECONDS);
  }
}
