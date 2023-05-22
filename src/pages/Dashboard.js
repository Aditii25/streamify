import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./Dashboard.scss";
import SendStream from "../components/db-components/SendStream";
import AllStreams from "../components/db-components/AllStreams";
import UserDashboard from "../components/db-components/UserDashboard";

function Dashboard() {
  const [display, setDisplay] = useState({
    dashboard: true,
    sendStream: false,
    allStreams: false,
  });

  return (
    <div className="dashboard">
      <div className="left">
        <h1>logo</h1>
        <ul>
          <li
            onClick={() =>
              setDisplay({
                dashboard: true,
                sendStream: false,
                allStreams: false,
              })
            }
            className={display.dashboard ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
            </svg>
            <span>Dashboard</span>
          </li>
          <li
            onClick={() =>
              setDisplay({
                dashboard: false,
                sendStream: true,
                allStreams: false,
              })
            }
            className={display.sendStream ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path d="M17,10c0.1,0,0.19,0.01,0.28,0.01L4.39,4.58C3.73,4.31,3,4.79,3,5.51v3.71c0,0.46,0.31,0.86,0.76,0.97L11,12l-7.24,1.81 C3.31,13.92,3,14.32,3,14.78v3.71c0,0.72,0.73,1.2,1.39,0.92L10,17.05c0-0.02,0-0.03,0-0.05C10,13.14,13.14,10,17,10z" />
                  <path d="M17,12c-2.76,0-5,2.24-5,5s2.24,5,5,5c2.76,0,5-2.24,5-5S19.76,12,17,12z M18.29,19l-1.65-1.65 c-0.09-0.09-0.15-0.22-0.15-0.35v-2.5c0-0.28,0.22-0.5,0.5-0.5h0c0.28,0,0.5,0.22,0.5,0.5v2.29l1.5,1.5c0.2,0.2,0.2,0.51,0,0.71 l0,0C18.8,19.2,18.49,19.2,18.29,19z" />
                </g>
              </g>
            </svg>
            <span>Send Stream</span>
          </li>
          <li
            onClick={() =>
              setDisplay({
                dashboard: false,
                sendStream: false,
                allStreams: true,
              })
            }
            className={display.allStreams ? "active" : ""}
          >
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
            <span>All Streams</span>
          </li>
        </ul>
      </div>
      <div className="right ">
        <div className="connect-btn">
          <h3>
            {display.dashboard
              ? "Dashboard"
              : display.sendStream
              ? "Schedule Stream"
              : "All Streams"}
          </h3>
          <ConnectButton />
        </div>
        <div className="sub-section ">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="background"
          >
            <defs>
              <radialGradient id="fill" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#4F46E5"></stop>
                <stop offset="100%" stopColor="#ffffff"></stop>
              </radialGradient>
            </defs>
            <path
              d="M95,64.5Q90,79,77.5,88.5Q65,98,50,98Q35,98,22.5,88.5Q10,79,5,64.5Q0,50,5,35.5Q10,21,22.5,11.5Q35,2,50,2Q65,2,77.5,11.5Q90,21,95,35.5Q100,50,95,64.5Z"
              stroke="none"
              strokeWidth="0"
              fill="url(#fill)"
            ></path>
          </svg>
          {display.sendStream ? (
            <SendStream />
          ) : display.allStreams ? (
            <AllStreams />
          ) : (
            <UserDashboard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
