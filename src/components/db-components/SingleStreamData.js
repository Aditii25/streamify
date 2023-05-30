import BlockiesSvg from "blockies-react-svg";
import React, { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import streamLoop from "../../assets/stream-loop.gif";

function SingleStreamData(props) {
  const [singleTran, setSingleTran] = useState(
    props.transactions[props.showList.index]
  );
  console.log(singleTran);
  //
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
              <span className="status-title">Status - </span>
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
                <img src={streamLoop} alt="superfluid-stream" />
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

      <section className="timeline">
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
              <time>2005</time> In mattis elit vitae odio posuere, nec maximus
              massa varius. Suspendisse varius volutpat mattis. Vestibulum id
              magna est.
            </div>
          </li>
        </ul>
      </section>

      <section id="cd-timeline" class="cd-container">
        <div class="cd-timeline-block">
          <div class="cd-timeline-img cd-picture">
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

          <div class="cd-timeline-content">
            <h2>Title of section 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
              optio, dolorum provident rerum aut hic quasi placeat iure tempora
              laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
              qui ut.
            </p>
            <a href="#0" class="cd-read-more">
              Read more
            </a>
            <span class="cd-date">Jan 14</span>
          </div>
        </div>

        <div class="cd-timeline-block">
          <div class="cd-timeline-img cd-movie">
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

          <div class="cd-timeline-content">
            <h2>Final Section</h2>
            <p>This is the content of the last section</p>
            <span class="cd-date">Feb 26</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleStreamData;
