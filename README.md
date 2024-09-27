# MetaMask Snap for Confidential ERC-20 Token Support
> Project built under a bounty from Fhenix

## Project

This project aims to develop a MetaMask snap that enables the support for Fhenix’s confidential ERC-20 tokens. The snap should ensure that these tokens are visible in the MetaMask wallet UI, including accurate balance display and detailed transaction history.

## Technical Requirements

- Compatibility: Ensure the snap works seamlessly with the Fhenix network (EVM-compatible).
- Token Visibility: Display confidential ERC-20 tokens in the MetaMask UI.
- Balance Display: Accurately show token balances in the MetaMask wallet.
- Transaction History: Provide a clear and detailed history of transactions involving confidential ERC-20 tokens.
- Security: Maintain the confidentiality and integrity of transactions and balances.
- User Experience: Ensure the snap is user-friendly and doesn’t require complex configurations.


## Development Considerations:

- Integration with MetaMask’s existing API and Ethereum Provider API.
- Handling of confidential transaction data and privacy preservation.
- Testing and debugging on the Fhenix testnet.


# Snap documentation

This repository demonstrates how to develop a snap with TypeScript. For detailed
instructions, see [the MetaMask documentation](https://docs.metamask.io/guide/snaps.html#serving-a-snap-to-your-local-environment).

MetaMask Snaps is a system that allows anyone to safely expand the capabilities
of MetaMask. A _snap_ is a program that we run in an isolated environment that
can customize the wallet experience.

## Snaps is pre-release software

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/),
a canary distribution for developers that provides access to upcoming features.

## Getting Started

Clone the template-snap repository [using this template](https://github.com/MetaMask/template-snap-monorepo/generate)
and set up the development environment:

```shell
yarn install && yarn start
```

## Cloning

This repository contains GitHub Actions that you may find useful, see
`.github/workflows` and [Releasing & Publishing](https://github.com/MetaMask/template-snap-monorepo/edit/main/README.md#releasing--publishing)
below for more information.

If you clone or create this repository outside the MetaMask GitHub organization,
you probably want to run `./scripts/cleanup.sh` to remove some files that will
not work properly outside the MetaMask GitHub organization.

If you don't wish to use any of the existing GitHub actions in this repository,
simply delete the `.github/workflows` directory.

## Contributing

### Testing and Linting

Run `yarn test` to run the tests once.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and
fix any automatically fixable issues.

### Using NPM packages with scripts

Scripts are disabled by default for security reasons. If you need to use NPM
packages with scripts, you can run `yarn allow-scripts auto`, and enable the
script in the `lavamoat.allowScripts` section of `package.json`.

See the documentation for [@lavamoat/allow-scripts](https://github.com/LavaMoat/LavaMoat/tree/main/packages/allow-scripts)
for more information.
