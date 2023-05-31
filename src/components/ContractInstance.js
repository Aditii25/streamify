import { ethers } from "ethers";

import contractABI from "../contracts/artifacts/Trial.json";

export const CONTARCT_ADDRESS_POLYGON_TESTNET =
  "0x0648894BECcAb2C70fc9cDCeb59f82E14FfD50e1";

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
