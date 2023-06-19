import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Step,
  StepButton,
  Stepper,
  MobileStepper,
  Button,
  Fab,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { spacing } from "@mui/system";
import {
  CheckCircle,
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { isMobileOnly, isTablet } from "react-device-detect";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { fStore } from "../../firebase";
import { fetchDocumentFromFireStore } from "../../Utils/firebaseUtilFunctions";
// import ScheduledAboutQuizPage from "../AboutQuiz/ScheduledAboutQuizPage";
// import ScheduledAnimatedFrame from "../AnimatedFrames/ScheduledAnimatedFramePage";
// import ScheduledCalendarPage from "../Calendar/ScheduledCalendarPage";
// import ScheduledChallengePage from "../Challenge/ScheduledChallengePage";
// import ScheduledCollagePage from "../Collage/ScheduledCollagePage";
// import ScheduledCubesPage from "../Cubes/ScheduledCubesPage";
// import ScheduledEnvelopeGreetingCardPage from "../EnvelopeGreetingCard/ScheduledEnvelopeGreetingCardPage";
// import ScheduledHoneyCombPage from "../HoneyComb/ScheduledHoneyCombPage";
// import ScheduledJourneyPage from "../Journey/ScheduledJourneyPage";
// import ScheduledMagazinePage from "../Magazine/ScheduledMagazinePage";
// import ScheduledMemoryGamePage from "../MemoryGame/ScheduledMemoryGamePage";
import NavBar from "../../NavBars/NavBar";
// import ScheduledNewsPaperPage from "../NewsPaper/ScheduledNewsPaperPage";
// import ScheduledOpenGreetingCardPage from "../OpenGreetingCard/ScheduledOpenGreetingCardPage";
import ScheduledSlidePuzzlePage from "../../SlidePuzzle/ScheduledSlidePuzzlePage";
// import ScheduledSpecialCardPage from "../SpecialCard/ScheduledSpecialCardPage";
// import ScheduledSwatchBookPage from "../SwatchBook/ScheduledSwatchBookPage";
// import ScheduledThreeDCarouselPage from "../ThreeDCarousel/ScheduledThreeDCarouselPage";
// import ScheduledThreeDImagePage from "../ThreeDImage/ScheduledThreeDImagePage";
import Copy from "../../Utils/Copy";
import Share from "../../Utils/Share";
import "./ContinuePack.css";
const usemodStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "5px",
    width: "70vw",
    height: "80vh",
    maxWidth: "840px",
    minWidth: "280px",
    position: "absolute",
    color: "#ffffff",
    marginTop: "0vh",
    border: null,
    // backgroundColor: "#009dd9",
    overflow: "auto",
    padding: spacing(0, 0, 0),
  },
  DelBut: {
    position: "sticky",
    bottom: spacing(142),
    left: spacing(250),
  },
}));

function ContinuePack() {
  const theme = useTheme();
  const { slug } = useParams();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch({
      type: "EDIT_SCHEDULED",
      payload: { text: "" },
    });
    if (completed[activeStep + 1] == true) {
      var splits = dataurl[activeStep + 1].split("/");
      dispatch({
        type: "EDIT_SCHEDULED",
        payload: { text: splits[5] },
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    dispatch({
      type: "EDIT_SCHEDULED",
      payload: { text: "" },
    });
    if (completed[activeStep - 1] == true) {
      var splits = dataurl[activeStep - 1].split("/");
      dispatch({
        type: "EDIT_SCHEDULED",
        payload: { text: splits[5] },
      });
    }
  };
  const [maxSteps, setmaxSteps] = useState();
  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const modclasses = usemodStyles();
  const [loading, setloading] = useState(true);
  const [slag, setslag] = useState(slug);
  const [livelink, setlivelink] = useState();
  const [showshare, setshowshare] = useState(false);
  const [data1, setdata1] = useState();
  const [daycounter, setdaycounter] = useState();
  const [datacontent, setdatacontent] = useState([]);
  const [dataid, setdataid] = useState([]);
  const [dataurl, setdataurl] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await getDocFromFStore(user.uid);
        setloading(false);
      }
    });
  }, []);

  async function getDocnew() {
    dataurl.map((item, index) => {
      if (item != "") {
        const newCompleted = completed;
        newCompleted[index] = true;
        setCompleted(newCompleted);
      }
    });
    for (var i = 0; i < dataurl.length; i++) {
      if (dataurl[i] == "") {
        setActiveStep(i);
        break;
      }
    }

    dispatch({
      type: "EDIT_SCHEDULED",
      payload: { text: "" },
    });
    if (allStepsCompleted()) {
      var splits = dataurl[activeStep].split("/");
      dispatch({
        type: "EDIT_SCHEDULED",
        payload: { text: splits[5] },
      });
    }
  }

  async function getDocFromFStore(useruid) {
    setloading(true);
    if (!useruid) {
      useruid = user.uid;
    }
    console.log("useridif", useruid);

    const docRef = doc(fStore, "n-day-pack", useruid, "giftshub", slug);
    const datanew = await fetchDocumentFromFireStore(docRef);
    if (datanew) {
      setdata1(datanew);
      const data = datanew.array_data;
      setdaycounter(data.length - activeStep - 1);
      setmaxSteps(data.length);
      data.forEach((item, index) => {
        datacontent[index] = item.content;
        dataid[index] = item.id;
        dataurl[index] = item.url;
      });
    } else {
      console.error("Error fetching document data");
    }

    await getDocnew();
    setloading(false);

    setlivelink("http://update-image.web.app/scheduledlive/main/" + `${slug}`);

    await getDocnew();
  }
  const setTourOpend = (e) => {
    setIsTourOpen(e);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    button: {
      marginRight: spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: spacing(1),
      marginBottom: spacing(1),
    },
  }));
  const Browview = () => {
    return (
      <div class="col-lg-6 sharebannertext">
        {" "}
        <p>
          {" "}
          Hello! Allow us to give you a small tour on how to generate this
          special gift. We are sure you wouldn't need one the next time you are
          back.
          <br /> P.S : Its that easy
        </p>
        <center>
          <div
            style={{
              margin: "auto",
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // MsTransform: "translateY(-50%) translateX(-50%)",
              // transform: "translateY(-50%) translateX(-50%)",
            }}
          >
            <button
              onClick={() => {
                setIsTourOpen(true);
              }}
              className="main-button"
            >
              Start Tour
            </button>
          </div>
        </center>
      </div>
    );
  };
  function getSteps() {
    return datacontent;
  }

  function getStepContent(step) {
    // if (dataid[step] === "challenge") {
    //   return (
    //     <ScheduledChallengePage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "aboutquiz") {
    //   return (
    //     <ScheduledAboutQuizPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "honeycomb") {
    //   return (
    //     <ScheduledHoneyCombPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "magazine") {
    //   return (
    //     <ScheduledMagazinePage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "calendar") {
    //   return (
    //     <ScheduledCalendarPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "threedcarousel") {
    //   return (
    //     <ScheduledThreeDCarouselPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "journey") {
    //   return (
    //     <ScheduledJourneyPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "swatchbook") {
    //   return (
    //     <ScheduledSwatchBookPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    if (dataid[step] === "puzzle") {
      return (
        <ScheduledSlidePuzzlePage
          isTourOpen={isTourOpen}
          setTourOpend={setTourOpend}
          step={step}
          slug={slag}
          getDoc={getDocFromFStore}
        />
      );
    }
    // if (dataid[step] === "animatedframe") {
    //   return (
    //     <ScheduledAnimatedFrame
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "specialcard") {
    //   return (
    //     <ScheduledSpecialCardPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "memorygame") {
    //   return (
    //     <ScheduledMemoryGamePage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "collage") {
    //   return (
    //     <ScheduledCollagePage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "cubes") {
    //   return (
    //     <ScheduledCubesPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "newspaper") {
    //   return (
    //     <ScheduledNewsPaperPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "threedimage") {
    //   return (
    //     <ScheduledThreeDImagePage
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //     />
    //   );
    // }
    // if (dataid[step] === "greetingcard") {
    //   return (
    //     <ScheduledOpenGreetingCardPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
    // if (dataid[step] === "envelopegreetingcard") {
    //   return (
    //     <ScheduledEnvelopeGreetingCardPage
    //       isTourOpen={isTourOpen}
    //       setTourOpend={setTourOpend}
    //       step={step}
    //       slug={slag}
    //       getDoc={getDocFromFStore}
    //     />
    //   );
    // }
  }
  const Stepperclasses = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    setdaycounter(dataurl.length - step - 1);
    dispatch({
      type: "EDIT_SCHEDULED",
      payload: { text: "" },
    });
    if (completed[step] == true) {
      var splits = dataurl[step].split("/");
      dispatch({
        type: "EDIT_SCHEDULED",
        payload: { text: splits[5] },
      });
    }
  };

  const horizontalStepper = () => {
    return (
      <div>
        <div className={Stepperclasses.root}>
          {!loading ? (
            <div>
              <div className="Laptopstepper">
                <div className="container px-0">
                  <Stepper
                    className="px-0"
                    alternativeLabel
                    nonLinear
                    activeStep={activeStep}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={handleStep(index)}
                          completed={completed[index]}
                        >
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </div>
              </div>
              <div className="mobilestepper">
                <Paper square elevation={0}>
                  <Typography className="text-center">
                    {datacontent[activeStep]}
                    {completed[activeStep] && (
                      <CheckCircle style={{ color: "green" }} />
                    )}
                  </Typography>
                </Paper>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  variant="text"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </div>
            </div>
          ) : (
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={100}
              width={100}
            />
          )}

          <div>
            {allStepsCompleted() && !loading ? (
              <div>
                <Typography
                  className={`text-center ${Stepperclasses.instructions}`}
                >
                  All Componenets completed - you&apos;re finished
                  <center>
                    {" "}
                    {daycounter == 0 ? (
                      <h1 className="ndaystogo">The Big day is here !!!</h1>
                    ) : daycounter == 1 ? (
                      <h1 className="ndaystogo">{daycounter} day to go !!!</h1>
                    ) : (
                      <h1 className="ndaystogo">{daycounter} days to go !!!</h1>
                    )}
                  </center>
                  {!loading && getStepContent(activeStep)}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography
                  className={`text-center ${Stepperclasses.instructions}`}
                >
                  <center>
                    {" "}
                    {daycounter == 0 ? (
                      <h1 className="ndaystogo">The Big day is here !!!</h1>
                    ) : daycounter == 1 ? (
                      <h1 className="ndaystogo">{daycounter} day to go !!!</h1>
                    ) : (
                      <h1 className="ndaystogo">{daycounter} days to go !!!</h1>
                    )}
                  </center>
                  {!loading && getStepContent(activeStep)}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ textAlign: "justify" }}>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Gifts Hub - Edit Your Pack Page</title>
        <meta
          name="description"
          content="Now that you have chosen the perfect gifts for your loved one, take one step further and customize them with your love."
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
      <br />
      <br />
      <br />
      <div style={{ backgroundColor: "#d3d3d3" }} class="container">
        <div class="row sharebanner">
          <div class="col-lg-6 sharebannertext">
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information. only
              one link for all components
            </p>
            <center>
              <div
                style={{
                  margin: "auto",
                }}
              >
                <button
                  onClick={() => {
                    setshowshare(true);
                    setopenModal(true);
                  }}
                  className="main-button"
                  data-tut="reactour__sharelink"
                >
                  Share
                </button>

                {!showshare ? null : (
                  <Modal
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginRight: "auto",
                      overflow: "hidden",
                      alignItems: "center",
                    }}
                    open={openModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {
                      <div className={modclasses.paper}>
                        <div>
                          <div
                            style={{ backgroundColor: "#ffffff" }}
                            class="container-fluid p-4"
                          >
                            <div>
                              <div>
                                <center>
                                  <div style={{ width: "200px" }}>
                                    <Copy livelink={livelink} />
                                  </div>
                                  <Share
                                    livelink={livelink}
                                    to={data1.To_name}
                                    from={data1.From_name}
                                  />
                                </center>
                              </div>
                            </div>
                          </div>
                          <Fab
                            onClick={() => {
                              setopenModal(false);
                              setshowshare(false);
                            }}
                            className={modclasses.DelBut}
                            color="primary"
                            aria-label="add"
                          >
                            <Close />
                          </Fab>
                        </div>
                      </div>
                    }
                  </Modal>
                )}
              </div>
            </center>
            <br />
          </div>
          {isMobileOnly ? null : isTablet ? null : Browview()}
        </div>
      </div>

      {horizontalStepper()}
    </div>
  );
}

export default ContinuePack;
