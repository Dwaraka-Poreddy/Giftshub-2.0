import { makeStyles } from "@mui/styles";
import { spacing } from "@mui/system";
import { FlightTakeoff, Image, Share, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { BrowserView } from "react-device-detect";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Tour from "reactour";
import { v4 as uuidv4 } from "uuid";
import {
  updateDataInRealTimeDataBase,
  addDataToRealTimeDatabase,
  uploadImageAndGetDownloadURL,
} from "../Utils/firebaseUtilFunctions";
import "../Buttons.css";
import NavBar from "../NavBars/NavBar";
import HeaderBtn from "../Studio/HeaderBtn";
import Copy from "../Utils/Copy";
import CropPage from "../Utils/CropPage";
import ShareView from "../Utils/Share";
import SlidePuzzle from "./SlidePuzzle";
import SlidePuzzleAnswer from "./SlidePuzzleAnswer";
const secuseStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: spacing(0),
    },
  },
  input: {
    display: "none",
  },
}));

function SlidePuzzlePage() {
  const [showoptions, setshowoptions] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [accentColor, setaccentColor] = useState("#70cff3");
  const [showshare, setshowshare] = useState(false);
  const [livelink, setlivelink] = useState();
  const [previewlink, setpreviewlink] = useState("");
  const [realTimeDBKey, setRealTimeDBKey] = useState("");
  const [fireurl, setFireUrl] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");
  const [image_url, setimage_url] = useState();
  const [opencrop, setopencrop] = useState(false);
  const [send, setSend] = useState();
  const [loading, setloading] = useState(false);

  const [fbimg, setfbimg] = useState(
    "https://firebasestorage.googleapis.com/v0/b/update-image.appspot.com/o/imp%2Ftom-and-jerry-hd-background.jpg?alt=media&token=a5fb8323-7899-46d7-8119-16b69e1e2531"
  );

  const handlepuzzlescore = (e) => {
    console.log("Yoooo");
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSend(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setopencrop(true);
    }
  };

  const handleFireBaseUpload = async () => {
    setloading(true);
    var ud = uuidv4();
    const storedImgURL = await uploadImageAndGetDownloadURL(
      image_url,
      `/images/slidePuzzle/${ud}`
    );
    const data = {
      url: storedImgURL,
      best_score: 1000,
    };

    if (livelink) {
      updateDataInRealTimeDataBase(data, "SlidePuzzle", realTimeDBKey);
    } else {
      addDataToRealTimeDatabase(data, "SlidePuzzle")
        .then((newKey) => {
          console.log("New key:", newKey);
          setlivelink("http://update-image.web.app/live/slidepuzzle/" + newKey);
          setRealTimeDBKey(newKey);
          setpreviewlink("/live/slidepuzzle/" + newKey);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    setloading(false);
  };
  const tourConfig = [
    {
      selector: '[data-tut="reactour__changeImage"]',
      content: `“It is always the small pieces that make the big picture”
      Select the image you want to generate a puzzle out of :
      `,
    },

    {
      selector: '[data-tut="reactour__generatelink"]',
      content: `Tada! Almost done, do generate the link for enabling the various sharing options.`,
    },

    {
      selector: '[data-tut="reactour__preview"]',
      content: `Previews the component  created in a new page.`,
    },
    {
      selector: '[data-tut="reactour__copylink"]',
      content: `Copies the generated live link to clipboard.`,
    },
    {
      selector: '[data-tut="reactour__sharelink"]',
      content: `Displays options to share the live link on Facebook, WhatsApp, Twitter and Email.`,
    },
  ];
  return (
    <div>
      <NavBar />
      <Tour
        onRequestClose={() => {
          setIsTourOpen(false);
        }}
        steps={tourConfig}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <br />
      <br />
      <br />
      <div class="container-fluid pt-3 px-0">
        <div class="row editpageseditarea">
          <div class="col-lg-7 col-xl-5 mb-xs-0 mb-sm-5 mt-5 p-0  mt-0 mt-lg-4">
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <SlidePuzzle
                fbimg={fbimg}
                handlepuzzlescore={handlepuzzlescore}
              />{" "}
            </div>
          </div>
          <div
            class="col-lg-5 col-xl-4  mb-5 mb-xl-3 mt-0 mt-sm-3 mt-md-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div class=" mb-5">
              <SlidePuzzleAnswer fbimg={fbimg} />
            </div>
          </div>

          <div className="editpagesrightnav col-xl-3  mb-3">
            <BrowserView>
              <center>
                <div
                  style={{
                    justifyContent: "center",
                    padding: "20px 0 0 0 ",
                  }}
                >
                  <span style={{ color: "#ffffff" }}>
                    {" "}
                    Hello! Allow us to give you a small tour on how to generate
                    this special gift. We are sure you wouldn't need one the
                    next time you are back.
                    <br /> P.S : Its that easy
                  </span>
                  <HeaderBtn
                    handleClick={() => {
                      setIsTourOpen(true);
                    }}
                    Icon={FlightTakeoff}
                    title=" Start Tour "
                  />
                </div>
              </center>
              <hr />
            </BrowserView>

            <div style={{ padding: "20px 0 0 0 ", justifyContent: "center" }}>
              <div data-tut="reactour__changeImage">
                <center>
                  <input
                    style={{ display: "none" }}
                    accept="image/* "
                    id="LocalfileInput"
                    name="LocalfileInput"
                    multiple
                    type="file"
                    onChange={onSelectFile}
                    // onChange={(e) => {
                    //   const reader = new FileReader();
                    //   reader.addEventListener("load", () =>
                    //     setSend({ src: reader.result })
                    //   );
                    //   reader.readAsDataURL(e.target.files[0]);
                    //   console.log("now");

                    //   console.log(e.target.files[0]);
                    //   console.log("Dwarakaaa efore");
                    //   setopencrop(true);
                    // }}
                    onClick={(event) => {
                      console.log(event.target.value);
                      event.target.value = null;
                    }}
                  />
                  {opencrop ? (
                    <CropPage
                      send={send}
                      setfbimg={setfbimg}
                      setimage_url={setimage_url}
                      aspect_ratio={1 / 1}
                      opencrop={opencrop}
                      setopencrop={setopencrop}
                    />
                  ) : null}
                  <label htmlFor="LocalfileInput">
                    <HeaderBtn Icon={Image} title="Change  image " />
                  </label>
                </center>
              </div>
              <center data-tut="reactour__generatelink">
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={() => {
                      handleFireBaseUpload();
                      setshowoptions(true);
                    }}
                    className="main-button"
                    data-tut="reactour__generatelink"
                  >
                    Generate Link
                  </button>
                </div>
              </center>
              {loading ? (
                <Loader
                  type="BallTriangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              ) : (
                <center>
                  {livelink || isTourOpen ? (
                    <div>
                      <div
                        data-tut="reactour__preview"
                        style={{ marginTop: "20px" }}
                      >
                        <Link class="logo" to={previewlink} target="_blank">
                          <HeaderBtn Icon={Visibility} title="Preview " />
                        </Link>
                      </div>
                      <div
                        data-tut="reactour__copylink"
                        style={{ marginTop: "20px", width: "200px" }}
                      >
                        <Copy livelink={livelink} />
                      </div>
                      {!showshare ? (
                        <div
                          data-tut="reactour__sharelink"
                          style={{ marginTop: "20px" }}
                        >
                          <HeaderBtn
                            handleClick={() => {
                              setshowshare(true);
                            }}
                            Icon={Share}
                            title="Share "
                          />
                        </div>
                      ) : (
                        <ShareView livelink={livelink} />
                      )}
                    </div>
                  ) : null}
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlidePuzzlePage;
