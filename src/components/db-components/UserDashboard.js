import React, { useEffect, useState } from "react";
import "./userdb.scss";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FormControl, MenuItem, Select } from "@mui/material";

import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { getContractInstance } from "../ContractInstance";

function UserDashboard() {
  const [filter, setfilter] = useState("all");
  const [token, setToken] = useState("fDAIx");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleChange = (event) => {
    setfilter(event.target.value);
  };
  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  useEffect(() => {
    const getBalance = async () => {
      setBalance("fetching...");
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();

          const sf = await Framework.create({
            chainId: 80001,
            provider: provider,
          });
          const daix = await sf.loadSuperToken(token);
          // console.log("fDAIx balance...");
          const daixBalance = await daix.balanceOf({
            account: address,
            providerOrSigner: signer,
          });
          // console.log(daixBalance);
          setBalance(parseFloat(daixBalance / Math.pow(10, 18)).toFixed(2));
        }
      } catch (err) {
        console.log(err);
      }
    };
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
      getBalance();
      getStreams();
    }

    // console.log(Date.now());
  }, [address, token]);

  if (address)
    return (
      <div className="user-db-main">
        <div className="stats-main">
          <div className="grid-main">
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">{balance}</span>
                <FormControl required fullWidth>
                  <Select
                    id="demo-simple-select"
                    defaultValue={token}
                    value={token}
                    onChange={handleTokenChange}
                    sx={{
                      color: "#000000a7",
                      fontSize: "0.865rem",
                      padding: "0px",
                      margin: "10px 0px",
                      width: "60%",
                      minWidth: "fit-content",
                      ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                        {
                          minHeight: "auto",
                          padding: "5px",
                        },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000a7",
                        borderRadius: "10px",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000a7",
                        borderRadius: "10px",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000a7",
                        borderRadius: "10px",
                      },
                      ".MuiSvgIcon-root ": {
                        fill: "#000000a7",
                      },
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"fDAIx"}>fDAIx</MenuItem>
                    <MenuItem value={"fUSDCx"}>fUSDCx</MenuItem>
                    <MenuItem value={"MATICx"}>MATICx</MenuItem>
                  </Select>
                </FormControl>
                <span className="info">Balance</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 0 24 24"
                  width="36px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M10 16V8c0-1.1.89-2 2-2h9V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-1h-9c-1.11 0-2-.9-2-2zm3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8h-9zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">
                  {transactions?.length ? transactions?.length : 0}
                </span>
                <span className="info">Total Streams</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 0 24 24"
                  width="36px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M16 10H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1zm3-7h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zm-5-5H8c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>
              </div>
            </div>

            {/* <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">-</span>
                <span className="info">Flow Rate</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="36px"
                  viewBox="0 0 24 24"
                  width="36px"
                  fill="#000000"
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12.88,17.76v0.36c0,0.48-0.39,0.88-0.88,0.88h0 c-0.48,0-0.88-0.39-0.88-0.88v-0.42c-0.63-0.15-1.93-0.61-2.69-2.1c-0.23-0.44-0.01-0.99,0.45-1.18l0.07-0.03 c0.41-0.17,0.87,0,1.08,0.39c0.32,0.61,0.95,1.37,2.12,1.37c0.93,0,1.98-0.48,1.98-1.61c0-0.96-0.7-1.46-2.28-2.03 c-1.1-0.39-3.35-1.03-3.35-3.31c0-0.1,0.01-2.4,2.62-2.96V5.88C11.12,5.39,11.52,5,12,5h0c0.48,0,0.88,0.39,0.88,0.88v0.37 c1.07,0.19,1.75,0.76,2.16,1.3c0.34,0.44,0.16,1.08-0.36,1.3l0,0C14.32,9,13.9,8.88,13.66,8.57c-0.28-0.38-0.78-0.77-1.6-0.77 c-0.7,0-1.81,0.37-1.81,1.39c0,0.95,0.86,1.31,2.64,1.9c2.4,0.83,3.01,2.05,3.01,3.45C15.9,17.17,13.4,17.67,12.88,17.76z" />
                  </g>
                </svg>
              </div>
            </div> */}
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">Polygon Testnet</span>
                <span className="info">Network</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 20 20"
                  height="36px"
                  viewBox="0 0 20 20"
                  width="36px"
                  fill="#000000"
                >
                  <rect fill="none" height="20" width="20" />
                  <path d="M12.71,12.84c0.84-0.88,1.17-2.06,0.99-3.18l1.59-0.48c0.42,0.78,1.25,1.32,2.2,1.32c1.38,0,2.5-1.12,2.5-2.5 s-1.12-2.5-2.5-2.5C16.12,5.5,15,6.62,15,8c0,0.08,0,0.15,0.01,0.22L13.42,8.7c-0.52-1.15-1.61-2-2.92-2.17l0-1.58 c1.14-0.23,2-1.24,2-2.45C12.5,1.12,11.38,0,10,0S7.5,1.12,7.5,2.5c0,1.21,0.86,2.22,2,2.45l0,1.58C8.2,6.71,7.11,7.55,6.58,8.7 L4.99,8.22C5,8.15,5,8.08,5,8c0-1.38-1.12-2.5-2.5-2.5S0,6.62,0,8s1.12,2.5,2.5,2.5c0.95,0,1.78-0.53,2.2-1.32L6.3,9.66 c-0.18,1.12,0.15,2.3,0.99,3.18l-1.15,1.43C5.8,14.1,5.41,14,5,14c-1.38,0-2.5,1.12-2.5,2.5S3.62,19,5,19s2.5-1.12,2.5-2.5 c0-0.61-0.22-1.17-0.58-1.6l1.15-1.43c1.18,0.71,2.68,0.71,3.86,0l1.15,1.43c-0.36,0.43-0.58,0.99-0.58,1.6c0,1.38,1.12,2.5,2.5,2.5 s2.5-1.12,2.5-2.5S16.38,14,15,14c-0.41,0-0.8,0.1-1.14,0.27L12.71,12.84z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="recent-trans-main">
          {/********** header and filter********/}
          <div className="header-rt">
            <h3>Recent Transactions</h3>
            <div className="filter-transaction">
              {/* <FormControl required fullWidth>
                <Select
                  id="demo-simple-select"
                  defaultValue={filter}
                  value={filter}
                  onChange={handleChange}
                  sx={{
                    color: "#fff",
                    fontSize: "0.865rem",
                    padding: "0px",
                    margin: "0px 10px",
                    width: "120px",
                    minWidth: "fit-content",

                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                      {
                        minHeight: "auto",
                        padding: "5px 10px",
                      },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: "10px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: "10px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: "10px",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "#fff",
                    },
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"all"}>ALL</MenuItem>
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"scheduled"}>Scheduled</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                </Select>
              </FormControl> */}
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>From / To</th>
                  <th>All Time Flow</th>
                  <th>Flow Rate</th>
                  <th>Start Date / End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((item, key) => {
                    if (key < 2)
                      return (
                        <tr key={key}>
                          <td>
                            {item[1].slice(0, 6) +
                              "..." +
                              item[1].slice(item[1].length - 4, item[1].length)}
                          </td>
                          <td>-</td>
                          <td>
                            {item[2] ===
                            "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
                              ? `${parseFloat(
                                  item[6] / Math.pow(10, 18)
                                )} fDAIx / sec`
                              : ""}
                          </td>
                          <td>
                            <span className="date-main">
                              <span className="date">
                                {new Date(item[3] * 1000).toLocaleString()}
                              </span>
                              <span className="date">
                                {new Date(item[4] * 1000).toLocaleString()}
                              </span>
                            </span>
                          </td>
                          <td>
                            {/* use "completed" className for completed streams */}
                            {/* use "scheduled" className for completed streams */}
                            {/* use "active" className for completed streams */}
                            {parseInt(item[3]) * 1000 < Date.now() &&
                            parseInt(item[4]) * 1000 > Date.now() ? (
                              <span className="active">Active</span>
                            ) : (
                              ""
                            )}
                            {parseInt(item[4]) * 1000 < Date.now() ? (
                              <span className="completed">Completed</span>
                            ) : (
                              ""
                            )}

                            {parseInt(item[3]) * 1000 > Date.now() ? (
                              <span className="scheduled">Scheduled</span>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                  })
                ) : (
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {/* use "completed" className for completed streams */}
                      {/* use "scheduled" className for completed streams */}
                      {/* use "active" className for completed streams */}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {transactions.length > 2 ? (
              <div className="view-more">
                <button>View More</button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <div className="recent-trans-main">
          <div className="header-rt">
            <h3>Gelato Automation Events</h3>
            <div className="filter-transaction">
              <FormControl required fullWidth>
                <Select
                  id="demo-simple-select"
                  defaultValue={filter}
                  value={filter}
                  onChange={handleChange}
                  sx={{
                    color: "#fff",
                    fontSize: "0.865rem",
                    padding: "0px",
                    margin: "0px 10px",
                    width: "120px",
                    minWidth: "fit-content",
                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                      {
                        minHeight: "auto",
                        padding: "5px 10px",
                      },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: "10px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: "10px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: "10px",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "#fff",
                    },
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"all"}>ALL</MenuItem>
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"scheduled"}>Scheduled</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>From / To</th>
                  <th>All Time Flow</th>
                  <th>Flow Rate</th>
                  <th>Start / End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x3423...12312</td>
                  <td>2376</td>
                  <td>0.005</td>
                  <td></td>
                  <td>
                    
                    <span className="completed">completed</span>
                  </td>
                </tr>
                <tr>
                  <td>0x3423...12312</td>
                  <td>2376</td>
                  <td>0.005</td>
                  <td></td>
                  <td>
                    
                    <span className="scheduled">Scheduled</span>
                  </td>
                </tr>
                <tr>
                  <td>0x3423...12312</td>
                  <td>2376</td>
                  <td>0.005</td>
                  <td></td>
                  <td>
                    
                    <span className="active">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
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

export default UserDashboard;
