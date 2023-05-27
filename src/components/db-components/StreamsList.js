import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

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
            <FormControl required fullWidth>
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
              <tr onClick={() => props.setShowList(false)}>
                <td>0x3423...12312</td>
                <td>2376</td>
                <td>0.005</td>
                <td>
                  <div className="date-main">
                    <span className="date">something</span>
                    <span className="date">something</span>
                  </div>
                </td>
                <td>
                  {/* use "completed" className for completed streams */}
                  <span className="completed">completed</span>
                </td>
              </tr>
              <tr>
                <td>0x3423...12312</td>
                <td>2376</td>
                <td>0.005</td>
                <td>
                  <div className="date-main">
                    <span className="date">something</span>
                    <span className="date">something</span>
                  </div>
                </td>
                <td>
                  {/* use "scheduled" className for completed streams */}
                  <span className="scheduled">Scheduled</span>
                </td>
              </tr>
              <tr>
                <td>0x3423...12312</td>
                <td>2376</td>
                <td>0.005</td>
                <td>
                  <div className="date-main">
                    <span className="date">something</span>
                    <span className="date">something</span>
                  </div>
                </td>
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
}

export default StreamsList;
