import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import bg1 from "../assets/bg.png";
import bg5 from "../assets/bg5.webp";
import heroImg from "../assets/streamify_dashboard_ss.webp";
import img2 from "../assets/streamify_flowrate_ss.webp";
import img3 from "../assets/streamify_multipletoken_ss.webp";
import img4 from "../assets/streamify_sedate_ss.webp";
import img5 from "../assets/streamify_updates_ss.webp";
import laptop from "../assets/laptop.png";
import gelato from "../assets/gelato-logo.png";
import superfluid from "../assets/superfluid-logo.png";
import { faqs } from "../components/faqsData";
import "animate.css";
// material ui imnports
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

function Home() {
  const [scrollTop, setScrollTop] = useState(0);
  const homeSection = useRef(null);
  const featuresSection = useRef(null);
  const howitworksSection = useRef(null);
  const faqsSection = useRef(null);
  // faqs style material ui code

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    margin: "1rem 0",

    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "#f5f5f4",
    borderRadius: "10px",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
  }));

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleNavClick = (a) => {
    window.scrollTo({
      top: a.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const textContainer = document.querySelector(".animated-text");
    const letters = textContainer.querySelectorAll("span");

    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 70}ms`;
    });
  });

  return (
    <div className="home-main" ref={homeSection}>
      <nav className={scrollTop > 0 ? "scrolled" : ""}>
        <div className={scrollTop > 0 ? "inside-nav scrolled" : "inside-nav"}>
          <div className="logo-streamify">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="36px"
              viewBox="0 0 24 24"
              width="36px"
              fill="#7d33f6"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <circle cx="20" cy="12" r="2" />
                  <circle cx="4" cy="12" r="2" />
                  <circle cx="12" cy="20" r="2" />
                  <path d="M7.89,14.65l-2.94,2.93c-0.39,0.39-0.39,1.02,0,1.41s1.02,0.39,1.41,0l2.94-2.93c0.39-0.38,0.39-1.02,0-1.41 C8.91,14.26,8.28,14.26,7.89,14.65z" />
                  <path d="M6.41,4.94C6.02,4.55,5.39,4.55,5,4.94C4.61,5.33,4.61,5.96,5,6.35l2.93,2.94c0.39,0.39,1.02,0.39,1.42,0 C9.73,8.9,9.73,8.27,9.34,7.88L6.41,4.94z" />
                  <path d="M16.12,14.65c-0.39-0.39-1.02-0.39-1.42,0c-0.39,0.39-0.39,1.02,0,1.41L17.64,19c0.39,0.39,1.02,0.39,1.41,0 s0.39-1.02,0-1.41L16.12,14.65z" />
                  <path d="M16.06,9.33l2.99-2.98c0.39-0.4,0.39-1.03,0-1.42c-0.39-0.39-1.02-0.39-1.41,0l-2.99,2.98c-0.39,0.39-0.39,1.02,0,1.42 C15.04,9.72,15.67,9.72,16.06,9.33z" />
                  <circle cx="12" cy="4" r="2" />
                </g>
              </g>
            </svg>
            {/* <span>Streamify</span> */}
            <div className="animated-text">
              <span>S</span>
              <span>t</span>
              <span>r</span>
              <span>e</span>
              <span>a</span>
              <span>m</span>
              <span>i</span>
              <span>f</span>
              <span>y</span>
            </div>
          </div>
          <ul>
            <li onClick={() => handleNavClick(homeSection)}>Home</li>
            <li onClick={() => handleNavClick(featuresSection)}>Features</li>
            <li onClick={() => handleNavClick(howitworksSection)}>
              How It Works
            </li>
            <li onClick={() => handleNavClick(faqsSection)}>FAQ</li>
          </ul>
          <Link to="/dashboard">
            <button>Launch App</button>
          </Link>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-left animate__animated animate__fadeIn animate__slow">
          <p className="hero-p">Streamify</p>
          <h1 className="hero-h1">
            The Simplest Way to Automate Your Superfluid Streams
          </h1>
          <p className="hero-p">
            Streamify is a powerful new dApp that lets you create, update, and
            delete Superfluid streams with just a few clicks. With Streamify,
            you can automate your payments and customize your payment schedules
            to fit your needs.
          </p>
          <div className="hero-button">
            <Link to="/dashboard">
              {" "}
              <button>Start your stream</button>
            </Link>
          </div>
        </div>
        <div className="hero-right animate__animated animate__slideInUp animate__slow">
          <div className="hero-right-inside">
            <div className="img" id="tilt">
              <img className="hero-right-bg1" src={laptop} alt="background" />
              <img className="laptop-screen" src={heroImg} alt="background" />
            </div>
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
          </div>
        </div>
      </div>
      <div className="second-section" ref={featuresSection}>
        <div className="heading">
          <span>Seamless Payment Automation</span>
        </div>
        <div className="feature-main">
          <div className="one">
            <div className="left">
              <span>Stream Management</span>
              <p>
                Seamlessly create, update, and delete Superfluid streams, giving
                you full control over your automated payment processes. Simplify
                your financial operations and save time with intuitive stream
                management features.
              </p>
            </div>
            <div className="right">
              <img src={heroImg} alt="testing" />
            </div>
          </div>
          <div className="one">
            <div className="right">
              <img src={img2} alt="testing" />
            </div>
            <div className="left">
              <span>Customizable Flow Rates</span>
              <p>
                Tailor the flow rates of your Superfluid streams to match your
                unique needs. Adjust the rate of token transfers to optimize
                payment schedules and ensure smooth, efficient transactions.
              </p>
            </div>
          </div>
          <div className="one">
            <div className="left">
              <span>Multiple Token Support</span>
              <p>
                Enjoy the freedom to transfer a wide variety of tokens in your
                Superfluid streams. From popular cryptocurrencies to
                stablecoins, diversify your payment options and accommodate
                different token preferences.
              </p>
            </div>
            <div className="right">
              <img src={img3} alt="testing" />
            </div>
          </div>
          <div className="one">
            <div className="right">
              <img src={img4} alt="testing" />
            </div>
            <div className="left">
              <span>Start and End Dates</span>
              <p>
                Set precise start and end dates for your Superfluid streams,
                allowing you to define the duration of your automated payments.
                Ensure timely transactions and effortlessly manage payment
                schedules for enhanced financial planning and control.
              </p>
            </div>
          </div>
          <div className="one">
            <div className="left">
              <span>Flexible Stream Updates</span>
              <p>
                With Streamify, you have the freedom to update your Superfluid
                streams whenever and however you want. Modify flow rates, adjust
                start and end dates, and change receivers effortlessly.
                Leveraging Gelato's gasless transaction feature, Streamify saves
                you valuable gas fees, providing a seamless and cost-effective
                solution for managing your automated payment streams with ease.
              </p>
            </div>
            <div className="right">
              <img src={img5} alt="testing" />
            </div>
          </div>
        </div>
      </div>
      <div className="third-section">
        <div className="heading">
          <span> Start Streamifying Your Payments Today!</span>
        </div>
        <div className="info">
          <span>
            Experience the future of frictionless payments with Streamify's
            intuitive interface and powerful features. Start streamifying your
            financial journey today!
          </span>
        </div>
        <Link to="/dashboard">
          <button>Start stream now</button>
        </Link>
        <img className="third-section-bg" src={bg5} alt="background" />
      </div>

      <div className="how-it-works" ref={howitworksSection}>
        <div className="heading">
          <span> How it works?</span>
        </div>
        <ul class="process">
          <li class="process__item">
            <span class="process__number">1</span>
            <span class="process__title">Create Stream</span>
            <span class="process__subtitle">
              Use the intuitive form to set up a new Superfluid stream. Specify
              the receiver's address, desired flow rate, token selection, start
              date, end date, and update date. Click "Create" to schedule the
              stream.
            </span>
          </li>

          <li class="process__item">
            <span class="process__number">2</span>
            <span class="process__title">Update Stream</span>
            <span class="process__subtitle">
              Modify your existing streams easily. Adjust the flow rate, start
              or end dates. Flexibly adapt your payment schedules with a few
              clicks.
            </span>
          </li>

          <li class="process__item">
            <span class="process__number">3</span>
            <span class="process__title">Delete Stream</span>
            <span class="process__subtitle">
              Need to remove a stream? Simply select the stream from your
              dashboard and click "Delete." The stream will be canceled, and the
              automated payments will cease.
            </span>
          </li>

          <li class="process__item">
            <span class="process__number">4</span>
            <span class="process__title">Timeline</span>
            <span class="process__subtitle">
              Easily track the progress of your streams with the interactive
              timeline. Click on any stream in the dashboard to view the
              timeline and understand the automated payment steps at a glance.
            </span>
          </li>
        </ul>
      </div>
      <div className="faqs-main" ref={faqsSection}>
        <h2>FAQs</h2>
        <div className="faqs">
          <div>
            {faqs.map((question, key) => {
              return (
                <Accordion
                  expanded={expanded === question.panel}
                  onChange={handleChange(question.panel)}
                  key={key}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>{question.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{question.info}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>

      <div className="built-with">
        <h2>Built With</h2>
        <div className="main">
          <div className="left">
            <img src={superfluid} alt="superfluid-stream" />
            <span>Superfluid Protocol</span>
            <p>
              Leveraging Superfluid to enable continuous and adjustable token
              streams.
            </p>
          </div>
          <div className="right">
            <img src={gelato} alt="superfluid-stream" />
            <span>Gelato Services</span>
            <p>
              Harnessing Gelato's automation capabilities for seamless stream
              management.
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="36px"
            viewBox="0 0 24 24"
            width="36px"
            fill="#7d33f6"
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <g>
                <circle cx="20" cy="12" r="2" />
                <circle cx="4" cy="12" r="2" />
                <circle cx="12" cy="20" r="2" />
                <path d="M7.89,14.65l-2.94,2.93c-0.39,0.39-0.39,1.02,0,1.41s1.02,0.39,1.41,0l2.94-2.93c0.39-0.38,0.39-1.02,0-1.41 C8.91,14.26,8.28,14.26,7.89,14.65z" />
                <path d="M6.41,4.94C6.02,4.55,5.39,4.55,5,4.94C4.61,5.33,4.61,5.96,5,6.35l2.93,2.94c0.39,0.39,1.02,0.39,1.42,0 C9.73,8.9,9.73,8.27,9.34,7.88L6.41,4.94z" />
                <path d="M16.12,14.65c-0.39-0.39-1.02-0.39-1.42,0c-0.39,0.39-0.39,1.02,0,1.41L17.64,19c0.39,0.39,1.02,0.39,1.41,0 s0.39-1.02,0-1.41L16.12,14.65z" />
                <path d="M16.06,9.33l2.99-2.98c0.39-0.4,0.39-1.03,0-1.42c-0.39-0.39-1.02-0.39-1.41,0l-2.99,2.98c-0.39,0.39-0.39,1.02,0,1.42 C15.04,9.72,15.67,9.72,16.06,9.33z" />
                <circle cx="12" cy="4" r="2" />
              </g>
            </g>
          </svg>
          <span>Streamify</span>
        </div>
        <div className="footer-info">
          Build at Superfluid Wavepool
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path
              fill="#4289C1"
              d="M36 5v27s0 4-4 4H4c-4 0-4-4-4-4v-5s25-2 36-22z"
            />
            <path
              fill="#1C6399"
              d="M31.844 23.243s2.565-1.635 2.258-2.288c-.309-.654-11.778.99-17.528 2.954-8.627 2.947-13.144 7.522-12.526 8.828.617 1.306 7.602 1.953 16.228-.993 5.752-1.964 15.368-7.524 15.06-8.177-.309-.653-3.492-.324-3.492-.324z"
            />
            <path
              fill="#A6D388"
              d="M31.474 22.747s2.65-1.619 2.349-2.291c-.303-.673-12.042.782-17.949 2.675C7.01 25.972 2.311 30.555 2.916 31.9c.605 1.345 7.723 2.141 16.585-.699 5.91-1.893 15.833-7.383 15.532-8.055-.303-.673-3.559-.399-3.559-.399z"
            />
            <path
              fill="#F5F8FA"
              d="M31.474 22.747s2.507-1.534 2.358-2.235L3.756 29.978c-.722.837-1.019 1.523-.84 1.922.156.348.755.657 1.7.878l30.395-9.566c.003-.02.029-.051.022-.066-.303-.673-3.559-.399-3.559-.399z"
            />
            <path
              fill="#FFDC5D"
              d="M14.919 1.309c-1.46-.632-3.707.061-4.116 1.762-.572 2.374.726 4.444 2.239 4.331 1.586-.118 2.568-.436 3.263-2.042.695-1.605.074-3.419-1.386-4.051z"
            />
            <path
              fill="#FFDC5D"
              d="M15.871 5.765c2.237-2.457-2.957-2.383-2.957-2.383-.983.003-.362 1.661-.853 2.538-.337.607.985.979.985.979s.612.011.62.755v.007c.001.189-.026.413-.124.71-.489 1.472 1.477 2.449 1.965.975.193-.584.143-1.104.071-1.586l-.007-.043c-.109-.715-.253-1.344.3-1.952z"
            />
            <path
              fill="#FFAC33"
              d="M16.763 1.884c-.697-1.012-3.117-1.965-4.713-.767-1.07-.222-1.517.787-1.445 1.379.057.473 1.209.633 1.469 1.535.209-.217.277-.674.242-.921.356.366.165 1.292 1.592 1.949 1.38.634 1.091 1.862 1.091 1.862s.749-.324 1.281-.9c1.019-1.101 1.251-3.022.483-4.137z"
            />
            <path
              fill="#FFDC5D"
              d="M16.261 28.432c-.378-.1-.971-.58-1.154-.912-.661-1.197.171-3.476.19-4.777.005-.37-2.213-1.974-2.86-1.016s.991 4.719.812 6.193c-.04.326-.227.814-.126 1.015.101.201.817.74 1.301.839 1.237.255 2.491-.342 2.644-.517.222-.254-.428-.725-.807-.825zm7.51-3.222c-.334-.065-.85-.469-1.016-.753-.29-.498.157-3.642.127-4.946-.35-.234-2.393.926-2.393.926-.437 1.815.817 2.863.659 4.262-.032.284-.17.964-.071 1.132.099.169.752.594 1.178.652 1.088.148 2.141-.443 2.264-.604.178-.234-.414-.604-.748-.669zm3.984-12.977c-.589-.235-1.348-.276-2.104-.386-1.198-.175-2.852-.765-3.529-1.086-.825-.495-2.577-1.661-3.012-1.948S18.093 8.128 17.375 8h-.156c.385.542.609 1.159.748 2.841 0 0 3.319 1.661 3.595 1.753 1.125.375 3.182.366 4.344.512.602.076 1.021-.014 1.499-.047.722-.049 1.38-.055 1.422-.371.05-.367-.595-.265-1.072-.455zM10.999 8.402c-1.666.993-3.368 3.049-3.98 3.914-.36.283-.686.614-.897.736-.389.223-2.154 1.432-3.334 2.005-.354.166-1.458.438-1.992.781-.432.278-.845.262-.727.612.102.302.508.216 1.227.132.719-.084 1.929-.289 2.325-.566.8-.531 3.347-1.156 4.597-2.031.221-.155 2.385-2.163 2.781-2.741.543-1.515.282-2.556 0-2.842z"
            />
            <path
              fill="#292F33"
              d="M23.042 19.417c-.229-.981-1.5-2.047-2.677-2.948-1.177-.901-2.375-1.438-2.375-1.438.034-.487-.172-1.295-.089-2.016.099-.853.26-1.689.26-1.689s1.633.727 3.402 1.267c.302-.363.618-1.395.559-1.833-.903-.841-2.483-1.754-2.919-2.042s-.837-.637-1.828-.718h-1.639s-.099.856-.749.918C14.337 8.98 13.56 8 13.56 8l-1.748.167c-2.198.338-4 3.024-4.794 4.151-.36.283-.36.283-.526.447.927.602 2.128 1.035 2.128 1.035 1.188-1.024 2.078-1.535 2.474-2.113 0 0 .659 1.356.912 2.388.253 1.032.202 2.925.202 2.925s-.005 1.674.058 1.94c.088.372.353 1.449.353 1.884 0 0-.606 1.335-.302 2.484.403 1.529.885 3.468.927 4.008 1.412 0 1.667-.359 1.667-.359s.02-.839.134-1.778c.069-.572.269-1.544.269-2.393 0-.849.217-1.424.343-1.776s.601-1.452.677-2.052c.02-.162.008-.374-.022-.6.534.292 1.493.792 2.084.954.849.232 1.494.595 1.718.79s.376.335.376.335-.201.557-.141 1.516c.055.877.693 1.658.8 2.703.893-.133 1.53-.499 1.53-.499s.079-1.336.098-1.916c.023-.706.412-2.193.265-2.824z"
            />
            <path
              fill="#67757F"
              d="M7.192 13.168c.795-1.126 3.067-4.339 5.508-4.55 0 0 1.118 1.459 2.565 1.235 1.447-.224 1.482-1.318 1.482-1.318l1.727.149c.494.04.841.148 1.12.281-.163-.101-.304-.189-.391-.246-.435-.287-.837-.638-1.828-.719h-1.639s-.309.699-.751.766S13.56 8 13.56 8l-1.748.167c-2.678.421-4.566 3.941-5.32 4.598.106.104.456.283.7.403z"
            />
            <path
              fill="#67757F"
              d="M13.762 27.297c-.402-1.36-1.283-4.497-.45-6.056.075-.368-.23-1.357-.318-1.729-.063-.266-.103-2.438-.072-2.717 3.859-.123 5.068-1.763 5.068-1.763s-2.139 1.191-5.354.57c.174-1.719-1.134-4.337-1.134-4.337-.213-.025-.265.168-.408.424 0 0 .774 1.865.912 2.718.137.852.202 2.593.202 2.593s-.005 1.674.058 1.94c.088.372.353 1.449.353 1.884-.952 1.783-.099 2.98.625 6.492.169.008.336.008.518-.019zm7.32-4.562c-.06-.958.024-1.639-.072-1.843-.096-.204-.52-.455-.52-.455s-.201.557-.141 1.516c.055.877.69 1.734.8 2.703.309-.046.406-.073.706-.161-.613-.261-.735-1.154-.773-1.76z"
            />
          </svg>{" "}
        </div>
      </div>
    </div>
  );
}

export default Home;
