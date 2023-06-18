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
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const LandingPage = lazy(() => import("./LandingPage/LandingPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const SlidePuzzlePage = lazy(() => import("./SlidePuzzle/SlidePuzzlePage"));
const LiveSlidePuzzle = lazy(() => import("./LivePages/LiveSlidePuzzle"));
const Home = lazy(() => import("./pages/Home/Home"));
const ContinuePack = lazy(() => import("./pages/ContinuePack/ContinuePack"));
const RocommendedHome = lazy(() => import("./pages/RocommendedHome/RocommendedHome"));
const ValentineHome = lazy(() => import("./pages/ValentineHome"));
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
// const LiveSpecialCard = lazy(() => import("./LivePages/LiveSpecialCard"));
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
// const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
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
            element={<ThreeDCarouselPage />}
          />
          <Route
            
            path="/violetgreetingcard"
            element={<VioletGreetingCard />}
          /> */ }
          {/* <Route
            
            path="/envelopegreetingcard"
            element={<EnvelopeGreetingCard />}
          />
          {{/* <Route
            
            path="/browngreetingcard"
            element={<BrownGreetingCard />}
          /> */ }
          {/* <Route  path="/samplegifts" element={<SampleGifts />} />
          <Route  path="/challengePage" element={<ChallengePage />} />
          <Route  path="/challenge" element={<Challenge />} /> */ }
          <Route path="/aboutus" element={<AboutUs /> } />
          {/* <Route  path="/aboutquizpage" element={<AboutQuizPage />} />
          <Route  path="/journeypage" element={<JourneyPage />} />
          <Route  path="/calendarpage" element={<CalendarPage />} />
          <Route  path="/swatchbookpage" element={<SwatchBookPage />} /> */ }
          <Route  path="/" element={<LandingPage />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/register/complete" element={<RegisterComplete />} />
          <Route  path="/slidepuzzlepage" element={<SlidePuzzlePage />} />
          <Route path="*" element={<Error404Page />} />
          <Route  path="/home" element={<Home />} />
          <Route  path="/ContinuePack/:slug" element={<ContinuePack />} />
          <Route  path="/recommendedhome" element={<RocommendedHome />} />
          <Route  path="/valentinehome" element={<ValentineHome />} />
          {/* <Route  path="/animatedframe" element={<AnimatedFrame />} />
          <Route  path="/userpackspage" element={<UserPacksPage />} />
          <Route  path="/forgot/password" element={<ForgotPassword />} />
          <Route  path="/memorygamepage" element={<MemoryGamePage />} />
          <Route  path="/collagepage" element={<CollagePage />} />
          <Route  path="/newspaperpage" element={<NewsPaperPage />} />
          <Route  path="/cubespage" element={<CubesPage />} />
          <Route  path="/honeycombpage" element={<HoneyCombPage />} />
          <Route  path="/magazinepage" element={<MagazinePage />} /> */ }
          {/* <Route
            
            path="/opengreetingcardpage"
            element={<OpenGreetingCardPage />}
          />
          <Route
            
            path="/envelopegreetingcardpage"
            element={<EnvelopeGreetingCardPage />}
          />
          <Route  path="/specialcardpage" element={<SpecialCardPage />} />
          <Route
            
            path="/splitwallimagePage"
            element={<SplitWallImagePage />}
          /> */ }
          {/* <Route  path="/threedimagepage" element={<ThreeDImagePage />} />
          <Route
            
            path="/animatedframePage"
            element={<AnimatedFramePage />}
          />
          <Route
            
            path="/live/threedcarousel/:slug"
            element={<LiveThreeDCarousel />}
          />
          <Route  path="/live/challenge/:slug" element={<LiveChallenge />} />
          <Route  path="/live/aboutquiz/:slug" element={<LiveAboutQuiz />} />
          <Route  path="/live/journey/:slug" element={<LiveJourney />} />
          <Route  path="/live/calendar/:slug" element={<LiveCalendar />} />
          <Route
            
            path="/live/swatchbook/:slug"
            element={<LiveSwatchBook />}
          />
          <Route  path="/live/splitwall/:slug" element={<LiveSplitWall />} /> */ }
          {/* <Route
            
            path="/live/specialcard/:slug"
            element={<LiveSpecialCard />}
          /> */ }
          <Route
            
            path="/live/slidepuzzle/:slug"
            element={<LiveSlidePuzzle />}
          />
          {/* <Route
            
            path="/live/threedimage/:slug"
            element={<LiveThreeDImage />}
          /> */ }
          {/* <Route  path="/live/newspaper/:slug" element={<LiveNewsPaper />} /> */ }
          {/* <Route
            
            path="/live/opengreetingcard/:slug"
            element={<LiveOpenGreetingCard />}
          /> */ }
          {/* <Route
            
            path="/live/envelopegreetingcard/:slug"
            element={<LiveEnvelopeGreetingCard />}
          /> */ }
          {/* <Route  path="/live/honeycomb/:slug" element={<LiveHoneyComb />} />
          <Route  path="/live/cubes/:slug" element={<LiveCubesPage />} /> */ }
          {/* <Route
            
            path="/live/memorygame/:slug"
            element={<LiveMemoryGame />}
          /> */ }
          {/* <Route  path="/live/collage/:slug" element={<LiveCollage />} />
          <Route
            
           path="/live/animatedframe/:slug"
           element={<LiveAnimatedFramePage />}
          /> */ }
         {/* <Route  path="/live/magazine/:slug" element={<LiveMagazine />} />
           <Route
           
             path="/scheduledlive/aboutquiz/:id/:slug"
             element={<ScheduledLiveAboutQuiz />}
          /> */ }
          {/* <Route
            
            path="/scheduledlive/challenge/:id/:slug"
            element={<ScheduledLiveChallenge />}
          />
          <Route
            
            path="/scheduledlive/honeycomb/:id/:slug"
            element={<ScheduledLiveHoneyComb />}
          />
          <Route
            
            path="/scheduledlive/magazine/:id/:slug"
            element={<ScheduledLiveMagazine />}
          />
          <Route
            
            path="/scheduledlive/threedcarousel/:id/:slug"
            element={<ScheduledLiveThreeDCarousel />}
          />
          <Route
            
            path="/scheduledlive/threedimage/:id/:slug"
            element={<ScheduledLiveThreeDImagePage />}
          />
          <Route
            
            path="/scheduledlive/animatedframe/:id/:slug"
            element={<ScheduledLiveAnimatedFrame />}
          /> */ }
          {/* <Route
            
            path="/scheduledlive/specialcard/:id/:slug"
            element={<ScheduledLiveSpecialCard />}
          />
          <Route
            
            path="/scheduledlive/swatchbook/:id/:slug"
            element={<ScheduledLiveSwatchBook />}
          />
          <Route
            
            path="/scheduledlive/journey/:id/:slug"
            element={<ScheduledLiveJourney />}
          />
          <Route
            
            path="/scheduledlive/newspaper/:id/:slug"
            element={<ScheduledLiveNewsPaper />}
          />
          <Route
            
            path="/scheduledlive/cubes/:id/:slug"
            element={<ScheduledLiveCubes />}
          />
          <Route
            
            path="/scheduledlive/main/:slug"
            element={<ScheduledLiveMainPage />}
          />
          <Route
            
            path="/scheduledlive/opengreetingcard/:id/:slug"
            element={<ScheduledLiveOpenGreetCard />}
          /> */ }
          {/* <Route
            
            path="/scheduledlive/envelopegreetingcard/:id/:slug"
            element={<ScheduledLiveEnvelopeGreetCard />}
          />
          <Route
            
            path="/scheduledlive/slidepuzzle/:id/:slug"
            element={<ScheduledLiveSlidePuzzle />}
          />
          <Route
            
            path="/scheduledlive/memorygame/:id/:slug"
            element={<ScheduledLiveMemoryGame />}
          />
          <Route
            
            path="/scheduledlive/collage/:id/:slug"
            element={<ScheduledLiveCollage />}
          />
          <Route
            
            path="/scheduledlive/calendar/:id/:slug"
            element={<ScheduledLiveCalendar />}
          /> */ }
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
