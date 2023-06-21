import React, { useState, useEffect } from "react";
import SlidePuzzle from "../SlidePuzzle/SlidePuzzle";
import SlidePuzzleAnswer from "../SlidePuzzle/SlidePuzzleAnswer";
import {
  updateDataInRealTimeDataBase,
  getDataFromRealtimeDatabase,
  decryptedData,
} from "../Utils/firebaseUtilFunctions";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./LiveSlidePuzzle.css";
import Loader from "react-loader-spinner";
import LiveNavBar from "../NavBars/LiveNavBar";
function LiveAnimatedFramePage() {
  const { slug } = useParams();
  const [fbimg, setfbimg] = useState("");
  const [loading, setloading] = useState(true);
  const [bestscore, setbestscore] = useState();
  const [theEncryptionKey, setTheEncryptionKey] = useState();
  const [encryptedImage, setEncryptedImage] = useState();
  const [puzzlescore, setpuzzlescore] = useState(0);
  const handlepuzzlescore = (e) => {
    setpuzzlescore(e);
    if (e < bestscore) {
      const data = {
        url: encryptedImage,
        theEncryptionKey: theEncryptionKey,
        best_score: e,
      };
      updateDataInRealTimeDataBase(data, "SlidePuzzle", slug);
      setbestscore(e);
      toast.success("You bet your previous best score, Keep playing!");
    }
  };
  useEffect(async () => {
    setloading(true);

    getDataFromRealtimeDatabase(`/SlidePuzzle/${slug}`)
      .then((data) => {
        if (data) {
          console.log("data::: ", data);
          setTheEncryptionKey(data.theEncryptionKey);
          setEncryptedImage(data.url)
          setfbimg(decryptedData(data.url, data.encryptionKey));
          var bestscore = data.best_score;
          setbestscore(bestscore);
          console.log("Data from the database:", data);
        } else {
          console.log("No data available.");
        }
      })
      .catch((error) => {
        console.error("Error reading data:", error);
      });

    setloading(false);
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <LiveNavBar />
      <br />
      <br />
      <br />
      <div class="container-fluid pt-3 m-auto">
        {loading ? (
          <center>
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </center>
        ) : (
          <center>
            {bestscore != 100000 && (
              <center>
                <h2>Your best score: {bestscore}</h2>
              </center>
            )}
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
                class="col-lg-6 mb-5 mb-xl-3 mt-0 mt-sm-3 mt-md-0"
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
          </center>
        )}
      </div>
    </div>
  );
}

export default LiveAnimatedFramePage;
