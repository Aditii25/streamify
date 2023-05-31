import BlockiesSvg from "blockies-react-svg";
import React, { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import streamLoop from "../../assets/stream-loop.gif";

function SingleStreamData(props) {
  const [singleTran, setSingleTran] = useState(
    props.transactions[props.showList.index]
  );

  return (
    <div className="user-db-main">
      <div
        className="back-div"
        onClick={() => props.setShowList({ show: true, index: "" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#7d33f6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
        </svg>
        <span>Back</span>
      </div>
      <div className="all-trans-main">
        {/********** header and filter********/}
        <div className="header-all-trans">
          <h3>Stream Details</h3>
          <div className="filter-transaction"></div>
        </div>
        <div className="single-stream-main">
          <div className="stream-header">
            <div className="status">
              <span className="status-title">Stream Status : </span>
              {parseInt(singleTran[3]) * 1000 < Date.now() &&
              parseInt(singleTran[4]) * 1000 > Date.now() ? (
                <span className="active">Active</span>
              ) : (
                ""
              )}
              {parseInt(singleTran[4]) * 1000 < Date.now() ? (
                <span className="completed">Completed</span>
              ) : (
                ""
              )}

              {parseInt(singleTran[3]) * 1000 > Date.now() ? (
                <span className="scheduled">Scheduled</span>
              ) : (
                ""
              )}
            </div>
            <div className="modify-stream">
              {parseInt(singleTran[4]) * 1000 > Date.now() ? (
                <>
                  <span
                    className="edit"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={"Edit Stream"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </span>
                  <span
                    className="delete"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={"delete Stream"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                    </svg>
                  </span>
                  <Tooltip id="my-tooltip" />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="sender-receiver">
            <div className="title">
              <div className="sender-title">Sender</div>

              <div className="receiver-title">Receiver</div>
            </div>

            <div className="sender-receiver-address">
              <div className="sender">
                <BlockiesSvg
                  address={singleTran[0]}
                  size={8}
                  scale={10}
                  //caseSensitive={false}
                  className="blockies"
                />
                {singleTran[0].slice(0, 6) +
                  "..." +
                  singleTran[0].slice(
                    singleTran[0].length - 4,
                    singleTran[0].length
                  )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                  className="copy-icon"
                  onClick={() => navigator.clipboard.writeText(singleTran[0])}
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                  </g>
                </svg>
              </div>
              <div className="status-img">
                {parseInt(singleTran[3]) * 1000 < Date.now() &&
                parseInt(singleTran[4]) * 1000 > Date.now() ? (
                  <img src={streamLoop} alt="superfluid-stream" />
                ) : (
                  ""
                )}
                {parseInt(singleTran[4]) * 1000 < Date.now() ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#7d33f6"
                    data-tooltip-id="my-tooltip1"
                    data-tooltip-content={"Stream Completed"}
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                      <rect fill="none" height="24" width="24" />
                    </g>
                    <g>
                      <path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M9.38,16.01L7,13.61c-0.39-0.39-0.39-1.02,0-1.41 l0.07-0.07c0.39-0.39,1.03-0.39,1.42,0l1.61,1.62l5.15-5.16c0.39-0.39,1.03-0.39,1.42,0l0.07,0.07c0.39,0.39,0.39,1.02,0,1.41 l-5.92,5.94C10.41,16.4,9.78,16.4,9.38,16.01z" />
                    </g>
                  </svg>
                ) : (
                  ""
                )}

                {parseInt(singleTran[3]) * 1000 > Date.now() ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    data-tooltip-id="my-tooltip1"
                    data-tooltip-content={"Stream Scheduled"}
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                      <path d="M18,3h-3.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H6C4.9,3,4,3.9,4,5v15c0,1.1,0.9,2,2,2h6.11 c-0.59-0.57-1.07-1.25-1.42-2H6V5h2v1c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5h2v5.08c0.71,0.1,1.38,0.31,2,0.6V5C20,3.9,19.1,3,18,3z M12,5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1C13,4.55,12.55,5,12,5z M17,12c-2.76,0-5,2.24-5,5s2.24,5,5,5 c2.76,0,5-2.24,5-5S19.76,12,17,12z M18.29,19l-1.65-1.65c-0.09-0.09-0.15-0.22-0.15-0.35l0-2.49c0-0.28,0.22-0.5,0.5-0.5h0 c0.28,0,0.5,0.22,0.5,0.5l0,2.29l1.5,1.5c0.2,0.2,0.2,0.51,0,0.71v0C18.8,19.2,18.49,19.2,18.29,19z" />
                    </g>
                  </svg>
                ) : (
                  ""
                )}
                <Tooltip id="my-tooltip1" />
              </div>
              <div className="receiver">
                <BlockiesSvg
                  address={singleTran[1]}
                  size={8}
                  scale={10}
                  //caseSensitive={false}
                  className="blockies"
                />
                {singleTran[1].slice(0, 6) +
                  "..." +
                  singleTran[1].slice(
                    singleTran[1].length - 4,
                    singleTran[1].length
                  )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                  className="copy-icon"
                  onClick={() => navigator.clipboard.writeText(singleTran[1])}
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="stream-details">
            <div className="sd-inside">
              <div className="details">
                <span className="sd-title">Start Date:</span>
                <span className="sd-value">
                  {new Date(singleTran[3] * 1000).toLocaleString()}
                </span>
              </div>
              <div className="details">
                <span className="sd-title">End Date:</span>
                <span className="sd-value">
                  {new Date(singleTran[4] * 1000).toLocaleString()}
                </span>
              </div>
              <div className="details">
                <span className="sd-title">Update Date:</span>
                <span className="sd-value">Check the Timeline</span>
              </div>
            </div>
            <div className="sd-inside">
              <div className="details">
                <span className="sd-title">Flow Rate:</span>
                <span className="sd-value">
                  {parseFloat(singleTran[6] / Math.pow(10, 18))}
                </span>
              </div>
              <div className="details">
                <span className="sd-title">Network Name:</span>
                <span className="sd-value">Polygon Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-main">
        <h1>Stream Timeline</h1>

        <section id="cd-timeline" className="cd-container">
          <div className="cd-timeline-block">
            <div className="cd-timeline-img cd-picture">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M14.4 6l-.24-1.2c-.09-.46-.5-.8-.98-.8H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5.6l.24 1.2c.09.47.5.8.98.8H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-4.6z" />
              </svg>
            </div>

            <div className="cd-timeline-content">
              <h2>Stream Initiated Event</h2>

              <p>
                This event marks the beginning of your Superfluid stream, where
                automated token transfers will start according to the specified
                parameters.
              </p>
              <p>
                Flow Rate :{" "}
                <b>{parseFloat(singleTran[6] / Math.pow(10, 18))}</b>
              </p>
              {/* <a href="#0" className="cd-read-more">
              Read more
            </a> */}
              <span className="cd-date">
                {new Date(singleTran[3] * 1000).toLocaleString()}
              </span>
            </div>
          </div>
          {singleTran[7].length > 0
            ? singleTran[7].map((item, key) => {
                return (
                  <div className="cd-timeline-block">
                    <div className="cd-timeline-img cd-location">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <rect fill="none" height="24" width="24" />
                        <path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z" />
                      </svg>
                    </div>

                    <div className="cd-timeline-content">
                      <h2>Stream Update Event</h2>
                      <p>
                        This event indicates a modification in the stream
                        parameters. It allows you to make changes such as
                        adjusting the flow rate on particular date as needed.
                      </p>
                      <p>
                        Flow Rate :{" "}
                        <b>
                          {parseFloat(singleTran[8][key] / Math.pow(10, 18))}
                        </b>
                      </p>
                      {/* <a href="#0" className="cd-read-more">
                      Read more
                    </a> */}
                      <span className="cd-date">
                        {new Date(item * 1000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            : ""}
          <div className="cd-timeline-block">
            <div className="cd-timeline-img cd-movie">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" />
              </svg>
            </div>

            <div className="cd-timeline-content">
              <h2>Stream Concluded Event</h2>
              <p>
                This event signifies the end of your Superfluid stream.
                Automated token transfers will cease after this point, and the
                stream will be considered completed.
              </p>
              <p>
                Flow Rate : <b>0.00</b>
              </p>
              <span className="cd-date">
                {new Date(singleTran[4] * 1000).toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SingleStreamData;
