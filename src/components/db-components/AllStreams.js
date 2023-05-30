import React, { useEffect, useState } from "react";
import "./userdb.scss";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import StreamsList from "./StreamsList";
import SingleStreamData from "./SingleStreamData";
import { getContractInstance } from "../ContractInstance";

function AllStreams() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [transactions, setTransactions] = useState([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const getStreams = async () => {
      try {
        const contract = await getContractInstance();
        const data = await contract.getAllUserStreams(address);
        console.log(data);
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (address) {
      getStreams();
    }
  }, []);

  if (address)
    return (
      <>
        {showList ? (
          <StreamsList setShowList={setShowList} transactions={transactions} />
        ) : (
          <SingleStreamData setShowList={setShowList} />
        )}
      </>
    );
  else
    return (
      <div className="wallet-not-connected">
        {openConnectModal && (
          <button
            onClick={openConnectModal}
            type="button"
            className="connect-wallet-cst"
          >
            Connect Wallet
          </button>
        )}
      </div>
    );
}

export default AllStreams;
