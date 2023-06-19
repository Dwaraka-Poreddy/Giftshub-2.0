import React, { useState, useCallback, useRef, useEffect } from "react";
import HeaderBtn from "../Studio/HeaderBtn";
import { Modal, Fab } from "@mui/material";
import ReactCrop from "react-image-crop";
import { makeStyles } from "@mui/styles";
import { Image, Close } from "@mui/icons-material";
import CryptoJS from "crypto-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-crop/dist/ReactCrop.css";
const useStyles = makeStyles({
  paper: {
    borderRadius: "5px",
    width: "80vw",
    height: "auto",
    minWidth: "320px",
    maxWidth: "840px",
    position: "absolute",
    color: "#ffffff",
    marginTop: "0vh",
    marginBottom: "0vh",
    border: null,
    backgroundColor: "#009dd9",
    padding: "0 0 0 0",
  },
  DelBut: {
    position: "sticky",
    bottom: "142",
    left: "250",
  },
});

function setCanvasImage(image, canvas, crop) {
  if (!crop || !canvas || !image) {
    return;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");
  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );
}

function CropPage({
  encryptionKey,
  send,
  setfbimg,
  setEncryptedImgUrl,
  aspect_ratio,
  setopencrop,
  opencrop,
}) {
  const classes = useStyles();
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const def = {
    unit: "%",
    width: 50,
    aspect: aspect_ratio,
  };
  const [crop, setCrop] = useState(def);

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  function getResizedCanvas(canvas, newWidth, newHeight) {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight
    );

    return tmpCanvas;
  }
  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return Promise.reject("Invalid arguments");
    }

    return new Promise((resolve, reject) => {
      const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
      var base64Image = canvas.toDataURL("image/jpeg", 1.0);
      resolve(base64Image);
      setfbimg(base64Image);
      const imageBytes = CryptoJS.enc.Utf8.parse(base64Image);
      const encryptedImage_url = CryptoJS.AES.encrypt(
        imageBytes,
        encryptionKey
      ).toString();
      setEncryptedImgUrl(encryptedImage_url);
      setopencrop(false);
    });
  }

  return (
    <div>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "auto",
          alignItems: "center",
        }}
        open={opencrop}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div className={classes.paper}>
            <div>
              <br />
              <br />
              <br />
              <center>
                <ReactCrop
                  imageStyle={{
                    minWidth: "290px",
                    maxWidth: "800px",
                    maxHeight: "450px",
                    width: "100%",
                  }}
                  src={send}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              </center>
              <div style={{ display: "none" }}>
                <canvas
                  ref={previewCanvasRef}
                  style={
                    {
                      // width: Math.round(completedCrop?.width ?? 0),
                      // height: Math.round(completedCrop?.height ?? 0),
                    }
                  }
                />
              </div>
              <div>
                <center>
                  <div>
                    {" "}
                    <HeaderBtn
                      handleClick={() => {
                        generateDownload(
                          previewCanvasRef.current,
                          completedCrop
                        )
                      }}
                      Icon={Image}
                      title=" Use cropped image"
                    />
                  </div>
                </center>
              </div>
            </div>

            <Fab
              onClick={() => {
                setopencrop(false);
              }}
              className={classes.DelBut}
              color="primary"
              aria-label="add"
            >
              <Close />
            </Fab>
          </div>
        }
      </Modal>
    </div>
  );
}

export default CropPage;
