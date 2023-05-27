import React, { useEffect, useState } from "react";
import "./userdb.scss";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import StreamsList from "./StreamsList";
import SingleStreamData from "./SingleStreamData";

function AllStreams() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [showList, setShowList] = useState(true);

  if (address)
    return (
      <>
        {showList ? (
          <StreamsList setShowList={setShowList} />
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
