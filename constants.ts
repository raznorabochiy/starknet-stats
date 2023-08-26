import { Token } from "./types";

export const ADDRESSES_FILENAME = "addresses.txt";

export const CSV_FILENAME = "results.csv";

export const CSV_DELIMITER = ";";

export const RPC_URL = "https://starknet-mainnet.public.blastapi.io";

export const DELAY_SECONDS = 0;

export const ABI_CONTRACT_ADDRESS =
  "0x048624e084dc68d82076582219c7ed8cb0910c01746cca3cd72a28ecfe07e42d";

export const TOKEN_ADDRESS = {
  [Token.ETH]:
    "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  [Token.USDC]:
    "0x053C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8",
  [Token.USDT]:
    "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  [Token.DAI]:
    "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
  [Token.WBTC]:
    "0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
};
