import React, { Fragment, useEffect, useState } from "react";
import "./UserPacksPage.css";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchUserAllPackData, decryptedData } from "../Utils/firebaseUtilFunctions";
import NavBar from "../NavBars/NavBar";
import Footer from "../Footers/Footer";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { fStore } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
const options = {
  position: "top-center",
  style: {
    color: "#fff",
    backgroundColor: "#fb6e6e",
  },
};

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'black',
    },
  },
}));

function UserPacksPage() {
  const classes = useStyles();
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [gifts, setGifts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const [deletePackId, setDeletePackIdset] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await getPrevious(user.uid);
      }
    });
  }, [navigate, user]);
  const getPrevious = async (useruid) => {
    setloading(true);

    fetchUserAllPackData(useruid)
      .then((fetchedGifts) => {
        setGifts(fetchedGifts);
        setloading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeleteDialogleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogleOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeletePack = async (id) => {
    console.log("trying to deleete", id);
    setGifts((prevgifts) => {
      return prevgifts.filter((giftitem) => {
        console.log(giftitem.id);
        return giftitem.id !== id;
      });
    });

    try {
      const docRef = doc(fStore, "n-day-pack", user.uid, "giftshub", id);
      await deleteDoc(docRef);
      console.log("Document successfully deleted from ndaypack!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }

    try {
      const docRef = doc(fStore, "Livelinks", id);
      await deleteDoc(docRef);
      console.log("Document successfully deleted from Livelinks!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
    setOpenDeleteDialog(false);
    toast.success("Pack deleted succesfully ", options);
  };
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
  return (
    <div>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Gifts Hub - Your Packs Page</title>
        <meta
          name="description"
          content="Create as any many free gifts as you like and never stop surprising your loved ones with our marvellous gifts."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="valentine,greetings,gifts for all,gifs,gifthub,giftshub, personalised, gifts, customized, scheduled, virtual , free,e-gift, online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india, pack, gifting, free, valentines, love, n-day pack, we at gifts, valentines pack, recommended pack, gifts hub"
        />
        <meta name="language" content="EN" />
      </Helmet>
      <NavBar />

      <div className="userspacks py-5">
        <ul className="py-5">
          {gifts.map((gift, index) => (
            <div>
              <div class="container">
                <div class="card">
                  <h5 class="card-header userpackscardheader">
                    {" "}
                    <div class="row">
                      <div class="col-6">{decryptedData(gift.Folder_name, gift.encryptionKey)}</div>{" "}
                      <div class="col-6">{decryptedData(gift.Bday_date, gift.encryptionKey).toLocaleString()}</div>{" "}
                    </div>
                  </h5>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-3 p-0 ">
                        <div class="container-fluid">
                          <div class="row">
                            <div className="userpackspkname" class="col-12  ">
                              <h4 className="userpackspknametext">
                                {decryptedData(gift.To_name, gift.encryptionKey).substring(0, 10)}
                              </h4>
                            </div>
                            <div class="col-6 col-md-12">
                              <div class="col-12">
                                <Link
                                  class="logo"
                                  to={`/scheduledlive/main/${gift.id}`}
                                  target="_blank"
                                >
                                  <h2 id="userpackspreview"> Preview </h2>
                                </Link>
                              </div>
                            </div>

                            <div class="col-6 col-md-12">
                              <div
                                onClick={() => {
                                  setDeletePackIdset(gift.id)
                                  handleDeleteDialogleOpen();
                                }}
                                class="col-12"
                              >
                                <h2 id="userpacksdelete">Delete</h2>
                              </div>
                              <Dialog
                                open={openDeleteDialog}
                                onClose={handleDeleteDialogleClose}
                                classes={{ paper: classes.dialogContainer }}
                                BackdropProps={{ invisible: true }}
                              >
                                <DialogTitle>Delete this pack?</DialogTitle>
                                <DialogContent>
                                  <p className="text-danger">
                                  This can not be undone
                                  </p>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleDeleteDialogleClose}>
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      handleDeletePack(deletePackId)}}
                                    color="error"
                                  >
                                    Delete
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-7 p-0 ">
                        {" "}
                        <div class="container-fluid">
                          <div class="row">
                            {gift.array_data.map((c) => (
                              <div
                                style={{
                                  border: "none",
                                }}
                                class="col-6 col-md-4  p-0 m-0 "
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    textAlign: "justify",
                                  }}
                                >
                                  {c.url ? (
                                    <CheckCircle className="userpacksdoneicon" />
                                  ) : (
                                    <img
                                      className="userpackspendingimg"
                                      src={require("../Images/iconcopy.png")}
                                      alt=""
                                    />
                                  )}
                                  <h2 className="userpacksitems">
                                    {" "}
                                    {c.content}
                                  </h2>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2">
                        {" "}
                        <div>
                          <center>
                            <br />
                            <Link to={`/ContinuePack/${gift.id}`}>
                              <button class="main-button userpacksproceed">
                                Proceed
                              </button>
                            </Link>{" "}
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          ))}
        </ul>{" "}
      </div>
      <Footer />
    </div>
  );
}

export default UserPacksPage;
