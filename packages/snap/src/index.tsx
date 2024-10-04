import { type OnRpcRequestHandler, type OnHomePageHandler, type OnUserInputHandler, UserInputEventType } from '@metamask/snaps-sdk';
import { Heading, Box, Text, Bold, Form, Input, Button, Row, Address } from '@metamask/snaps-sdk/jsx';
import { isAddress } from 'web3-validator';
import { ethers } from "ethers";
import { ERC20 } from './types/snapState';
import { ListTokens } from './components/ListTokens';
import { readTokensFromStorage } from './utils/storage';

// https://github.com/FhenixProtocol/fhenix-contracts/blob/main/contracts/experimental/token/FHERC20/FHERC20.sol
import { abi } from "./data/FHERC20.json";


/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Hello, <Bold>{origin}</Bold>!
              </Text>
              <Text>
                This custom confirmation is just for display purposes.
              </Text>
              <Text>
                But you can edit the snap source code to make it do something,
                if you want to!
              </Text>
            </Box>
          ),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};




// https://docs.metamask.io/snaps/features/custom-ui/user-defined-components/
// async function fetchAllRegisteredERC() {



//   return (
//     <>
//       <Heading>ERC-20 encrypted tokens</Heading>
//       {ercTokens && ercTokens.map((ercToken, i) => {
//         return (
//           <Text>Here some value</Text>
//         )
//       })}
//     </>
//   );
// }



// Function to get the ERC20 token name
async function getERC20TokenName(contractAddress: string) {
  try {
    // Connect to the Ethereum provider (MetaMask Snap can use this provider)
    const provider = new ethers.BrowserProvider(ethereum);

    // Create a contract instance for the ERC-20 token
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Call the `name()` function to get the token name
    const tokenName = await contract.name();
    return tokenName;
  } catch (error) {
    console.error("Error fetching token name:", error);
    throw error;
  }
}




export const onHomePage: OnHomePageHandler = async () => {



  // Check user network
  // ethereum.request({
  //   method: "wallet_addEthereumChain",
  //   params: [{
  //     chainId: "8008135",
  //     rpcUrls: ["https://api.helium.fhenix.zone"],
  //     chainName: "Fhenix Helium",
  //     nativeCurrency: {
  //       name: "TFHE",
  //       symbol: "tFHE",
  //       decimals: 18
  //     },
  //     blockExplorerUrls: ["https://explorer.helium.fhenix.zone"]
  //   }]
  // });



  const fhenixChainId = '0x7a31c7'; // Fhenix Helium chain ID (8008135 in hex)
  const currentChainId = await ethereum.request({ method: 'eth_chainId' });
  
  console.log("Current chain id");
  console.log(currentChainId);

  if (currentChainId !== fhenixChainId) {
    return {
      content: (
        <Box>
          <Heading>Need to change the chain</Heading>
        </Box>
      ),
    };
  }
  //   try {
  //     await ethereum.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{ chainId: fhenixChainId }],
  //     });
  //     console.log('Switched to Fhenix Helium network');
  //   } catch (error) {
  //     if (error.code === 4902) {
  //       // Network not found, add it
  //       console.log('Fhenix Helium network not found. Adding it...');
  //       // await addFhenixNetwork();
  //     } else {
  //       console.error('Failed to switch network:', error);
  //     }
  //   }
  // } else {
  //   console.log('Already on the Fhenix Helium network');
  // }


  // Read tokens from storage
  let tokens = await readTokensFromStorage();

  return {
    content: (
      <Box>
        <Heading>ERC-20 encrypted tokens</Heading>
        <ListTokens tokens={tokens} />
        <Text>Add a new token</Text>
        <Form name='input-form'>
          <Input name='token-address' placeholder='ERC20 address' />
          <Button type='submit'>Add</Button>
        </Form>
      </Box>
    ),
  };
};





export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  if (event.type === UserInputEventType.FormSubmitEvent) {

    let userAddress = event.value["token-address"] as string;

    if (!isAddress(userAddress)) {
      console.log("Address invalid...")
    }
    else {
      let tokens: ERC20[] = await readTokensFromStorage();
      // Does the token already exists ? 
      let alreadyExists = tokens.some(token => token.address === userAddress);

      if (!alreadyExists) {

        // Fetch information on the token on chain
        let name = await getERC20TokenName(userAddress);
        console.log(name);


        let fakeToken: ERC20 = {
          address: userAddress,
          name: name
        }
        tokens.push(fakeToken);

        // Update the token list accordinlgy
        await snap.request({
          method: "snap_manageState",
          params: {
            operation: "update",
            newState: { ercTokens: tokens },
          },
        });
      }
    }

    await snap.request({
      method: "snap_updateInterface",
      params: {
        id,
        ui: (
          <Box>
            <Heading>Here is the form after execution</Heading>
            <Text>{event.value["token-address"]}</Text>
          </Box>
        )
      }
    });
  }
}
