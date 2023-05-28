import React, { useEffect, useState } from "react";
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
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

function SendStream() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [token, setToken] = useState("fDAIx");
  const [checked, setChecked] = React.useState(false);

  const [sendStreamData, setSendStreamData] = useState({
    receiverAddress: "",
    token: token,
    flowRate: "",
    isScheduled: checked,
    startDate: "",
    endDate: "",
    isAddedUpdate: "",
    updateDates: [],
    updateFlowRates: [],
  });

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
    setSendStreamData({ ...sendStreamData, isScheduled: event.target.checked });
    if (!event.target.checked) {
      setInputs([]);
    }
  };
  const handleChangeToken = (event) => {
    setToken(event.target.value);
    setSendStreamData({ ...sendStreamData, token: event.target.value });
  };
  const inputStyle = {
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
  };

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

  // handle add update button
  const [inputs, setInputs] = useState([]);

  const addInput = () => {
    setInputs([...inputs, { input1: "", input2: "" }]);
  };

  const handleInputChange = (index, value, name) => {
    console.log(value);
    console.log("inside handle input change");
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
    console.log(newInputs);
  };
  const handleRemoveUpdateComponent = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // Remove element at the specified index
    setInputs(newInputs);
  };

  useEffect(() => {
    console.log(sendStreamData);
  }, [sendStreamData]);

  if (address)
    return (
      <div className="send-stream-main">
        <div className="header">
          <h3>Send Stream</h3>
        </div>

        <div className="form">
          <div>
            <div className="field-title">Receiver Wallet Address</div>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              placeholder="Public Address"
              sx={inputStyle}
              onChange={(e) =>
                setSendStreamData({
                  ...sendStreamData,
                  receiverAddress: e.target.value,
                })
              }
            />
          </div>
          <div className="token-flow">
            <div className="token">
              <div className="field-title">Super Token</div>
              <FormControl required fullWidth>
                <Select
                  displayEmpty
                  id="demo-simple-select"
                  defaultValue={token}
                  value={token}
                  onChange={handleChangeToken}
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
                  <MenuItem value={"fUSDCx"}>fUSDCx</MenuItem>
                  <MenuItem value={"MATICx"}>MATICx</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flow">
              <div className="field-title">
                <p>
                  Flow Rate{" "}
                  <span style={{ color: "#777e90" }}>( / second )</span>
                </p>
              </div>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                placeholder="0.0"
                sx={inputStyle}
                onChange={(e) =>
                  setSendStreamData({
                    ...sendStreamData,
                    flowRate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <div className="switch-schedule">
              <PurpleSwitch
                {...label}
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
                    <DemoContainer
                      components={["DateTimePicker"]}
                      sx={{ paddingTop: "0px" }}
                    >
                      <DateTimePicker
                        disablePast
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
                        value={
                          sendStreamData.startDate
                            ? sendStreamData.startDate
                            : null
                        }
                        onChange={(newValue) => {
                          setSendStreamData({
                            ...sendStreamData,
                            startDate: newValue,
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="end-date">
                  <div className="field-title">End Date</div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DateTimePicker"]}
                      sx={{ paddingTop: "0px" }}
                    >
                      <DateTimePicker
                        disablePast
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
              {inputs.length > 0 &&
                inputs.map((input, index) => {
                  return (
                    <div key={index} className="update-date-flow-outer">
                      <div className="update-title-remove">
                        <span className="update-event">Update</span>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000"
                            onClick={() => handleRemoveUpdateComponent(index)}
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="update-stream">
                        <div className="update-date">
                          <div className="field-title">Update At</div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                              components={["DateTimePicker"]}
                              sx={{ paddingTop: "0px" }}
                            >
                              <DateTimePicker
                                disablePast
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
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
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
                                value={input.input1 ? input.input1 : null}
                                onChange={(newValue) =>
                                  handleInputChange(index, newValue, "input1")
                                }
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                        <div className="update-flow">
                          <div className="field-title">
                            <p>
                              Updated Flow Rate
                              <span style={{ color: "#777e90" }}>
                                ( / second )
                              </span>
                            </p>
                          </div>
                          <TextField
                            fullWidth
                            id="outlined-controlled"
                            placeholder="0.0"
                            value={input.input2}
                            onChange={(event) => {
                              event.preventDefault();
                              handleInputChange(
                                index,
                                event.target.value,
                                "input2"
                              );
                            }}
                            sx={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="add-update-svg" onClick={addInput}>
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
                <span>Add Update Event</span>
              </div>

              <div>
                <div className="field-title">Total Stream</div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="≈ Total Stream"
                  sx={inputStyle}
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

export default SendStream;
