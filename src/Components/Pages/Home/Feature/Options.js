import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider, Avatar, Backdrop, Alert } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Editor } from "@tinymce/tinymce-react";
import { AutoComplete, Input } from "antd";
import { db } from "../../../../Firebase-config";
import { updateDoc, doc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 0,
  borderRadius: "13px",
  p: 1,
  textAlign: "center",
};

const Options = (props) => {
  const { deletePost } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [show, setShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleEdit = () => {
    setShow(true);
    handleClose();
  };
  const [editCaption, setEditCaption] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editAlt, setEditImageAlt] = useState("");
  const updateRef = useRef(null);

  //  Editing a post
  const editPost = async (id) => {
    const updatePost = doc(db, "posts", id);
    if (editCaption || editCountry || editAlt) {
      await updateDoc(updatePost, {
        caption: updateRef.current.getContent({ format: "text" }),
        imageAlt: editAlt,
        country: editCountry,
      })
        .then(() => {
          setSuccessAlert(true);
          setTimeout(() => {
            setShow(false);
            setSuccessAlert(false);
          }, 2000);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const updateModalPost = (e) => {
    editPost(props.postId);
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="Igw0E rBNOH YBx95 _4EzTm"
        style={{ height: 24, width: 24 }}
        onClick={handleOpen}
      >
        <svg
          aria-label="More options"
          className="_8-yf5"
          fill="#262626"
          height={16}
          viewBox="0 0 48 48"
          width={16}
        >
          <circle
            clipRule="evenodd"
            cx={8}
            cy={24}
            fillRule="evenodd"
            r="4.5"
          />
          <circle
            clipRule="evenodd"
            cx={24}
            cy={24}
            fillRule="evenodd"
            r="4.5"
          />
          <circle
            clipRule="evenodd"
            cx={40}
            cy={24}
            fillRule="evenodd"
            r="4.5"
          />
        </svg>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "100%" }} className="optionModal">
            <p
              style={{ color: "red", fontWeight: "bold" }}
              className="optionLink"
              onClick={props.author === props.authorId ? handleEdit : null}
            >
              {props.author === props.authorId ? "Edit Post" : "Report"}
            </p>
            <hr />
            <p
              onClick={props.author === props.authorId ? deletePost : null}
              style={{ color: "red", fontWeight: "bold" }}
              className="optionLink"
            >
              {props.author === props.authorId ? "Delete Post" : "Unfollow"}
            </p>
            <hr />
            <p className="optionLink">Add to favorites</p>
            <hr />
            <p className="optionLink">Go to post</p>
            <hr />
            <p className="optionLink">Share to...</p>
            <hr />
            <p className="optionLink">Copy link</p>
            <hr />
            <p className="optionLink">Embed</p>
            <hr />
            <p onClick={handleClose} className="optionLink">
              Cancel
            </p>
          </div>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
      >
        <form className="postEditing" id="myForm" onSubmit={updateModalPost}>
          {
            successAlert && (
              <Alert severity="success">Post Updated Succesfully</Alert>
            )
          }
          <div key={"list"} className="submitPost">
            <div className="postEdit">
              <p onClick={() => setShow(false)}>Cancel</p>
              <h5>Edit post</h5>
              <button className="submit-post-btn" type="submit">
                Update
              </button>
            </div>
            <div className="editSubmission">
              <div className="editBorder">
                <div className="editImagePreview">
                  <img src={props.previewImage} alt="postImage" />
                </div>
              </div>
              <Box sx={{ flexGrow: 1, height: 100 }}>
                <div className="editAttributes">
                  <div className="postUser">
                    <Avatar srcSet={props.profileImg} />
                    <p>{props.displayName}</p>
                  </div>
                  <div className="postContent">
                    <Editor
                      apiKey= {process.env.REACT_APP_TINY_MCE_API}
                      onInit={(evt, editor) => (updateRef.current = editor)}
                      onEditorChange={(newValue, editor) =>
                        setEditCaption(newValue)
                      }
                      initialValue={props.Caption}
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
                        defaultValue={props.locationPost}
                        onChange={(inputValue, country) =>
                          setEditCountry(inputValue)
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
                        onChange={(e) => setEditImageAlt(e.target.value)}
                        defaultValue={props.editImageAlt}
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
        </form>
      </Backdrop>
    </div>
  );
};

export default Options;
