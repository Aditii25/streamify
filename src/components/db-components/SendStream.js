import React, { useState } from "react";
import "./style.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  alpha,
} from "@mui/material";
import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function SendStream() {
  const [personName, setPersonName] = useState("fDAIx");
  const [checked, setChecked] = React.useState(false);

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
      borderRadius: "15px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
        borderRadius: "15px",
      },
      "&:hover fieldset": {
        borderColor: "#777e90",
        borderRadius: "15px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7d33f6",
        borderRadius: "15px",
      },
    },
  });
  const PurpleSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#7d33f6",
      "&:hover": {
        backgroundColor: "#7d33f6aa",
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#7d33f6",
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <div className="send-stream-main">
      <div className="header">
        <h3>Send Stream</h3>
      </div>

      <div className="form">
        <div>
          <div className="field-title">Receiver Wallet Address</div>
          <CssTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            placeholder="Public Address"
          />
        </div>
        <div className="token-flow">
          <div className="token">
            <div className="field-title">Super Token</div>
            <FormControl required fullWidth>
              <Select
                displayEmpty
                id="demo-simple-select"
                defaultValue={personName}
                value={personName}
                onChange={handleChange}
                sx={{
                  color: "rgba(18, 20, 30, 0.87)",
                  fontSize: "1rem",
                  padding: "0px 5px",
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                    {
                      minHeight: "auto",
                    },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(224, 224, 224)",
                    borderRadius: "15px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7d33f6",
                    borderRadius: "15px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(224, 224, 224)",
                    borderRadius: "15px",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "black",
                  },
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <h4 className="index-placeholder">Select Token</h4>
                </MenuItem>
                <MenuItem value={"fDAIx"}>fDAIx</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flow">
            <div className="field-title">
              <p>
                Flow Rate <span style={{ color: "#777e90" }}>( / second )</span>
              </p>
            </div>
            <CssTextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              placeholder="0.0"
            />
          </div>
        </div>
        <div>
          <div className="switch-schedule">
            <PurpleSwitch
              {...label}
              defaultChecked
              checked={checked}
              onChange={handleChangeSwitch}
            />
            <span>Stream Scheduling</span>
          </div>
        </div>

        {checked ? (
          <>
            <div className="date-time-picker">
              <div className="start-date">
                <div className="field-title">Start Date</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      sx={{
                        color: "rgba(18, 20, 30, 0.87)",
                        fontSize: "1rem",
                        ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                          {
                            minHeight: "auto",
                          },
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(224, 224, 224)",
                          borderRadius: "15px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#7d33f6",
                          borderRadius: "15px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(224, 224, 224)",
                          borderRadius: "15px",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "black",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="end-date">
                <div className="field-title">End Date</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      sx={{
                        color: "rgba(18, 20, 30, 0.87)",
                        fontSize: "1rem",
                        ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                          {
                            minHeight: "auto",
                          },
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(224, 224, 224)",
                          borderRadius: "15px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#7d33f6",
                          borderRadius: "15px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(224, 224, 224)",
                          borderRadius: "15px",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "black",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="add-update-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
            <div>
              <div className="field-title">Total Stream</div>
              <CssTextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                placeholder="Public Address"
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div>
          <p style={{ textAlign: "center" }}>Balance :-</p>
        </div>
        <hr />
        <div>
          <button className="action-btn">Send Stream</button>
        </div>
      </div>
    </div>
  );
}

export default SendStream;
