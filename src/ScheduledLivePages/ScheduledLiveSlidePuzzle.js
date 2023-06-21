import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ScheduledLiveNavBar from "../NavBars/ScheduledLiveNavBar";
import { doc } from "firebase/firestore";
import { fStore } from "../firebase";
import {
  updateDataInRealTimeDataBase,
  getDataFromRealtimeDatabase,
  fetchDocumentFromFireStore,
  decryptedData,
} from "../Utils/firebaseUtilFunctions";
import SlidePuzzle from "../SlidePuzzle/SlidePuzzle";
import SlidePuzzleAnswer from "../SlidePuzzle/SlidePuzzleAnswer";
import CircleTimer from "./CircleTimer";
import "./ScheduledLiveSlidePuzzle.css";
function ScheduledLiveSlidePuzzle() {
  const { slug, id } = useParams();
  let dispatch = useDispatch();
  const [fbimg, setfbimg] = useState("");
  const [Livelinks, setLivelinks] = useState("");
  const [loading, setloading] = useState(true);
  const [dataurl, setdataurl] = useState([]);
  const [decryptionKey, setDecryptionKey] = useState();
  const [encryptedImage, setEncryptedImage] = useState();
  const [today, settoday] = useState();
  const [bestscore, setbestscore] = useState();
  const [puzzlescore, setpuzzlescore] = useState(0);
  const handlepuzzlescore = (e) => {
    setpuzzlescore(e);
    if (e < bestscore) {
      const data = {
        url: encryptedImage,
        best_score: e,
      };
      updateDataInRealTimeDataBase(data, "SlidePuzzle", slug);
      setbestscore(e);
      toast.success("You bet your previous best score, Keep playing!");
    }
  };

  async function getDocDataFromFireStore() {
    const docRef = doc(fStore, "Livelinks", slug);
    const datanew = await fetchDocumentFromFireStore(docRef);
    if (datanew) {
      setLivelinks(datanew);
      setDecryptionKey(datanew.encryptionKey);
      datanew.array_data.map((item, index) => {
        if (item.id == "puzzle") {
          settoday(index);
          dispatch({
            type: "ACTIVE_STEP",
            payload: { day: index + 1 },
          });
        }
        dataurl[index] = item.url;
      });
      return datanew.encryptionKey;
    } else {
      console.error("Error fetching document data");
      return null;
    }
  }
  useEffect(async () => {
    setloading(true);

    const keyForDecryption = await getDocDataFromFireStore();
    if(keyForDecryption){
    getDataFromRealtimeDatabase(`/SlidePuzzle/${id}`)
    .then((data) => {
      if (data) {
        setEncryptedImage(data.url);
        setfbimg(decryptedData(data.url,
          keyForDecryption));
        var bestscore = data.best_score;
        setbestscore(bestscore);
      } else {
        console.log("No data available.");
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
  } else {
    toast.error("Could not fetch the data")
  }
    setloading(false);
  }, []);

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    var difference =
      +new Date(Livelinks.Bday_date) -
      +new Date() -
      19800000 -
      86400000 * (dataurl.length - today);
    console.log(difference, "difference");
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  // });
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <ScheduledLiveNavBar slug={slug} />

      <div class="container-fluid pt-3">
        <br />
        <br />
        <br />
        <div class="row">
          <div class="col-lg-12">
            {loading ? (
              <Loader
                type="BallTriangle"
                color="#fdc674"
                height={100}
                width={100}
              />
            ) : (
              <div>
                {new Date(Livelinks.Bday_date) -
                  +new Date() -
                  19800000 -
                  86400000 * (dataurl.length - today) >
                0 ? (
                  <div>
                    <h5 className="example"> This Gift opens in </h5>
                    <CircleTimer
                      Bday={
                        +new Date(Livelinks.Bday_date) -
                        +new Date() -
                        19800000 -
                        86400000 * (dataurl.length - today - 1)
                      }
                    />
                  </div>
                ) : (
                  <>
                    <center>
                      {" "}
                      {dataurl.length - today - 1 == 0 ? (
                        <h1 className="example">The Big day is here !!!</h1>
                      ) : dataurl.length - today - 1 == 1 ? (
                        <h1 className="example">
                          {dataurl.length - today - 1} day to go !!!
                        </h1>
                      ) : (
                        <h1 className="example">
                          {dataurl.length - today - 1} days to go !!!
                        </h1>
                      )}
                    </center>
                    <center>
                      {bestscore != 100000 && (
                        <center>
                          <h2>Your best score: {bestscore}</h2>
                        </center>
                      )}
                    </center>
                    <div class="row">
                      <div class="col-lg-6 mb-xs-0 mb-sm-5 mt-5">
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <SlidePuzzle
                            handlepuzzlescore={handlepuzzlescore}
                            fbimg={fbimg}
                          />
                        </div>
                      </div>
                      <div
                        class="col-lg-6  mb-5 mb-xl-3 mt-0 mt-sm-3 mt-md-0"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <div>
                          <SlidePuzzleAnswer fbimg={fbimg} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledLiveSlidePuzzle;
