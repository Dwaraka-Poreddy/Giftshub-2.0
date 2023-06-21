import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import {
  ImageOutlined,
  AccountCircleOutlined,
  FolderSharedOutlined,
  CheckBoxOutlined,
  FavoriteBorder,
  Cake,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import CropPage from "../Utils/CropPage";
import { addDataToFirestore } from "../Utils/firebaseUtilFunctions";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Loader from "react-loader-spinner";
import NavBar from "../NavBars/NavBar";
import Footer from "../Footers/Footer";
import { TextField, Grid } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "../Buttons.css";
import "./Home/Home.css";
import { Helmet } from "react-helmet";
const useStyles = makeStyles((theme) => ({
  margin: {},
  paper: {
    borderRadius: "5px",
    width: "100%",
    maxWidth: "320px",
    minWidth: "280px",
    position: "absolute",
    color: "#ffffff",
    marginTop: "0vh",
    border: null,
    padding: spacing(0, 0, 0),
  },
  DelBut: {
    position: "sticky",
    bottom: spacing(142),
    left: spacing(250),
    backgroundColor: "#fb7777",
    margin: "5px",
    color: "#ffffff",
    width: "35px",
    height: "35px",
  },
}));

function ValentineHome({ history }) {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));
  const { days_page } = useSelector((state) => ({ ...state }));
  const [valentinepackorder, setvalentinepackorder] = useState([
    { id: "cubes", ismailsent: false, content: " 3D Heart", url: "" },
    { id: "threedimage", ismailsent: false, content: "3D Image", url: "" },
    {
      id: "specialcard",
      ismailsent: false,
      content: "Special Card",
      url: "",
    },
    {
      id: "journey",
      ismailsent: false,
      content: "Journey",
      url: "",
    },
    { id: "newspaper", ismailsent: false, content: "NewsPaper", url: "" },
    { id: "puzzle", ismailsent: false, content: "Slide Puzzle", url: "" },
    {
      id: "animatedframe",
      ismailsent: false,
      content: "Animated Frame ",
      url: "",
    },
    {
      id: "memorygame",
      ismailsent: false,
      content: "Memory Game",
      url: "",
    },
    {
      id: "honeycomb",
      ismailsent: false,
      content: " Honey Comb ",
      url: "",
    },

    { id: "collage", ismailsent: false, content: "Collage", url: "" },
    {
      id: "threedcarousel",
      ismailsent: false,
      content: "3D Carousel",
      url: "",
    },
    {
      id: "greetingcard",
      ismailsent: false,
      content: "Greeting Card",
      url: "",
    },
    {
      id: "envelopegreetingcard",
      ismailsent: false,
      content: "Envelope Card",
      url: "",
    },
    {
      id: "aboutquiz",
      ismailsent: false,
      content: "About Quiz",
      url: "",
    },
    {
      id: "challenge",
      ismailsent: false,
      content: "Challenge",
      url: "",
    },
  ]);

  const [Folder_name, setFolder_name] = useState();
  const [From_name, setFrom_name] = useState();
  const [To_name, setTo_name] = useState();
  const [gifts, setGifts] = useState([]);
  const [error, setError] = useState();
  const [openModal, setopenModal] = useState(true);
  const [opencrop, setopencrop] = useState(false);
  const [send, setSend] = useState();
  const [fbimg, setfbimg] = useState();
  const [imageAsFile, setImageAsFile] = useState("");
  const [encryptionKey, setEncryptionKey] = useState();
  const [encryptedImgUrl, setEncryptedImgUrl] = useState();
  const [wishes, setwishes] = useState("");
  const [Bday_date, setBday_date] = useState();

  useEffect(() => {
    const enKey = uuidv4();
    setEncryptionKey(enKey);
  }, []);

  $(document).ready(function() {
    $(".card").hover(
      function() {
        $(this).removeClass("shadow-none");
        $(this).addClass("shadow");
      },
      function() {
        $(this).removeClass("shadow");
        $(this).addClass("shadow-none");
      }
    );
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate, user]);

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
    e.preventDefault();

    try {
      var selectedpackorder = [...valentinepackorder];

      const nPackDocId = await addDataToFirestore({
        Folder_name: Folder_name,
        wishes: wishes,
        fbimg: encryptedImgUrl,
        encryptionKey: encryptionKey,
        Bday_date: Bday_date,
        From_name: From_name,
        To_name: To_name,
        array_data: selectedpackorder,
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
        array_data: selectedpackorder,
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
    dispatch({
      type: "REDIRECT_USER",
      payload: {
        days_redirect: "Valentines",
      },
    });
  };

  return (
    <div>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Gifts Hub - Valentines Pack Page</title>
        <meta
          name="description"
          content="All you need is love. Checkout this valentines pack and spread the love for 14 days straight before the special day."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="valentine,greetings,gifts for all,gifs,gifthub,giftshub, personalised, gifts, customized, scheduled, virtual , free,e-gift, online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india,"
        />
        <meta name="language" content="EN" />
      </Helmet>
      <NavBar />
      <br />
      <br />
      <br />

      <div class="container inputmodal my-5 mx-auto">
        <div className="row mx-auto mt-5 p-5">
          <div className="col-sm-6 col-md-4 col-lg-3 p-3">
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
          <div className="col-sm-6  col-md-4 col-lg-3 p-3">
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
          <div className="col-sm-6  col-md-4 col-lg-3 p-3">
            <Grid
              style={{ width: "100%" }}
              container
              spacing={1}
              alignItems="flex-end"
              className="mx-auto"
            >
              <Grid item>
                <FavoriteBorder style={{ fill: "rgb(66 66 66)" }} />
              </Grid>
              <Grid style={{ width: "80%" }} item>
                <TextField
                  fullWidth="true"
                  InputLabelProps={{
                    style: { color: "rgb(66 66 66)" },
                  }}
                  id="input-with-icon-grid"
                  label="Valentine's Name"
                  value={To_name}
                  onChange={(e) => setTo_name(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <div className="col-sm-6  col-md-4 col-lg-3 p-3">
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
                  label="Event Date"
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

      <form onSubmit={CreatePack} className="mx-auto my-3">
        <center>
          {Bday_date &&
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
                value="Create 7 day pack"
              />
              <label htmlFor="submit">
                <button className="main-button createvalentinesdaypack">
                  {" "}
                  Create Valentines day pack
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
                  className="main-button  createvalentinesdaypack"
                >
                  {" "}
                  Create Valentines day pack
                </button>
              </label>
            </>
          )}{" "}
        </center>
      </form>

      {loading ? (
        <Loader
          type="Hearts"
          color="#f77a7a"
          height={300}
          width={300}
          className="loadanim"
        />
      ) : (
        <div>{error ? <p>Ops, there is an error :(</p> : null}</div>
      )}
      <br />
      <Footer />
    </div>
  );
}

export default ValentineHome;
