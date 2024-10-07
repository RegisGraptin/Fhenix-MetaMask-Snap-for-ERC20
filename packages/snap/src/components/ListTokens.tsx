import { fhenixjs, Permit } from "fhenixjs";
import { Box, Heading, Row, Text } from "@metamask/snaps-sdk/jsx";
import { ERC20 } from '../types/snapState';
import { ethers } from "ethers";

export const ListTokens = ({ tokens }) => { // ERC20[]

    function getBalance(token) {

        const provider = new ethers.BrowserProvider(ethereum);

        fhenixjs.getPermit(token.address, provider, true);
    }

    return (
        <Box>
            <Heading>Tokens</Heading>
            {tokens && tokens.map((token: ERC20) => (
                <Row label={token.name}>
                    {/* <Address address={token.address} /> */}
                    <Text>{token.symbol}</Text>
                </Row>
            ))}
        </Box>
    );
}

