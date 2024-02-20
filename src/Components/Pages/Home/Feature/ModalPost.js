import React, { useState } from "react";
import { Modal, Button, AutoComplete, Input } from "antd";
import { Avatar, Box, Divider, Typography, Slider } from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Cropper from "react-easy-crop";

const ModalPost = (props) => {
  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}`;
  };

  // Working with the Cropped function
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { url } = await props.getCroppedImg(
        props.postImage,
        croppedAreaPixels,
        rotation
      );
      props.setPreviewImage(url);
      props.onUpload(url);
    } catch (error) {}
    props.setImageCropped(true);
  };

  return (
    <Modal
      title="Create new post"
      centered
      visible={props.visible}
      onOk={() => props.setVisible(false)}
      onCancel={() => props.setVisible(false)}
      width={850}
      footer={null}
    >
      {props.postState ? (
        <div className="successful">
          <img srcSet={props.success} alt="success" />
          <h3>Your post has been shared.</h3>
          {props.timeSetting()}
        </div>
      ) : (
        <form
          className="imageConvert"
          id="myForm"
          onSubmit={props.onSubmitPost}
        >
          {!props.imageUpload ? (
            <div key={"list"} className="dragDropImage">
              <svg
                aria-label="Icon to represent media such as images or videos"
                className="_ab6-"
                color="#262626"
                fill="#262626"
                height="77"
                role="img"
                viewBox="0 0 97.6 77.3"
                width="96"
              >
                <path
                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                  fill="currentColor"
                ></path>
                <path
                  d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                  fill="currentColor"
                ></path>
              </svg>
              <p>Upload photos and videos here</p>
              <Button onClick={props.uploadImage} type="primary">
                Select from device
              </Button>
            </div>
          ) : (
            [
              props.imageUpload & props.imageCropped ? (
                <div key={"list"} className="submitPost">
                  <div className="postSubmit">
                    <p onClick={props.cancelForm}>Reset</p>
                    <button className="submit-post-btn" type="submit">
                      Share
                    </button>
                  </div>
                  <div className="PostSubmission">
                    <div className="postBorder">
                      <div className="postImagePreview">
                        <img src={props.previewImage} alt="postImage" />
                      </div>
                    </div>
                    <Box sx={{ flexGrow: 1, height: 100 }}>
                      <div className="postAttributes">
                        <div className="postUser">
                          <Avatar srcSet={props.profilePic} />
                          <p>{props.displayName}</p>
                        </div>
                        <div className="postContent">
                          <Editor
                            apiKey={process.env.REACT_APP_TINY_MCE_API}
                            onInit={(evt, editor) =>
                              (props.editorRef.current = editor)
                            }
                            placeholder="<p>This is the initial content of the editor.</p>"
                            init={{
                              height: 200,
                              menubar: false,
                              plugins: "emoticons",
                              toolbar: "emoticons",
                              toolbar_location: "bottom",
                              statusbar: false,
                            }}
                          />

                          <div className="divider">
                            <Divider />
                          </div>

                          <div className="autoComplete">
                            <AutoComplete
                              style={{
                                width: "100%",
                              }}
                              options={props.countryList}
                              placeholder="Add Location"
                              filterOption={(inputValue, option) =>
                                option.value
                                  .toUpperCase()
                                  .indexOf(inputValue.toUpperCase()) !== -1
                              }
                              onChange={(inputValue, country) =>
                                props.setLocation(country.value)
                              }
                            />
                            <div className="locate">
                              <FmdGoodOutlinedIcon />
                            </div>
                          </div>
                          <div className="divider">
                            <Divider />
                          </div>
                          <div className="postImageAlt">
                            <p>Alt: </p>
                            <Input
                              placeholder="Write Alt text"
                              onChange={(e) =>
                                props.setCustomPostImageAlt(e.target.value)
                              }
                              defaultValue={props.postImageAlt}
                            />
                          </div>
                          <div className="divider">
                            <Divider />
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
              ) : (
                [
                  props.imageUpload & !props.imageCropped ? (
                    <div key={"list"} className="cropPostImage">
                      <div>
                        <Cropper
                          image={props.postImage}
                          crop={crop}
                          zoom={zoom}
                          rotation={rotation}
                          aspect={1}
                          onZoomChange={setZoom}
                          onRotationChange={setRotation}
                          onCropChange={setCrop}
                          onCropComplete={cropComplete}
                        />
                      </div>
                      <div className="cropActions">
                        <Box sx={{ width: "100%", mb: 1 }}>
                          <Box>
                            <Typography>Zoom: {zoomPercent(zoom)} </Typography>
                            <Slider
                              valueLabelDisplay="auto"
                              valueLabelFormat={zoomPercent}
                              min={1}
                              max={3}
                              step={0.1}
                              value={zoom}
                              onChange={(e, zoom) => setZoom(zoom)}
                            />
                          </Box>
                          <Box>
                            <Typography>Rotation: {rotation} </Typography>
                            <Slider
                              valueLabelDisplay="auto"
                              min={0}
                              max={360}
                              value={rotation}
                              onChange={(e, rotation) => setRotation(rotation)}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Button onClick={props.cancelForm}>Cancel</Button>
                          <Button onClick={cropImage}>Crop</Button>
                        </Box>
                      </div>
                    </div>
                  ) : null,
                ]
              ),
            ]
          )}
        </form>
      )}
    </Modal>
  );
};

export default ModalPost;
