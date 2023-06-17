import React, { useState, useEffect } from "react";
import SlidePuzzle from "../SlidePuzzle/SlidePuzzle";
import SlidePuzzleAnswer from "../SlidePuzzle/SlidePuzzleAnswer";
import { auth, db, fStore, storage } from "../firebase";
import { getDatabase, ref as ref1, update, get, child } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./LiveSlidePuzzle.css";
import Loader from "react-loader-spinner";
import LiveNavBar from "../NavBars/LiveNavBar";
function LiveAnimatedFramePage({ match }) {
  const { slug } = useParams();
  const [fbimg, setfbimg] = useState("");
  const [loading, setloading] = useState(true);
  const [bestscore, setbestscore] = useState();
  const [puzzlescore, setpuzzlescore] = useState(0);
  const handlepuzzlescore = (e) => {
    setpuzzlescore(e);
    if (e < bestscore) {
      const slidePuzzleRef = ref1(db, "SlidePuzzle");
      const childRef = child(slidePuzzleRef, slug);
      const updatedData = {
        url: fbimg,
        best_score: e,
      };
      update(childRef, updatedData)
        .then(() => {
          console.log("Value updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating value:", error);
        });
      setbestscore(e);
      toast.success("You bet your previous best score, Keep playing!");
    }
  };
  useEffect(async () => {
    setloading(true);
    const todoRef = ref1(db, "/SlidePuzzle/" + slug);

    get(todoRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          var img = snapshot.val().url;
          setfbimg(img);
          var bestscore = snapshot.val().best_score;
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
              <center >
                <h2>Best Score: {bestscore}</h2>
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
