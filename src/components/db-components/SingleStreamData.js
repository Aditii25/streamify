import React, { useEffect } from "react";

function SingleStreamData(props) {
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
      <div className="back-div" onClick={() => props.setShowList(true)}>
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
}

export default SingleStreamData;
