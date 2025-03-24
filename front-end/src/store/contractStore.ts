import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import { create } from "zustand";

type ContractStore = {
    provider: BrowserProvider | null,
    signer: JsonRpcSigner | null,
    contract: Contract | null,
    setProvider: (provider: BrowserProvider) => void,
    setSigner: (signer: JsonRpcSigner) => void,
    setContract: (contract: Contract) => void
}

export const useContractStore = create<ContractStore>((set) => ({
    provider: null,
    signer: null,
    contract: null,
    setProvider: (provider) => set({ provider }),
    setSigner: (signer) => set({ signer }),
    setContract: (contract) => set({ contract })
}))