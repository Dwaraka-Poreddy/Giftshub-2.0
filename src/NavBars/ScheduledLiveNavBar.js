import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc } from "firebase/firestore";
import { fStore } from "../firebase";
import { useParams } from "react-router-dom";
import { fetchDocumentFromFireStore } from "../Utils/firebaseUtilFunctions";
import "./NavBar.css";
function ScheduledLiveNavBar() {
  const { slug } = useParams();
  const { daystep } = useSelector((state) => ({ ...state }));
  const [dataurl, setdataurl] = useState([]);
  const [navstate, setnavstate] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setnavstate(true);
    } else {
      setnavstate(false);
    }
  };
  async function getDocDataFromFireStore() {
    const docRef = doc(fStore, "Livelinks", slug);
    const datanew = await fetchDocumentFromFireStore(docRef)
    console.log("NAVBARRR DATA: ", datanew);
    if (datanew) {
      datanew.array_data.map((item, index) => {
        dataurl[index] = item.url;
      });
      console.log("NAVBARRR DATAURLLLL: ", dataurl);
    } else {
      console.error("Error fetching document data");
    }
  }
  useEffect(async () => {
    await getDocDataFromFireStore();
  }, []);

  return (
    <div>
      <nav
        class={
          !navstate
            ? "navbar navbar-expand-lg navbar-dark fixed-top"
            : "navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink"
        }
        id="mainNav"
      >
        <div class="container">
          <a class="navbar-brand js-scroll-trigger" href={`/`}>
            <img src={require("../Images/giftshublogo.png")} alt="" />
          </a>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars ml-1"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav text-uppercase ml-auto">
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="https://update-image.web.app/aboutus/">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={`nav-link js-scroll-trigger active ${(daystep == null)}`}
                  href={`/scheduledlive/main/${slug}`}
                >
                  Home
                </a>
              </li>
              {dataurl.map((item, index) => {
                if (item != "") {
                  if (index == daystep.day - 1) {
                    return (
                      <li class="nav-item ">
                        <a
                          class="nav-link js-scroll-trigger active"
                          href={item}
                        >
                          Day {index + 1}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li class="nav-item ">
                      <a class="nav-link js-scroll-trigger" href={item}>
                        Day {index + 1}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default ScheduledLiveNavBar;
