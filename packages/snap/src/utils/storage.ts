import { ERC20 } from "../types/snapState";

export async function readTokensFromStorage() {
    // Read existing data
    const persistedData = await snap.request({
        method: "snap_manageState",
        params: { operation: "get" },
    })

    let ercTokens: ERC20[] = [];
    if (persistedData) {
        if (persistedData["ercTokens"] !== undefined) {
            ercTokens = persistedData["ercTokens"] as ERC20[];
        }
    }

    return ercTokens;
}