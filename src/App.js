import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getAuth } from "firebase/auth";
import { auth } from "./firebase";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import Error404Page from "./Error404Page";
const AboutUs = lazy(() => import("./AboutUs"));
const LandingPage = lazy(() => import("./LandingPage/LandingPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
// const UserPacksPage = lazy(() => import("./UserPages/UserPacksPage"));
// const ThreeDCarouselPage = lazy(() =>
//   import("./ThreeDCarousel/ThreeDCarouselPage")
// );
// const VioletGreetingCard = lazy(() =>
//   import("./VioletGreetingCard/VioletGreetingCard")
// );
// // const EnvelopeGreetingCard = lazy(() =>
// //   import("./EnvelopeGreetingCard/EnvelopeGreetingCard")
// // );
// const BrownGreetingCard = lazy(() =>
//   import("./BrownGreetingCard/BrownGreetingCard")
// );
// const Challenge = lazy(() => import("./Challenge/Challenge"));
// const ChallengePage = lazy(() => import("./Challenge/ChallengePage"));
// const AboutQuizPage = lazy(() => import("./AboutQuiz/AboutQuizPage"));
// const JourneyPage = lazy(() => import("./Journey/JourneyPage"));
// const SwatchBookPage = lazy(() => import("./SwatchBook/SwatchBookPage"));
// const CalendarPage = lazy(() => import("./Calendar/CalandarPage"));
// const SampleGifts = lazy(() => import("./SampleGifts/SampleGifts"));
// const MagazinePage = lazy(() => import("./Magazine/MagazinePage"));
// const NewsPaperPage = lazy(() => import("./NewsPaper/NewsPaperPage"));
// const CollagePage = lazy(() => import("./Collage/CollagePage"));
// const CubesPage = lazy(() => import("./Cubes/CubesPage"));
// const OpenGreetingCardPage = lazy(() =>
//   import("./OpenGreetingCard/OpenGreetingCardPage")
// );
// const EnvelopeGreetingCardPage = lazy(() =>
//   import("./EnvelopeGreetingCard/EnvelopeGreetingCardPage")
// );
// const LiveEnvelopeGreetingCard = lazy(() =>
//   import("./LivePages/LiveEnvelopeGreetingCard")
// );
// const LiveOpenGreetingCard = lazy(() =>
//   import("./LivePages/LiveOpenGreetingCard")
// );
// const AnimatedFrame = lazy(() => import("./AnimatedFrames/AnimatedFrame"));
// const AnimatedFramePage = lazy(() =>
//   import("./AnimatedFrames/AnimatedFramePage")
// );
// const SpecialCardPage = lazy(() => import("./SpecialCard/SpecialCardPage"));
// const MemoryGamePage = lazy(() => import("./MemoryGame/MemoryGamePage"));
// const SplitWallImagePage = lazy(() =>
//   import("./SplitWallImage/SplitWallImagePage.js")
// );
// const LiveHoneyComb = lazy(() => import("./LivePages/LiveHoneyComb"));
// const LiveChallenge = lazy(() => import("./LivePages/LiveChallenge"));
// const LiveCalendar = lazy(() => import("./LivePages/LiveCalendar"));
// const LiveThreeDCarousel = lazy(() => import("./LivePages/LiveThreeDCarousel"));
// const LiveJourney = lazy(() => import("./LivePages/LiveJourney"));
// const LiveAboutQuiz = lazy(() => import("./LivePages/LiveAboutQuiz"));
// const LiveSwatchBook = lazy(() => import("./LivePages/LiveSwatchBook"));
// const LiveSplitWall = lazy(() => import("./LivePages/LiveSplitWall.js"));
// const LiveThreeDImage = lazy(() => import("./LivePages/LiveThreeDImage"));
// const LiveSlidePuzzle = lazy(() => import("./LivePages/LiveSlidePuzzle"));
// const LiveSpecialCard = lazy(() => import("./LivePages/LiveSpecialCard"));
// const SlidePuzzlePage = lazy(() => import("./SlidePuzzle/SlidePuzzlePage"));
// const HoneyCombPage = lazy(() => import("./HoneyComb/HoneyCombPage"));
// const ThreeDImagePage = lazy(() => import("./ThreeDImage/ThreeDImagePage"));
// const LiveCubesPage = lazy(() => import("./LivePages/LiveCubesPage"));
// const LiveNewsPaper = lazy(() => import("./LivePages/LiveNewsPaper"));
// const LiveAnimatedFramePage = lazy(() =>
//   import("./LivePages/LiveAnimatedFramePage")
// );
// const LiveMagazine = lazy(() => import("./LivePages/LiveMagazine"));
// const LiveMemoryGame = lazy(() => import("./LivePages/LiveMemoryGame"));
// const LiveCollage = lazy(() => import("./LivePages/LiveCollage"));
// const SevenDayHome = lazy(() => import("./pages/SevenDayHome"));
// const ValentineHome = lazy(() => import("./pages/ValentineHome"));
// const Home = lazy(() => import("./pages/Home"));


// const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// const ContinuePack = lazy(() => import("./pages/ContinuePack"));
// const ScheduledLiveHoneyComb = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveHoneyComb")
// );
// const ScheduledLiveChallenge = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveChallenge")
// );
// const ScheduledLiveMagazine = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveMagazine")
// );
// const ScheduledLiveCalendar = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveCalendar")
// );
// const ScheduledLiveAboutQuiz = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveAboutQuiz")
// );
// const ScheduledLiveThreeDCarousel = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveThreeDCarousel")
// );
// const ScheduledLiveJourney = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveJourney")
// );
// const ScheduledLiveSwatchBook = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveSwatchBook")
// );
// const ScheduledLiveAnimatedFrame = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveAnimatedFrame")
// );
// const ScheduledLiveSpecialCard = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveSpecialCard")
// );
// const ScheduledLiveCollage = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveCollage")
// );
// const ScheduledLiveMemoryGame = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveMemoryGame")
// );
// const ScheduledLiveSlidePuzzle = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveSlidePuzzle")
// );
// const ScheduledLiveNewsPaper = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveNewsPaper")
// );
// const ScheduledLiveThreeDImagePage = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveThreeDImage")
// );
// const ScheduledLiveOpenGreetCard = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveOpenGreetCard")
// );
// const ScheduledLiveEnvelopeGreetCard = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveEnvelopeGreetCard")
// );
// const ScheduledLiveCubes = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveCubes")
// );
// const ScheduledLiveMainPage = lazy(() =>
//   import("./ScheduledLivePages/ScheduledLiveMainPage")
// );

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
            uid: user.uid,
            profilepic: user.photoURL,
          },
        });
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <div className="App">
      {/* <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Gifts Hub - Free Personalized Virtual Gifting</title>
        <meta
          name="description"
          content="Gifts manifest our emotions. In this digital age GiftsHub aim in providing you several ways of wishing your loved ones."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content=" personalised, gifts, customized, scheduled, virtual , free,e-gift, online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india,"
        />
        <meta name="language" content="EN" />
      </Helmet> */}
      <Suspense
        fallback={
          <div className="col text-center p-5">
            <h1> Gifts' Hub Website On The Way...</h1>
            <img src={require("./Images/giftgif.webm")} alt="starting gif" />
            {/* <LoadingOutlined /> */}
          </div>
         }
      >
        <ToastContainer />
        <Routes>
          {/* <Route
            
            path="/threedcarouselpage"
            component={<ThreeDCarouselPage />}
          />
          <Route
            
            path="/violetgreetingcard"
            component={<VioletGreetingCard />}
          /> */ }
          {/* <Route
            
            path="/envelopegreetingcard"
            component={<EnvelopeGreetingCard />}
          />
          {{/* <Route
            
            path="/browngreetingcard"
            component={<BrownGreetingCard />}
          /> */ }
          {/* <Route  path="/samplegifts" component={<SampleGifts />} />
          <Route  path="/challengePage" component={<ChallengePage />} />
          <Route  path="/challenge" component={<Challenge />} /> */ }
          <Route path="/aboutus" element={<AboutUs /> } />
          {/* <Route  path="/aboutquizpage" component={<AboutQuizPage />} />
          <Route  path="/journeypage" component={<JourneyPage />} />
          <Route  path="/calendarpage" component={<CalendarPage />} />
          <Route  path="/swatchbookpage" component={<SwatchBookPage />} /> */ }
          <Route  path="/" element={<LandingPage />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/register/complete" element={<RegisterComplete />} />
          {/* <Route  path="/animatedframe" component={<AnimatedFrame />} />
          <Route  path="/userpackspage" component={<UserPacksPage />} />
          <Route  path="/home" component={<Home />} />
          <Route  path="/recommendedhome" component={<SevenDayHome />} />
          <Route  path="/valentinehome" component={<ValentineHome />} />
          <Route  path="/ContinuePack/:slug" component={<ContinuePack />} />
          <Route  path="/forgot/password" component={<ForgotPassword />} />
          <Route  path="/memorygamepage" component={<MemoryGamePage />} />
          <Route  path="/collagepage" component={<CollagePage />} />
          <Route  path="/newspaperpage" component={<NewsPaperPage />} />
          <Route  path="/cubespage" component={<CubesPage />} />
          <Route  path="/slidepuzzlepage" component={<SlidePuzzlePage />} />
          <Route  path="/honeycombpage" component={<HoneyCombPage />} />
          <Route  path="/magazinepage" component={<MagazinePage />} /> */ }
          {/* <Route
            
            path="/opengreetingcardpage"
            component={<OpenGreetingCardPage />}
          />
          <Route
            
            path="/envelopegreetingcardpage"
            component={<EnvelopeGreetingCardPage />}
          />
          <Route  path="/specialcardpage" component={<SpecialCardPage />} />
          <Route
            
            path="/splitwallimagePage"
            component={<SplitWallImagePage />}
          /> */ }
          {/* <Route  path="/threedimagepage" component={<ThreeDImagePage />} />
          <Route
            
            path="/animatedframePage"
            component={<AnimatedFramePage />}
          />
          <Route
            
            path="/live/threedcarousel/:slug"
            component={<LiveThreeDCarousel />}
          />
          <Route  path="/live/challenge/:slug" component={<LiveChallenge />} />
          <Route  path="/live/aboutquiz/:slug" component={<LiveAboutQuiz />} />
          <Route  path="/live/journey/:slug" component={<LiveJourney />} />
          <Route  path="/live/calendar/:slug" component={<LiveCalendar />} />
          <Route
            
            path="/live/swatchbook/:slug"
            component={<LiveSwatchBook />}
          />
          <Route  path="/live/splitwall/:slug" component={<LiveSplitWall />} /> */ }
          {/* <Route
            
            path="/live/specialcard/:slug"
            component={<LiveSpecialCard />}
          /> */ }
          {/* <Route
            
            path="/live/slidepuzzle/:slug"
            component={<LiveSlidePuzzle />}
          /> */ }
          {/* <Route
            
            path="/live/threedimage/:slug"
            component={<LiveThreeDImage />}
          /> */ }
          {/* <Route  path="/live/newspaper/:slug" component={<LiveNewsPaper />} /> */ }
          {/* <Route
            
            path="/live/opengreetingcard/:slug"
            component={<LiveOpenGreetingCard />}
          /> */ }
          {/* <Route
            
            path="/live/envelopegreetingcard/:slug"
            component={<LiveEnvelopeGreetingCard />}
          /> */ }
          {/* <Route  path="/live/honeycomb/:slug" component={<LiveHoneyComb />} />
          <Route  path="/live/cubes/:slug" component={<LiveCubesPage />} /> */ }
          {/* <Route
            
            path="/live/memorygame/:slug"
            component={<LiveMemoryGame />}
          /> */ }
          {/* <Route  path="/live/collage/:slug" component={<LiveCollage />} />
          <Route
            
           path="/live/animatedframe/:slug"
           component={<LiveAnimatedFramePage />}
          /> */ }
         {/* <Route  path="/live/magazine/:slug" component={<LiveMagazine />} />
           <Route
           
             path="/scheduledlive/aboutquiz/:id/:slug"
             component={<ScheduledLiveAboutQuiz />}
          /> */ }
          {/* <Route
            
            path="/scheduledlive/challenge/:id/:slug"
            component={<ScheduledLiveChallenge />}
          />
          <Route
            
            path="/scheduledlive/honeycomb/:id/:slug"
            component={<ScheduledLiveHoneyComb />}
          />
          <Route
            
            path="/scheduledlive/magazine/:id/:slug"
            component={<ScheduledLiveMagazine />}
          />
          <Route
            
            path="/scheduledlive/threedcarousel/:id/:slug"
            component={<ScheduledLiveThreeDCarousel />}
          />
          <Route
            
            path="/scheduledlive/threedimage/:id/:slug"
            component={<ScheduledLiveThreeDImagePage />}
          />
          <Route
            
            path="/scheduledlive/animatedframe/:id/:slug"
            component={<ScheduledLiveAnimatedFrame />}
          /> */ }
          {/* <Route
            
            path="/scheduledlive/specialcard/:id/:slug"
            component={<ScheduledLiveSpecialCard />}
          />
          <Route
            
            path="/scheduledlive/swatchbook/:id/:slug"
            component={<ScheduledLiveSwatchBook />}
          />
          <Route
            
            path="/scheduledlive/journey/:id/:slug"
            component={<ScheduledLiveJourney />}
          />
          <Route
            
            path="/scheduledlive/newspaper/:id/:slug"
            component={<ScheduledLiveNewsPaper />}
          />
          <Route
            
            path="/scheduledlive/cubes/:id/:slug"
            component={<ScheduledLiveCubes />}
          />
          <Route
            
            path="/scheduledlive/main/:slug"
            component={<ScheduledLiveMainPage />}
          />
          <Route
            
            path="/scheduledlive/opengreetingcard/:id/:slug"
            component={<ScheduledLiveOpenGreetCard />}
          /> */ }
          {/* <Route
            
            path="/scheduledlive/envelopegreetingcard/:id/:slug"
            component={<ScheduledLiveEnvelopeGreetCard />}
          />
          <Route
            
            path="/scheduledlive/slidepuzzle/:id/:slug"
            component={<ScheduledLiveSlidePuzzle />}
          />
          <Route
            
            path="/scheduledlive/memorygame/:id/:slug"
            component={<ScheduledLiveMemoryGame />}
          />
          <Route
            
            path="/scheduledlive/collage/:id/:slug"
            component={<ScheduledLiveCollage />}
          />
          <Route
            
            path="/scheduledlive/calendar/:id/:slug"
            component={<ScheduledLiveCalendar />}
          />
          <Route path="*" component={<Error404Page />} /> */ }
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
