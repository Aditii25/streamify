import { ethers } from "ethers";

import contractABI from "../contracts/artifacts/Trial.json";

export const CONTARCT_ADDRESS_POLYGON_TESTNET =
  "0x37A025d3660b2901669bE6c03174D465164cbE8d";

export const getContractInstance = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTARCT_ADDRESS_POLYGON_TESTNET,
        contractABI.abi,
        signer
      );
      return contract;
    }
  } catch (error) {
    console.log(error);
  }
};
