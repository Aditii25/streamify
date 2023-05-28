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
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import {
  CONTARCT_ADDRESS_POLYGON_TESTNET,
  getContractInstance,
} from "../ContractInstance";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

function SendStream() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [token, setToken] = useState("fDAIx");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successText, setSuccessText] = useState(null);
  const [error, seterror] = useState(null);
  // handle add update button
  const [updatedDates, setUpdatedDates] = useState([]);
  const [updatedFlowRates, setUpdatedFlowRates] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [loadingText, setLoadingText] = useState(
    "* waiting for the transaction..."
  );
  const [sendStreamData, setSendStreamData] = useState({
    receiverAddress: "",
    token: token,
    flowRate: "",
    isScheduled: checked,
    startDate: "",
    endDate: "",
    isAddedUpdate: "",
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

  // contract function to store stream data

  const sendStream = async () => {
    seterror(null);
    setIsLoading(true);
    try {
      setLoadingText("* Checking the ACL permission...");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 80001,
          provider: provider,
        });

        const daix = await sf.loadSuperToken(sendStreamData.token);

        const isAuthorized = await daix.getFlowOperatorData({
          sender: address,
          flowOperator: CONTARCT_ADDRESS_POLYGON_TESTNET,
          token: daix.address,
          providerOrSigner: signer,
        });

        const permission = isAuthorized.permissions;

        if (permission !== "7") {
          setLoadingText(
            "* waiting for the ACL permission. ACL permission is required to manage the stream."
          );
          // token approval function
          const aclApproval = daix.updateFlowOperatorPermissions({
            flowOperator: CONTARCT_ADDRESS_POLYGON_TESTNET,
            flowRateAllowance: "3858024691358024", //10k tokens per month in flowRateAllowanace
            permissions: 7, //NOTE: this allows for full create, update, and delete permissions. Change this if you want more granular permissioning
          });
          await aclApproval.exec(signer).then(async function (tx) {
            await tx.wait();
            console.log(`
              Congrats! You've just successfully made the money router contract a flow operator. 
              Tx Hash: ${tx.hash}
          `);
          });
        } else {
          setLoadingText("* waiting for the transaction...");
        }
        const contract = await getContractInstance();
        console.log(contract);

        var sDate = sendStreamData.startDate.$d.getTime() / 1000;
        var eDate = sendStreamData.endDate.$d.getTime() / 1000;
        console.log(sDate, eDate);
        // var sDate = new Date(sendStreamData.startDate.$d); // Your timezone!
        // var startEpoch = sDate.getTime() / 1000.0;
        // console.log(startEpoch);

        let arr = inputs;
        let updatedDates = [];
        let updatedFlowRates = [];
        for (let i = 0; i < arr.length; i++) {
          let epoch = arr[i].input1.$d.getTime() / 1000;
          let flowrate = ethers.utils.parseEther(arr[i].input2);
          console.log(epoch);
          updatedDates.push(epoch);
          updatedFlowRates.push(parseInt(flowrate));
        }
        console.log(updatedDates, updatedFlowRates);
        let startingFlowRate = ethers.utils.parseEther(sendStreamData.flowRate);
        const tx = await contract.scheduleStream([
          [
            address, // connected address user's
            sendStreamData.receiverAddress, // receiver's address
            daix.address, // Token address
            sDate, // start time
            eDate, // end time
            startingFlowRate, // start flow rate
            startingFlowRate, // start flow rate
            updatedDates, // [update time1, update time 2]
            updatedFlowRates, // [update flow rate 1, update flow rate 2]
            [false, false], //
            false, // false by default
            arr.length > 0 ? false : true, // if update details are not provided set it as true
            false, // false by default
          ],
        ]);
        const receipt = await tx.wait();
        console.log(receipt);
        setIsLoading(false);
        setSuccessText("Stream Created Successfully!");
        setLoadingText(
          " You can view and manage your stream on the dashboard."
        );
        setTimeout(() => {
          // setIsLoading(false);
          setSuccessText(null);
          setLoadingText("");
          // Stop loading animation after a delay (2 seconds in this example)
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      const parsedEthersError = getParsedEthersError(err);
      let msg = parsedEthersError?.context.split(`(`)[0];
      console.log(msg);
      // console.log(parsedEthersError);
      seterror(msg);
      setIsLoading(false);
    }
  };
  // backg #ffeeef
  // color #662328
  // border #D22525
  // To give ACL permissions to the contract

  // const authorize = async () => {
  //   console.log("inside");
  //   try {
  //     const { ethereum } = window;
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();

  //       const sf = await Framework.create({
  //         chainId: 80001,
  //         provider: provider,
  //       });

  //       const daix = await sf.loadSuperToken("fDAIx");

  //       const aclApproval = daix.updateFlowOperatorPermissions({
  //         flowOperator: CONTARCT_ADDRESS_POLYGON_TESTNET,
  //         flowRateAllowance: "3858024691358024", //10k tokens per month in flowRateAllowanace
  //         permissions: 7, //NOTE: this allows for full create, update, and delete permissions. Change this if you want more granular permissioning
  //       });
  //       await aclApproval.exec(signer).then(async function (tx) {
  //         await tx.wait();
  //         console.log(`
  //           Congrats! You've just successfully made the money router contract a flow operator.
  //           Tx Hash: ${tx.hash}
  //       `);
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     seterror(error.message);
  //   }
  // };
  useEffect(() => {
    console.log(sendStreamData);
    console.log(inputs);
  }, [sendStreamData, inputs]);

  if (address)
    return (
      <div className="send-stream-main">
        <div className="header">
          <h3>Send Stream</h3>
        </div>

        <div className="form">
          <div className={isLoading ? "inside-form op" : "inside-form"}>
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
                    <span style={{ color: "#777e90" }}>
                      {sendStreamData.token
                        ? `( ${sendStreamData.token} / sec)`
                        : "(/ sec)"}
                    </span>
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
                          value={
                            sendStreamData.endDate
                              ? sendStreamData.endDate
                              : null
                          }
                          onChange={(newValue) => {
                            setSendStreamData({
                              ...sendStreamData,
                              endDate: newValue,
                            });
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
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
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
                                  {sendStreamData.token
                                    ? `( ${sendStreamData.token} / sec)`
                                    : "(/ sec)"}
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
          </div>
          <hr />
          <div>
            <button
              className={isLoading ? "action-btn loading" : "action-btn"}
              onClick={() => sendStream()}
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : successText
                ? successText
                : "Send Stream"}
            </button>
          </div>
          <div className="loading-msg">
            <p>{isLoading || successText ? loadingText : ""}</p>
            {error ? (
              <>
                <h4 className="error-h4">
                  Error{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z" />
                  </svg>
                </h4>
                <p className="error-text">{error}</p>
              </>
            ) : (
              ""
            )}
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
