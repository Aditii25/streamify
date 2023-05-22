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

  useEffect(() => {
    const itemViewPortCheck = () => {
      var items = document.querySelectorAll(".timeline li");

      // check if an element is in viewport
      // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
      const isElementInViewport = (el) => {
        var rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      };

      const callbackFunc = () => {
        for (var i = 0; i < items.length; i++) {
          if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
          }
        }
      };
      // listen for events
      window.addEventListener("load", callbackFunc);
      window.addEventListener("resize", callbackFunc);
      window.addEventListener("scroll", callbackFunc);
    };
    itemViewPortCheck();
  });

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
                <span className="title">12389</span>
                <span className="info">Total Streamed Token</span>
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

        {/* trying the timeline design  */}

        <section class="timeline">
          <ul>
            <li>
              <div>
                <time>1934</time> At vero eos et accusamus et iusto odio
                dignissimos ducimus qui blanditiis praesentium At vero eos et
                accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium
              </div>
            </li>
            <li>
              <div>
                <time>1937</time> Proin quam velit, efficitur vel neque vitae,
                rhoncus commodo mi. Suspendisse finibus mauris et bibendum
                molestie. Aenean ex augue, varius et pulvinar in, pretium non
                nisi.
              </div>
            </li>
            <li>
              <div>
                <time>1940</time> Proin iaculis, nibh eget efficitur varius,
                libero tellus porta dolor, at pulvinar tortor ex eget ligula.
                Integer eu dapibus arcu, sit amet sollicitudin eros.
              </div>
            </li>
            <li>
              <div>
                <time>1943</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
            <li>
              <div>
                <time>1946</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
            <li>
              <div>
                <time>1956</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
            <li>
              <div>
                <time>1957</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
            <li>
              <div>
                <time>1967</time> Aenean condimentum odio a bibendum rhoncus. Ut
                mauris felis, volutpat eget porta faucibus, euismod quis ante.
              </div>
            </li>
            <li>
              <div>
                <time>1977</time> Vestibulum porttitor lorem sed pharetra
                dignissim. Nulla maximus, dui a tristique iaculis, quam dolor
                convallis enim, non dignissim ligula ipsum a turpis.
              </div>
            </li>
            <li>
              <div>
                <time>1985</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
            <li>
              <div>
                <time>2000</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
            <li>
              <div>
                <time>2005</time> In mattis elit vitae odio posuere, nec maximus
                massa varius. Suspendisse varius volutpat mattis. Vestibulum id
                magna est.
              </div>
            </li>
          </ul>
        </section>
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
