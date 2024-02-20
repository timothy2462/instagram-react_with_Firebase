import React, { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { authentication, db, storage } from "../../../Firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { Link } from "react-router-dom";
import { randUuid } from "@ngneat/falso";
import ModalPost from "../Home/Feature/ModalPost";
import success from "./Assets/Success.gif";
import getCroppedImg from "./CropImage";

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [location, setLocation] = useState("");
  const [postImageAlt, setPostImageAlt] = useState("");
  const [customPostImageAlt, setCustomPostImageAlt] = useState("");
  const [postState, setPostState] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [firebaseImage, setFirebaseImage] = useState("");
  const [imageCropped, setImageCropped] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [visible, setVisible] = useState(false);

  const postId = randUuid();

  // Convert cropped image
  const onUpload = async (file) => {
    const reader = new FileReader();
    (async () => {
      const response = await fetch(file);
      const imageBlob = await response.blob();
      reader.readAsDataURL(imageBlob);
    })();
    reader.onloadend = () => {
      const base64data = reader.result;
      setFirebaseImage(base64data);
    };
  };
  // End of Crop function

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const userSignOut = async () => {
    await signOut(authentication);
    navigate("/");
  };

  // Get images from device on button click and convert to data_url
  const uploadImage = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".png,.jpeg, .jpg, .gif";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      var files = input.files[0];
      setPostImageAlt(files.name);
      onPreview(files);
    };
    input.click();
  };
  // Preview images after Crop
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          setImageUpload(true);
        }
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    setPostImage(image.src);
  };
  // Reload page if resetting form
  function cancelForm() {
    window.location.reload();
  }

  const { displayName, profileImage, author, userId } = props;

  // Get TinyMCE editor
  const editorRef = useRef(null);

  // Adding country using Ant.d remote search
  const countryList = [
    { value: "Afghanistan", code: "AF" },
    { value: "Åland Islands", code: "AX" },
    { value: "Albania", code: "AL" },
    { value: "Algeria", code: "DZ" },
    { value: "American Samoa", code: "AS" },
    { value: "Andorra", code: "AD" },
    { value: "Angola", code: "AO" },
    { value: "Anguilla", code: "AI" },
    { value: "Antarctica", code: "AQ" },
    { value: "Antigua and Barbuda", code: "AG" },
    { value: "Argentina", code: "AR" },
    { value: "Armenia", code: "AM" },
    { value: "Aruba", code: "AW" },
    { value: "Australia", code: "AU" },
    { value: "Austria", code: "AT" },
    { value: "Azerbaijan", code: "AZ" },
    { value: "Bahamas (the)", code: "BS" },
    { value: "Bahrain", code: "BH" },
    { value: "Bangladesh", code: "BD" },
    { value: "Barbados", code: "BB" },
    { value: "Belarus", code: "BY" },
    { value: "Belgium", code: "BE" },
    { value: "Belize", code: "BZ" },
    { value: "Benin", code: "BJ" },
    { value: "Bermuda", code: "BM" },
    { value: "Bhutan", code: "BT" },
    { value: "Bolivia (Plurinational State of)", code: "BO" },
    { value: "Bonaire, Sint Eustatius and Saba", code: "BQ" },
    { value: "Bosnia and Herzegovina", code: "BA" },
    { value: "Botswana", code: "BW" },
    { value: "Bouvet Island", code: "BV" },
    { value: "Brazil", code: "BR" },
    { value: "British Indian Ocean Territory (the)", code: "IO" },
    { value: "Brunei Darussalam", code: "BN" },
    { value: "Bulgaria", code: "BG" },
    { value: "Burkina Faso", code: "BF" },
    { value: "Burundi", code: "BI" },
    { value: "Cabo Verde", code: "CV" },
    { value: "Cambodia", code: "KH" },
    { value: "Cameroon", code: "CM" },
    { value: "Canada", code: "CA" },
    { value: "Cayman Islands (the)", code: "KY" },
    { value: "Central African Republic (the)", code: "CF" },
    { value: "Chad", code: "TD" },
    { value: "Chile", code: "CL" },
    { value: "China", code: "CN" },
    { value: "Christmas Island", code: "CX" },
    { value: "Cocos (Keeling) Islands (the)", code: "CC" },
    { value: "Colombia", code: "CO" },
    { value: "Comoros (the)", code: "KM" },
    { value: "Congo (the Democratic Republic of the)", code: "CD" },
    { value: "Congo (the)", code: "CG" },
    { value: "Cook Islands (the)", code: "CK" },
    { value: "Costa Rica", code: "CR" },
    { value: "Croatia", code: "HR" },
    { value: "Cuba", code: "CU" },
    { value: "Curaçao", code: "CW" },
    { value: "Cyprus", code: "CY" },
    { value: "Czechia", code: "CZ" },
    { value: "Côte d'Ivoire", code: "CI" },
    { value: "Denmark", code: "DK" },
    { value: "Djibouti", code: "DJ" },
    { value: "Dominica", code: "DM" },
    { value: "Dominican Republic (the)", code: "DO" },
    { value: "Ecuador", code: "EC" },
    { value: "Egypt", code: "EG" },
    { value: "El Salvador", code: "SV" },
    { value: "Equatorial Guinea", code: "GQ" },
    { value: "Eritrea", code: "ER" },
    { value: "Estonia", code: "EE" },
    { value: "Eswatini", code: "SZ" },
    { value: "Ethiopia", code: "ET" },
    { value: "Falkland Islands (the) [Malvinas]", code: "FK" },
    { value: "Faroe Islands (the)", code: "FO" },
    { value: "Fiji", code: "FJ" },
    { value: "Finland", code: "FI" },
    { value: "France", code: "FR" },
    { value: "French Guiana", code: "GF" },
    { value: "French Polynesia", code: "PF" },
    { value: "French Southern Territories (the)", code: "TF" },
    { value: "Gabon", code: "GA" },
    { value: "Gambia (the)", code: "GM" },
    { value: "Georgia", code: "GE" },
    { value: "Germany", code: "DE" },
    { value: "Ghana", code: "GH" },
    { value: "Gibraltar", code: "GI" },
    { value: "Greece", code: "GR" },
    { value: "Greenland", code: "GL" },
    { value: "Grenada", code: "GD" },
    { value: "Guadeloupe", code: "GP" },
    { value: "Guam", code: "GU" },
    { value: "Guatemala", code: "GT" },
    { value: "Guernsey", code: "GG" },
    { value: "Guinea", code: "GN" },
    { value: "Guinea-Bissau", code: "GW" },
    { value: "Guyana", code: "GY" },
    { value: "Haiti", code: "HT" },
    { value: "Heard Island and McDonald Islands", code: "HM" },
    { value: "Holy See (the)", code: "VA" },
    { value: "Honduras", code: "HN" },
    { value: "Hong Kong", code: "HK" },
    { value: "Hungary", code: "HU" },
    { value: "Iceland", code: "IS" },
    { value: "India", code: "IN" },
    { value: "Indonesia", code: "ID" },
    { value: "Iran (Islamic Republic of)", code: "IR" },
    { value: "Iraq", code: "IQ" },
    { value: "Ireland", code: "IE" },
    { value: "Isle of Man", code: "IM" },
    { value: "Israel", code: "IL" },
    { value: "Italy", code: "IT" },
    { value: "Jamaica", code: "JM" },
    { value: "Japan", code: "JP" },
    { value: "Jersey", code: "JE" },
    { value: "Jordan", code: "JO" },
    { value: "Kazakhstan", code: "KZ" },
    { value: "Kenya", code: "KE" },
    { value: "Kiribati", code: "KI" },
    { value: "Korea (the Democratic People's Republic of)", code: "KP" },
    { value: "Korea (the Republic of)", code: "KR" },
    { value: "Kuwait", code: "KW" },
    { value: "Kyrgyzstan", code: "KG" },
    { value: "Lao People's Democratic Republic (the)", code: "LA" },
    { value: "Latvia", code: "LV" },
    { value: "Lebanon", code: "LB" },
    { value: "Lesotho", code: "LS" },
    { value: "Liberia", code: "LR" },
    { value: "Libya", code: "LY" },
    { value: "Liechtenstein", code: "LI" },
    { value: "Lithuania", code: "LT" },
    { value: "Luxembourg", code: "LU" },
    { value: "Macao", code: "MO" },
    { value: "Madagascar", code: "MG" },
    { value: "Malawi", code: "MW" },
    { value: "Malaysia", code: "MY" },
    { value: "Maldives", code: "MV" },
    { value: "Mali", code: "ML" },
    { value: "Malta", code: "MT" },
    { value: "Marshall Islands (the)", code: "MH" },
    { value: "Martinique", code: "MQ" },
    { value: "Mauritania", code: "MR" },
    { value: "Mauritius", code: "MU" },
    { value: "Mayotte", code: "YT" },
    { value: "Mexico", code: "MX" },
    { value: "Micronesia (Federated States of)", code: "FM" },
    { value: "Moldova (the Republic of)", code: "MD" },
    { value: "Monaco", code: "MC" },
    { value: "Mongolia", code: "MN" },
    { value: "Montenegro", code: "ME" },
    { value: "Montserrat", code: "MS" },
    { value: "Morocco", code: "MA" },
    { value: "Mozambique", code: "MZ" },
    { value: "Myanmar", code: "MM" },
    { value: "Namibia", code: "NA" },
    { value: "Nauru", code: "NR" },
    { value: "Nepal", code: "NP" },
    { value: "Netherlands (the)", code: "NL" },
    { value: "New Caledonia", code: "NC" },
    { value: "New Zealand", code: "NZ" },
    { value: "Nicaragua", code: "NI" },
    { value: "Niger (the)", code: "NE" },
    { value: "Nigeria", code: "NG" },
    { value: "Niue", code: "NU" },
    { value: "Norfolk Island", code: "NF" },
    { value: "Northern Mariana Islands (the)", code: "MP" },
    { value: "Norway", code: "NO" },
    { value: "Oman", code: "OM" },
    { value: "Pakistan", code: "PK" },
    { value: "Palau", code: "PW" },
    { value: "Palestine, State of", code: "PS" },
    { value: "Panama", code: "PA" },
    { value: "Papua New Guinea", code: "PG" },
    { value: "Paraguay", code: "PY" },
    { value: "Peru", code: "PE" },
    { value: "Philippines (the)", code: "PH" },
    { value: "Pitcairn", code: "PN" },
    { value: "Poland", code: "PL" },
    { value: "Portugal", code: "PT" },
    { value: "Puerto Rico", code: "PR" },
    { value: "Qatar", code: "QA" },
    { value: "Republic of North Macedonia", code: "MK" },
    { value: "Romania", code: "RO" },
    { value: "Russian Federation (the)", code: "RU" },
    { value: "Rwanda", code: "RW" },
    { value: "Réunion", code: "RE" },
    { value: "Saint Barthélemy", code: "BL" },
    { value: "Saint Helena, Ascension and Tristan da Cunha", code: "SH" },
    { value: "Saint Kitts and Nevis", code: "KN" },
    { value: "Saint Lucia", code: "LC" },
    { value: "Saint Martin (French part)", code: "MF" },
    { value: "Saint Pierre and Miquelon", code: "PM" },
    { value: "Saint Vincent and the Grenadines", code: "VC" },
    { value: "Samoa", code: "WS" },
    { value: "San Marino", code: "SM" },
    { value: "Sao Tome and Principe", code: "ST" },
    { value: "Saudi Arabia", code: "SA" },
    { value: "Senegal", code: "SN" },
    { value: "Serbia", code: "RS" },
    { value: "Seychelles", code: "SC" },
    { value: "Sierra Leone", code: "SL" },
    { value: "Singapore", code: "SG" },
    { value: "Sint Maarten (Dutch part)", code: "SX" },
    { value: "Slovakia", code: "SK" },
    { value: "Slovenia", code: "SI" },
    { value: "Solomon Islands", code: "SB" },
    { value: "Somalia", code: "SO" },
    { value: "South Africa", code: "ZA" },
    { value: "South Georgia and the South Sandwich Islands", code: "GS" },
    { value: "South Sudan", code: "SS" },
    { value: "Spain", code: "ES" },
    { value: "Sri Lanka", code: "LK" },
    { value: "Sudan (the)", code: "SD" },
    { value: "Suriname", code: "SR" },
    { value: "Svalbard and Jan Mayen", code: "SJ" },
    { value: "Sweden", code: "SE" },
    { value: "Switzerland", code: "CH" },
    { value: "Syrian Arab Republic", code: "SY" },
    { value: "Taiwan (Province of China)", code: "TW" },
    { value: "Tajikistan", code: "TJ" },
    { value: "Tanzania, United Republic of", code: "TZ" },
    { value: "Thailand", code: "TH" },
    { value: "Timor-Leste", code: "TL" },
    { value: "Togo", code: "TG" },
    { value: "Tokelau", code: "TK" },
    { value: "Tonga", code: "TO" },
    { value: "Trinidad and Tobago", code: "TT" },
    { value: "Tunisia", code: "TN" },
    { value: "Turkey", code: "TR" },
    { value: "Turkmenistan", code: "TM" },
    { value: "Turks and Caicos Islands (the)", code: "TC" },
    { value: "Tuvalu", code: "TV" },
    { value: "Uganda", code: "UG" },
    { value: "Ukraine", code: "UA" },
    { value: "United Arab Emirates (the)", code: "AE" },
    {
      value: "United Kingdom of Great Britain and Northern Ireland (the)",
      code: "GB",
    },
    { value: "United States Minor Outlying Islands (the)", code: "UM" },
    { value: "United States of America (the)", code: "US" },
    { value: "Uruguay", code: "UY" },
    { value: "Uzbekistan", code: "UZ" },
    { value: "Vanuatu", code: "VU" },
    { value: "Venezuela (Bolivarian Republic of)", code: "VE" },
    { value: "Viet Nam", code: "VN" },
    { value: "Virgin Islands (British)", code: "VG" },
    { value: "Virgin Islands (U.S.)", code: "VI" },
    { value: "Wallis and Futuna", code: "WF" },
    { value: "Western Sahara", code: "EH" },
    { value: "Yemen", code: "YE" },
    { value: "Zambia", code: "ZM" },
    { value: "Zimbabwe", code: "ZW" },
  ];
  const place = () => {
    if (location !== undefined) {
      return location;
    } else {
      setLocation("");
    }
  };
  const imgAlt = () => {
    if (customPostImageAlt) {
      return customPostImageAlt;
    } else {
      return postImageAlt;
    }
  };

  const onSubmitPost = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "posts"), {
      id: postId,
      authorId: author,
      username: displayName,
      caption: editorRef.current.getContent({ format: "text" }),
      profileImg: profileImage,
      timestamp: serverTimestamp(),
      imageAlt: imgAlt(),
      country: place(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, firebaseImage, "data_url")
      .then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          postImg: downloadURL,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setPostState(true);
  };


  const timeSetting = () => {
    setTimeout(() => {
      setImageUpload(false);
      setPostState(false);
      setPostImage("");
      setImageCropped(false);
    }, 3400);
  };

  // Adding New posts to Firestore

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <img
            alt="Instagram"
            width={'80%'}
            srcSet="
                https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          />
        </div>
        <div className="search-bar">
          <div className="search-bar-inner">
            <span className="search-icon" />
            <span className="search-text">Search</span>
          </div>
        </div>
        <div className="navbar-icons">
          <div className="navbar-icons-inner">
          <Link to='/'>
          <div>
              <div className="">
                <span tabIndex={0}>
                  <svg
                    aria-label="Home"
                    className="_8-yf5"
                    fill="#262626"
                    height={22}
                    viewBox="0 0 48 48"
                    width={22}
                  >
                    <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
            <div className="margin-left">
              <span className="xWeGp" tabIndex={0}>
                <svg
                  aria-label="Direct"
                  className="_8-yf5"
                  fill="#262626"
                  height={22}
                  viewBox="0 0 48 48"
                  width={22}
                >
                  <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z" />
                </svg>
              </span>
              <div className="_2g5Gx" />
            </div>
            <div className="margin-left">
              <span className="_0ZPOP upload" onClick={() => setVisible(true)}>
                <svg
                  aria-label="New post"
                  className="_ab6-"
                  color="#262626"
                  fill="#262626"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path
                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6.545 12.001L17.455 12.001"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12.003 6.545L12.003 17.455"
                  />
                </svg>
              </span>
              <div className="">
                <div className="poA5q" style={{ marginLeft: "-423px" }} />
              </div>
            </div>
            <div className="margin-left">
              <span tabIndex={0}>
                <svg
                  aria-label="Find People"
                  className="_ab6-"
                  color="#262626"
                  fill="#262626"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.941 13.953L7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10.06 10.056L13.949 13.945 7.581 16.424 10.06 10.056z"
                  />
                  <circle
                    cx={12.001}
                    cy={12.005}
                    fill="none"
                    r={10.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </span>
            </div>
            <div className="margin-left">
              <span className="_0ZPOP kIKUG">
                <svg
                  aria-label="Direct"
                  className="_ab6-"
                  color="#262626"
                  fill="#262626"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M22 3L9.218 10.083"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.698 20.334L22 3.001 2 3.001 9.218 10.084 11.698 20.334z"
                  />
                </svg>
              </span>
              <div className="">
                <div className="poA5q" style={{ marginLeft: "-423px" }} />
              </div>
            </div>
            <div className="profile-pic margin-left">
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <img
                      alt="profile"
                      data-testid="user-avatar"
                      draggable="false"
                      srcSet={profileImage}
                    />
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 0.8,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 17,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link to={userId}>
                  <MenuItem sx={{ fontSize: "13.5px" }}>
                    <ListItemIcon>
                      <svg
                        aria-label="Profile"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <circle
                          cx="12.004"
                          cy="12.004"
                          fill="none"
                          r="10.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></circle>
                        <path
                          d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></path>
                        <circle
                          cx="12.006"
                          cy="9.718"
                          fill="none"
                          r="4.109"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></circle>
                      </svg>
                    </ListItemIcon>
                    Profile
                  </MenuItem></Link>
                  <MenuItem sx={{ fontSize: "13.5px" }}>
                    <ListItemIcon>
                      <svg
                        aria-label="Saved"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <polygon
                          fill="none"
                          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    </ListItemIcon>
                    Saved
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "13.5px" }}>
                    <ListItemIcon>
                      <svg
                        aria-label="Settings"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="8.635"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                        <path
                          d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "13.5px" }}>
                    <ListItemIcon>
                      <svg
                        aria-label="Switch accounts"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <path d="M8 8.363a1 1 0 00-1-1H4.31a8.977 8.977 0 0114.054-1.727 1 1 0 101.414-1.414A11.003 11.003 0 003 5.672V3.363a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 001-1zm14 6.274h-5a1 1 0 000 2h2.69a8.977 8.977 0 01-14.054 1.727 1 1 0 00-1.414 1.414A11.004 11.004 0 0021 18.33v2.307a1 1 0 002 0v-5a1 1 0 00-1-1z"></path>
                      </svg>
                    </ListItemIcon>
                    Switch account
                  </MenuItem>
                  <Divider />

                  <MenuItem sx={{ fontSize: "13.5px" }} onClick={userSignOut}>
                    Log Out
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
      <ModalPost
        visible={visible}
        setVisible={setVisible}
        postImage={postImage}
        setPreviewImage={setPreviewImage}
        onUpload={onUpload}
        setImageCropped={setImageCropped}
        imageCropped={imageCropped}
        postState={postState}
        postImageAlt={postImageAlt}
        setCustomPostImageAlt={setCustomPostImageAlt}
        success={success}
        timeSetting={timeSetting}
        onSubmitPost={onSubmitPost}
        imageUpload={imageUpload}
        uploadImage={uploadImage}
        cancelForm={cancelForm}
        previewImage={previewImage}
        displayName={displayName}
        editorRef={editorRef}
        countryList={countryList}
        getCroppedImg={getCroppedImg}
        setLocation={setLocation}
        profilePic={profileImage}
      />
    </div>
  );
};

export default Navbar;
