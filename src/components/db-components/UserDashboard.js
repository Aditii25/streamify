import React, { useEffect, useState } from "react";
import "./userdb.scss";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FormControl, MenuItem, Select } from "@mui/material";

function UserDashboard() {
  const [personName, setPersonName] = useState("all");
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  if (address)
    return (
      <div className="user-db-main">
        <div className="stats-main">
          <div className="grid-main">
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">12389</span>
                <span className="info">balance</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z" />
                  <circle cx="17.5" cy="17.5" r="4.5" />
                  <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z" />
                </svg>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">12389</span>
                <span className="info">Total Transactions</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z" />
                  <circle cx="17.5" cy="17.5" r="4.5" />
                  <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z" />
                </svg>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">Polygon</span>
                <span className="info">Network</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z" />
                  <circle cx="17.5" cy="17.5" r="4.5" />
                  <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z" />
                </svg>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-item-left">
                <span className="title">12389</span>
                <span className="info">balance</span>
              </div>
              <div className="grid-item-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z" />
                  <circle cx="17.5" cy="17.5" r="4.5" />
                  <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z" />
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
              <FormControl required fullWidth>
                <Select
                  id="demo-simple-select"
                  defaultValue={personName}
                  value={personName}
                  onChange={handleChange}
                  sx={{
                    color: "#fff",
                    fontSize: "0.865rem",
                    padding: "0px 5px",
                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                      {
                        minHeight: "auto",
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
                    {/* use "completed" className for completed streams */}
                    <span className="completed">completed</span>
                  </td>
                </tr>
                <tr>
                  <td>0x3423...12312</td>
                  <td>2376</td>
                  <td>0.005</td>
                  <td></td>
                  <td>
                    {/* use "scheduled" className for completed streams */}
                    <span className="scheduled">Scheduled</span>
                  </td>
                </tr>
                <tr>
                  <td>0x3423...12312</td>
                  <td>2376</td>
                  <td>0.005</td>
                  <td></td>
                  <td>
                    {/* use "active" className for completed streams */}
                    <span className="active">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
