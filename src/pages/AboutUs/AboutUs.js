import React from "react";
import NavBar from "../../NavBars/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Helmet } from "react-helmet";
import "./AboutUs.css";
import Footer from "../../Footers/Footer";
export default function AboutUs() {
  return (
    <div>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Gifts Hub - ABout Us Page</title>
        <meta
          name="description"
          content=" Srinivas and Dwarak built this fabulous website to send free virtual gifts. Gifts manifest our emotions and transform them into meaningful forms."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content=" personalised, gifts, customized, scheduled, virtual , free,e-gift, online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india,"
        />
        <meta name="language" content="EN" />
      </Helmet>
      <NavBar />
      <br />
      <br />
      <br />
      <div className=" containerdum">
        <div className="card-wrapper boom">
          <div className="card">
            <div className="card-image">
              <img
                src={require("../../Images/SrinivasKonduri.png")}
                alt="profile one"
                id="srinivaskonduri"
              />
            </div>
            <ul className="social-icons">
              <li>
                <a href="https://www.facebook.com/srinivas.koool">
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faFacebookF}
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/srinivaskool">
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faGithub}
                  />
                </a>
              </li>
              <li>
                <a href>
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faTwitter}
                  />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/srinivas-konduri/">
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faLinkedinIn}
                  />
                </a>
              </li>
            </ul>
            <div className="details">
              <h2>
                Srinivas Konduri
                <br />
                <span className="job-title">FULL STACK WEB DEVELOPER</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="card-wrapper boom">
          <div className="card">
            <div className="card-image">
              <img
                src={require("../../Images/DwarakaPoreddy.png")}
                alt="profile one"
                id="dwarakaporeddy"
              />
            </div>
            <ul className="social-icons">
              <li>
                <a href="https://www.facebook.com/dwarakanathreddy.poreddy">
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faFacebookF}
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/Dwaraka-Poreddy">
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faGithub}
                  />
                </a>
              </li>
              <li>
                <a href>
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faTwitter}
                  />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dwarakanatha-reddy-poreddy-3bbb231b1/">
                  <FontAwesomeIcon
                    className="aboutusfabicons"
                    icon={faLinkedinIn}
                  />
                </a>
              </li>
            </ul>
            <div className="details">
              <h2>
                Dwaraka Poreddy
                <br />
                <span className="job-title">FULL STACK WEB DEVELOPER</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <br /> <br />
      <div class="aboutus">
        <div class="header-text">
          <div class="container py-5">
            <div class="row">
              <div
                class="left-text col-xs-12"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <p className="aboutuspara">
                  Gift-planning can be quite a challenging task given the hectic
                  schedules we all have, currently. So to waste no more time and
                  to bid goodbyes to all the reminders and alarms, we introduce
                  our automatic gift generation feature which keeps a track of
                  the D-day and time, releasing the appropriate gift component
                  on the desired day! Lead a guilt-free life once you choose
                  your suitable package and customize them accordingly, because
                  we at Gift’s Hub promise to deliver blissful content as and
                  when you intend us to!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
