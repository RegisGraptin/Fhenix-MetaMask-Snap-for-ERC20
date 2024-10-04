import { Box, Heading, Row, Text } from "@metamask/snaps-sdk/jsx";
import { ERC20 } from '../types/snapState';

export const ListTokens = ({ tokens }) => { // ERC20[]
    return (
        <Box>
            <Heading>Tokens</Heading>
            {tokens && tokens.map((token: ERC20) => (
                <Row label={token.name}>
                    {/* <Address address={token.address} /> */}
                    <Text>{token.address}</Text>
                </Row>
            ))}
        </Box>
    );
}

