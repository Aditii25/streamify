import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import BlockiesSvg from "blockies-react-svg";

function StreamsList(props) {
  const [filter, setFilter] = useState("all");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="user-db-main">
      <div className="all-trans-main">
        {/********** header and filter********/}
        <div className="header-all-trans">
          <h3>All Transactions</h3>
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
            </FormControl> */}
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>To</th>
                <th>All Time Flow</th>
                <th>Flow Rate</th>
                <th>Start Date / End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {props.transactions.length > 0 ? (
                props.transactions.map((item, key) => {
                  return (
                    <tr
                      key={key}
                      onClick={() =>
                        props.setShowList({ show: false, index: key })
                      }
                    >
                      <td>
                        <div className="reciever-address">
                          <BlockiesSvg
                            address={item[1]}
                            size={8}
                            scale={30}
                            //caseSensitive={false}
                            className="blockies"
                          />
                          {item[1].slice(0, 6) +
                            "..." +
                            item[1].slice(item[1].length - 4, item[1].length)}
                        </div>
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
        </div>
      </div>
    </div>
  );
}

export default StreamsList;
