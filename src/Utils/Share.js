import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { spacing } from "@mui/system";
import TextField from "@mui/material/TextField";
import HeaderBtn from "../Studio/HeaderBtn";
import {
  Mail,
  Twitter,
  WhatsApp,
  Facebook,
  Image,
  Create,
} from "@mui/icons-material";
import emailjs from "emailjs-com";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: spacing(1),
      width: "25ch",
    },
  },
}));
function Share({ livelink, from, to }) {
  const [showform, setshowform] = useState(false);
  const classes = useStyles();
  const [receiverEmail, setreceiverEmail] = useState();
  const [giftshub, setgiftshub] = useState("https://www.google.com/");

  const [title, settitle] = useState(
    `Dear ${to}, a gift from ${from} is waiting for you at ${livelink}. Made by ${giftshub} with love`
  );
  const [title1, settitle1] = useState(
    `Dear ${to}, a gift  is waiting for you at ${livelink}. Made by ${giftshub}`
  );

  function sendEmail(e) {
    var items = {
      to_name: to,
      from_name: from,
      to_email: receiverEmail,
      gift_link: livelink,
    };

    emailjs
      .send(
        "gifts_hub",
        "template_d9tubms",
        items,
        "user_2oABpGWP8WfHfd6Kmlto3"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  }

  return (
    <div className="App">
      <FacebookShareButton
        windowWidth="500px"
        windowHeight="500px"
        url={livelink}
        title={title1}
      >
        <HeaderBtn Icon={Facebook} title="Facebook " />
      </FacebookShareButton>
      <br />
      <TwitterShareButton
        windowWidth="500px"
        windowHeight="500px"
        url={livelink}
        title={title1}
      >
        <HeaderBtn Icon={Twitter} title="Twitter " />
      </TwitterShareButton>
      <br />
      <div>
        {" "}
        <WhatsappShareButton
          windowWidth="500px"
          windowHeight="500px"
          url={livelink}
          title={title}
          separator="::"
        >
          <HeaderBtn Icon={WhatsApp} title="Whatsapp " />
        </WhatsappShareButton>
      </div>{" "}
      <div>
        {showform ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendEmail();
            }}
            className={classes.root}
          >
            <div
              style={{
                width: "200px",

                marginTop: "20px",
              }}
              className="RightSideBar2__Btn"
            >
              <Create
                style={{
                  margin: "0 10px 0 5px",
                  color: "#ffffff",
                  fontSize: "large",
                }}
              />
              <input
                required
                style={{ width: "100%", color: "#000" }}
                type="email"
                id="email"
                name="email"
                onChange={(e) => setreceiverEmail(e.target.value)}
              />
            </div>
            <input
              style={{ display: "none" }}
              id="receiverEmail"
              type="submit"
            />
            <label htmlFor="receiverEmail">
              <HeaderBtn Icon={Image} title="Send Email " />
            </label>
          </form>
        ) : (
          <HeaderBtn
            handleClick={() => {
              setshowform(true);
            }}
            Icon={Mail}
            title="Email "
          />
        )}
      </div>
    </div>
  );
}

export default Share;
