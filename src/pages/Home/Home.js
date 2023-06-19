import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  ImageOutlined,
  CheckBoxOutlined,
  FolderSharedOutlined,
  Cake,
} from "@mui/icons-material";
import { addDataToFirestore } from "../../Utils/firebaseUtilFunctions";
import CropPage from "../../Utils/CropPage";
import { v4 as uuidv4 } from "uuid";
import NPackSelect from "../NPackSelect/NPackSelect";
import NPackSelectMobile from "../NPackSelectMobile/NPackSelectMobile";
import NavBar from "../../NavBars/NavBar";
import Footer from "../../Footers/Footer";
import Loader from "react-loader-spinner";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { isMobileOnly, isTablet } from "react-device-detect";
import { Helmet } from "react-helmet";
import "./Home.css";
const Home = () => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [npackorder, setnpackorder] = useState([]);
  const [Folder_name, setFolder_name] = useState();
  const [From_name, setFrom_name] = useState();
  const [To_name, setTo_name] = useState();
  const [gifts, setGifts] = useState([]);
  const [error, setError] = useState();
  const [opencrop, setopencrop] = useState(false);
  const [send, setSend] = useState();
  const [fbimg, setfbimg] = useState();
  const [encryptedImgUrl, setEncryptedImgUrl] = useState();
  const [encryptionKey, setEncryptionKey] = useState();
  const [wishes, setwishes] = useState("");
  const [Bday_date, setBday_date] = useState(Date.now());
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const enKey = uuidv4();
    setEncryptionKey(enKey);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate, user]);

  const setpackfunc = (selected) => {
    setnpackorder(selected);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSend(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setopencrop(true);
    }
  };
  const CreatePack = async (e) => {
    setloading(true);

    try {
      const nPackDocId = await addDataToFirestore({
        Folder_name: Folder_name,
        wishes: wishes,
        fbimg: encryptedImgUrl,
        encryptionKey: encryptionKey,
        Bday_date: Bday_date,
        From_name: From_name,
        To_name: To_name,
        array_data: npackorder,
        parent_collection: "n-day-pack",
        parent_document: user.uid,
        child_collection: "giftshub",
        addData: true,
      });

      const liveLinksDocId = await addDataToFirestore({
        Folder_name: Folder_name,
        wishes: wishes,
        fbimg: encryptedImgUrl,
        encryptionKey: encryptionKey,
        Bday_date: Bday_date,
        From_name: From_name,
        To_name: To_name,
        array_data: npackorder,
        parent_collection: "Livelinks",
        parent_document: nPackDocId,
        addData: false,
      });

      navigate(`/ContinuePack/${nPackDocId}`);
      setloading(false);
    } catch (error) {
      console.error("Error Creating Pack: ", error);
      setloading(false);
    }
  };

  const browview = () => {
    return <NPackSelect setpackfunc={setpackfunc} />;
  };
  const mobview = () => {
    return <NPackSelectMobile setpackfunc={setpackfunc} />;
  };
  return (
    <div>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Gifts Hub - Create Your Pack Page</title>
        <meta
          name="description"
          content="We offer standard as well as custom made packages, suitable for your requirements and the hectic schedule you are in!!!"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="valentine,greetings,gifts for all,gifs,gifthub,giftshub, personalised, gifts, customized, scheduled, virtual , free,e-gift, online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india, pack, gifting, free, valentines, love, n-day pack, we at gifts, valentines pack, recommended pack, gifts hub"
        />
        <meta name="language" content="EN" />
      </Helmet>
      <NavBar />
      <br />
      <br /> <br />
      <br />
      <div class="container inputmodal">
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3 pt-3">
            <Grid
              style={{ width: "100%" }}
              container
              spacing={1}
              alignItems="flex-end"
              className="mx-auto"
            >
              <Grid item>
                <FolderSharedOutlined style={{ fill: "rgb(66 66 66)" }} />
              </Grid>
              <Grid style={{ width: "80%" }} item>
                <TextField
                  fullWidth="true"
                  required
                  InputLabelProps={{
                    style: { color: "rgb(66 66 66)" },
                  }}
                  id="input-with-icon-grid"
                  label="Folder Name"
                  value={Folder_name}
                  onChange={(e) => setFolder_name(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div className="col-sm-6  col-md-4 col-lg-3 pt-3">
            <Grid
              style={{ width: "100%" }}
              container
              spacing={1}
              alignItems="flex-end"
              className="mx-auto"
            >
              <Grid item>
                <AccountCircleOutlined style={{ fill: "rgb(66 66 66)" }} />
              </Grid>
              <Grid style={{ width: "80%" }} item>
                <TextField
                  fullWidth="true"
                  InputLabelProps={{
                    style: { color: "rgb(66 66 66)" },
                  }}
                  id="input-with-icon-grid"
                  label="Your Name"
                  value={From_name}
                  onChange={(e) => setFrom_name(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <div className="col-sm-6  col-md-4 col-lg-3 pt-3">
            <Grid
              style={{ width: "100%" }}
              container
              spacing={1}
              alignItems="flex-end"
              className="mx-auto"
            >
              <Grid item>
                <AccountCircleOutlined style={{ fill: "rgb(66 66 66)" }} />
              </Grid>
              <Grid style={{ width: "80%" }} item>
                <TextField
                  fullWidth="true"
                  InputLabelProps={{
                    style: { color: "rgb(66 66 66)" },
                  }}
                  id="input-with-icon-grid"
                  label="Receivers Name"
                  value={To_name}
                  onChange={(e) => setTo_name(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <div className="col-sm-6  col-md-4 col-lg-3 pt-3">
            <Grid
              style={{ width: "100%" }}
              container
              spacing={1}
              alignItems="flex-end"
              className="mx-auto"
            >
              <Grid style={{ width: "80%" }} item>
                <TextField
                  fullWidth="true"
                  id="date"
                  label="Event Date*"
                  type="date"
                  value={Bday_date}
                  defaultValue={Bday_date}
                  onChange={(e) =>
                    setBday_date(e.target.value.toLocaleString())
                  }
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "rgb(66 66 66)" },
                  }}
                />
              </Grid>
            </Grid>
          </div>{" "}
          <br />
          <div className="container">
            <div className="row">
              <div className="col-sm-6 pt-3 ml-0 ml-sm-n2">
                <center>
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-end"
                    style={{ width: "100%" }}
                  >
                    <Grid item>
                      <Cake style={{ fill: "rgb(66 66 66)" }} />
                    </Grid>
                    <Grid style={{ width: "80%" }} item>
                      <TextField
                        fullWidth="true"
                        InputLabelProps={{
                          style: { color: "rgb(66 66 66)" },
                        }}
                        id="input-with-icon-grid"
                        placeholder="Many more Happy Returns of the day"
                        label="Wishes"
                        value={wishes}
                        onChange={(e) => setwishes(e.target.value)}
                        required
                      />
                    </Grid>
                  </Grid>
                </center>
              </div>
              <div className="col-sm-6   pt-4">
                <input
                  required
                  style={{ display: "none" }}
                  accept="image/* "
                  id="ImageInput"
                  name="ImageInput"
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
                <label htmlFor="ImageInput">
                  <div
                    style={{
                      height: "45px",
                      width: "210px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgb(66 66 66)",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {send ? (
                      <CheckBoxOutlined
                        style={{
                          fill: "rgb(66 66 66)",
                          marginLeft: "7px",
                        }}
                      />
                    ) : (
                      <ImageOutlined
                        style={{
                          fill: "rgb(66 66 66)",
                          marginLeft: "7px",
                        }}
                      />
                    )}
                    <h2
                      style={{
                        fontSize: "18px",
                        color: "rgb(66 66 66)",
                        marginLeft: "8px",
                        marginBottom: "0",
                      }}
                    >
                      {send ? "Image added" : "Add your image *"}{" "}
                    </h2>{" "}
                  </div>
                </label>
              </div>
              <br />
              <br />
            </div>
          </div>{" "}
        </div>
      </div>
      <br />
      <div>
        {loading ? (
          <center>
            {" "}
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={300}
              width={300}
            />
          </center>
        ) : (
          <div className="container">
            <form onSubmit={CreatePack}>
              <div>
                <center>
                  {isMobileOnly ? mobview() : isTablet ? mobview() : browview()}
                </center>
              </div>
              <br />
              <center>
                {npackorder.length != 0 &&
                Bday_date &&
                Folder_name &&
                From_name &&
                To_name &&
                wishes &&
                fbimg ? (
                  <>
                    <input
                      style={{ display: "none" }}
                      id="submit"
                      type="submit"
                      value="Create n day pack"
                    />
                    <label htmlFor="submit">
                      <button className="main-button">
                        {" "}
                        Create {npackorder.length} day pack
                      </button>
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      disabled
                      style={{ display: "none" }}
                      id="submit"
                      type="submit"
                      value="Create 7 day pack"
                    />
                    <label style={{ opacity: "0.4" }} htmlFor="submit">
                      <button
                        disabled
                        style={{ cursor: "default" }}
                        className="main-button"
                      >
                        {" "}
                        Create {npackorder.length} day pack
                      </button>
                    </label>
                  </>
                )}{" "}
              </center>
            </form>
          </div>
        )}
      </div>{" "}
      <br />
      <Footer />
    </div>
  );
};

export default Home;
