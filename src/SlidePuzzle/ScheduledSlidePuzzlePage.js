import { makeStyles } from "@mui/styles";
import { spacing } from "@mui/system";
import { Image, Visibility } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import Tour from "reactour";
import { v4 as uuidv4 } from "uuid";
import "../Buttons.css";
import { fStore } from "../firebase";
import { doc } from "firebase/firestore";
import {
  fetchDocumentFromFireStore,
  updateFirestoreVariable,
  updateDataInRealTimeDataBase,
  getDataFromRealtimeDatabase,
  addDataToRealTimeDatabase,
} from "../Utils/firebaseUtilFunctions";
import HeaderBtn from "../Studio/HeaderBtn";
import Copy from "../Utils/Copy";
import CropPage from "../Utils/CropPage";
import SlidePuzzle from "./SlidePuzzle";
import SlidePuzzleAnswer from "./SlidePuzzleAnswer";
const secuseStyles = makeStyles(() => ({
  root: {
    "& > *": {
      margin: spacing(0),
    },
  },
  input: {
    display: "none",
  },
}));

function ScheduledSlidePuzzlePage({
  step,
  slug,
  getDoc,
  isTourOpen,
  setTourOpend,
}) {
  const [showoptions, setShowoptions] = useState(false);
  const [accentColor, setaccentColor] = useState("#70cff3");
  let { edit } = useSelector((state) => ({ ...state }));
  const [Cloading, setCLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const secclasses = secuseStyles();
  const [livelink, setlivelink] = useState();
  const [previewlink, setpreviewlink] = useState("");
  const [encryptedImgUrl, setEncryptedImgUrl] = useState();
  const [encryptionKey, setEncryptionKey] = useState();
  const [opencrop, setopencrop] = useState(false);
  const [send, setSend] = useState();
  const [bestscore, setbestscore] = useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [fbimg, setfbimg] = useState(
    "https://firebasestorage.googleapis.com/v0/b/update-image.appspot.com/o/imp%2Ftom-and-jerry-hd-background.jpg?alt=media&token=a5fb8323-7899-46d7-8119-16b69e1e2531"
  );

  useEffect(() => {
    const enKey = uuidv4();
    setEncryptionKey(enKey)
  }, []);

  const handlepuzzlescore = (e) => {
    console.log("Yoooo");
  };

  useEffect(() => {
    setCLoading(true);
    if (edit.text != "") {
      getDataFromRealtimeDatabase(`/SlidePuzzle/${edit.text}`).then((data) => {
        if (data) {
          setEncryptionKey(data.encryptionKey);
          setEncryptedImgUrl(data.url)
          const decryptedBytes = CryptoJS.AES.decrypt(
            data.url,
            data.encryptionKey
          );
          const decryptedImageURL = CryptoJS.enc.Utf8.stringify(decryptedBytes);
          setfbimg(decryptedImageURL);
          var bestscore = data.best_score;
          setbestscore(bestscore);
          console.log("Data from the database:", data);
        } else {
          console.log("No data available.");
        }
      });
      setlivelink(
        "http://update-image.web.app/scheduledlive/slidepuzzle/" +
          edit.text +
          "/" +
          slug
      );
      setpreviewlink("/scheduledlive/slidepuzzle/" + edit.text + "/" + slug);
      setShowoptions(true);
    }
    setCLoading(false);
  }, []);
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
    var data;
    if (!encryptedImgUrl) {
      data = {
        url: fbimg,
        encryptionKey: encryptionKey,
        best_score: 1000,
      };
    } else {
      data = {
        url: encryptedImgUrl,
        encryptionKey: encryptionKey,
        best_score: 1000,
      };
    }

    if (edit.text != "") {
      updateDataInRealTimeDataBase(data, "SlidePuzzle", edit.text);

      setlivelink(
        "http://update-image.web.app/scheduledlive/slidepuzzle/" +
          edit.text +
          "/" +
          slug
      );
      setpreviewlink("/scheduledlive/slidepuzzle/" + edit.text + "/" + slug);
      setloading(false);
    } else if (!livelink) {
      addDataToRealTimeDatabase(data, "SlidePuzzle").then(async (newKey) => {
        setlivelink(
          "http://update-image.web.app/scheduledlive/slidepuzzle/" +
            newKey +
            "/" +
            slug
        );
        setpreviewlink("/scheduledlive/slidepuzzle/" + newKey + "/" + slug);

        const docRef = doc(fStore, "n-day-pack", user.uid, "giftshub", slug);
        const datanew = await fetchDocumentFromFireStore(docRef);
        if (datanew) {
          const data = datanew.array_data;
          const newdata = data;
          newdata[step].url =
            "http://update-image.web.app/scheduledlive/slidepuzzle/" +
            newKey +
            "/" +
            slug;

          try {
            await updateFirestoreVariable({
              parent_collection: "n-day-pack",
              parent_document: user.uid,
              child_collection: "giftshub",
              child_document: slug,
              variableToUpdate: "array_data",
              updatedValue: newdata,
            });

            await updateFirestoreVariable({
              parent_collection: "Livelinks",
              parent_document: slug,
              variableToUpdate: "array_data",
              updatedValue: newdata,
            });
          } catch (error) {
            console.error("Error updating data: ", error);
            return [];
          }
        } else {
          console.error("Error fetching document data");
        }
      });

      toast.success("Slide Puzzle successfully added to your pack");
      getDoc();
      setloading(false);
    }
    {
      edit.text != "" && toast.success("Slide Puzzle updated successfully");
    }
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
      selector: '[data-tut="reactour__addtopack"]',
      content: `Adds this component to the n-day pack you created`,
    },
    {
      selector: '[data-tut="reactour__updatepack"]',
      content: `Updates this component with the changes you made in the n-day pack.`,
    },
    {
      selector: '[data-tut="reactour__sharelink"]',
      content: `Displays options to share the live link on Facebook, WhatsApp, Twitter and Email.`,
    },
  ];

  return (
    <div>
      <Tour
        onRequestClose={() => {
          setTourOpend(false);
        }}
        steps={tourConfig}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <div class="container-fluid pt-3 px-0">
        <div class="row editpageseditarea">
          <div class="col-lg-7 col-xl-5 mb-xs-0 mb-sm-5 mt-5 p-0">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              {Cloading ? (
                <Loader
                  type="BallTriangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              ) : (
                <SlidePuzzle
                  fbimg={fbimg}
                  handlepuzzlescore={handlepuzzlescore}
                />
              )}
            </div>
          </div>
          <div
            class="col-md-5 col-xl-4 mb-5 mb-lg-0 mt-0 mt-sm-3 mt-md-0 "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {" "}
            <div>{Cloading ? null : <SlidePuzzleAnswer fbimg={fbimg} />}</div>
          </div>

          <div className="editpagesrightnav col-xl-3 mb-3">
            <div style={{ padding: "20px 0 0 0 ", justifyContent: "center" }}>
              <div data-tut="reactour__changeImage">
                <center>
                  <input
                    style={{ display: "none" }}
                    accept="image/* "
                    className={secclasses.input}
                    id="LocalfileInput"
                    name="LocalfileInput"
                    multiple
                    type="file"
                    onChange={onSelectFile}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                  />
                  {opencrop ? (
                    <CropPage
                    encryptionKey={encryptionKey}
                    send={send}
                    setfbimg={setfbimg}
                    setEncryptedImgUrl={setEncryptedImgUrl}
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
              <center>
                {loading ? (
                  <Loader
                    type="BallTriangle"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                ) : (
                  <div style={{ marginTop: "20px" }}>
                    {edit.text == "" || isTourOpen ? (
                      <button
                        className="main-button"
                        onClick={() => {
                          handleFireBaseUpload();
                          setShowoptions(true);
                        }}
                        data-tut="reactour__generatelink"
                      >
                        Add to pack
                      </button>
                    ) : null}
                    {edit.text != "" || isTourOpen ? (
                      <button
                        className="main-button"
                        onClick={() => {
                          handleFireBaseUpload();
                          setShowoptions(true);
                        }}
                        data-tut="reactour__updatepack"
                      >
                        Update pack
                      </button>
                    ) : null}
                  </div>
                )}
              </center>
              <center>
                {(livelink && showoptions && !loading) || isTourOpen ? (
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
                      style={{ width: "200px", marginTop: "20px" }}
                    >
                      <Copy livelink={livelink} />
                    </div>
                  </div>
                ) : null}
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledSlidePuzzlePage;
