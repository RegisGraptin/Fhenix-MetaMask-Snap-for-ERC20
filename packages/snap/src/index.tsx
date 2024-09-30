import { type OnRpcRequestHandler, type OnHomePageHandler, type OnUserInputHandler, UserInputEventType } from '@metamask/snaps-sdk';
import { Heading, Box, Text, Bold, Form, Input, Button, Row, Address } from '@metamask/snaps-sdk/jsx';

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

type ERC20 = {
  name: string;
  address: string;
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

  
export const Tokens = ({ tokens }) => { // : undefined | ERC20[]
  return (
    <Box>
      <Heading>Tokens</Heading>
      {tokens && tokens.map((token) => (
        <Row label={token.name}>
          {/* <Address address={token.address} /> */}
          <Text>{token.address}</Text>
        </Row>
      ))}
    </Box>
  );
};
    
export const onHomePage: OnHomePageHandler = async () => {

  console.log("Here home page");
  
  // Read storage dtaa
  const persistedData = await snap.request({
    method: "snap_manageState",
    params: { operation: "get" },
  })

  let ercTokens: undefined | ERC20[] = undefined; 
  if (persistedData) {
    ercTokens = persistedData["ercTokens"] as undefined | ERC20[];
  }

  return {
    content: (
      <Box>
        <Heading>ERC-20 encrypted tokens</Heading>
        <Tokens tokens={ercTokens} />
        <Text>Welcome to my Snap home page!</Text>
        <Form name='input-form'>
          <Input name='token-address' placeholder='ERC20 address' />
          <Button type='submit'>Add</Button>
        </Form>
      </Box>
    ),
  };
};


export const onUserInput: OnUserInputHandler = async ({id, event}) => {
  if (event.type === UserInputEventType.FormSubmitEvent) {


    let fakeToken: ERC20 = {
      address: "0x0000000000001",
      name: "FTM"
    }

    await snap.request({
      method: "snap_manageState",
      params: {
        operation: "update",
        newState: { ercTokens: [fakeToken] },
      },
    })

    
    console.log("Added value:")
    console.log(event.value["token-address"])

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
