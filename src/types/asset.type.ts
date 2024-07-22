export interface IAssets {
  id: string;
  image: string;
  symbol: string;
  current_price: string;
}
export interface ITokenContrast {
  id: string;
  address: `0x${string}`;
}

export interface IReadContracts {
  address: `0x${string}`;
  balance: string;
}
export interface IAssetsDetail extends IAssets, ITokenContrast {}

export interface IAssetBalance {
  balance: string;
  usdValue: number;
}
