This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

# CryptoGlance with React/TypeScript + Wagmi

![](https://github.com/hannahpun/todo-list-react/ToDoList.png)
![Image](https://i.imgur.com/CLROPMd.png)

This is the side project for basic Crypto platform, have some features belows

- Wallet connection with wallets like MetaMask
- Network Switching (eg. Ethereum Mainnet, Ethereum Testnet Sepolia)
- Display EBTC, WETH, USDC assets by default with symbol, icon, address, USD value, and percentage
- Display Pie chart by asset USD value
- Simple transaction
- Monitoring the transaction status

## How to run

```js
# install dependencies
npm install

# serve
npm run dev
```

## Brief Codebase architecture

```
src
  ├ components
  | ├ Assets
  | ├ ConnectedWallet
  | ├ Error
  ├ pages
  ├ types
  ├ utils
```

## Dependencies Usage

- React + TypeScript
- Global State: Context + useRedux
- Routing: React-router
- Web3 Integration: Wagmi
- UI Component: Chakra UI
- Build Tools: Vite
