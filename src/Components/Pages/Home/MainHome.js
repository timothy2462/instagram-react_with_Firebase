import React, { useEffect, useState } from "react";
import "./Home.css";
import "./HomeMobile.css";
import Story from "./Feature/Story";
import Sidebar from "./Feature/Sidebar";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../Firebase-config";
import moment from "moment";
import Like from "./Feature/Like";
import Bookmark from "./Feature/Bookmark";
import Options from "./Feature/Options";
import Skeleton from '@mui/material/Skeleton';
import { faker } from '@faker-js/faker';
import  Toggle from "@mui/material/ToggleButton";

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    []
  );
  const { user } = props;

  const userName = user.displayName;
  const profileImage = user.photoURL;

  // Deleting post

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div>
      <div className="main-container">
        <main>
          <div className="content-container">
            <div className="content">
              {/* Story section.The Carousels will be done using Swiper */}
              <Story />
              <div className="posts">
                {posts ? (
                  posts.map((post) => (
                    <div className="post" key={post.id} id={post.id}>
                      <div className="header">
                        <div className="profile-area">
                          <div className="post-pic">
                            <img
                              alt="jayshetty'sprofile"
                              className="_6q-tv"
                              data-testid="user-avatar"
                              draggable="false"
                              srcSet={post.data().profileImg}
                            />
                          </div>
                          <div className="userlocate">
                            <span className="profile-name">
                              {post.data().username}
                            </span>
                            <span className="post-country">
                              {post.data().country}
                            </span>
                          </div>
                        </div>
                        <div className="options">
                          <Options
                            displayName={userName}
                            deletePost={() => deletePost(post.id)}
                            previewImage={post.data().postImg}
                            locationPost={post.data().country}
                            Caption={post.data().caption}
                            editImageAlt={post.data().imageAlt}
                            profileImg={profileImage}
                            userLoggedIn={user}
                            author={user.uid}
                            authorId={post.data().authorId}
                            postId={post.id}
                            countryList={props.countryList}
                          />
                        </div>
                      </div>
                      <div className="body">
                        {
                          post.data().postImg !== null ?
                          <img
                          alt={post.data().imageAlt}
                          className="FFVAD"
                          sizes="614px"
                          srcSet={ !null ? post.data().postImg : faker.image.nature()}
                          style={{ objectFit: "cover" }}
                        />
                          :
                          <Skeleton variant="rectangular" width={'100%'} height={400} />

                        }
                      </div>
                      <div className="footer">
                        <div className="user-actions">
                          <div className="like-comment-share">
                            <Like />
                            <div className="margin-left-small">
                              <Toggle>
                              <svg
                                aria-label="Comment"
                                className="_ab6- action"
                                color="#262626"
                                fill="#262626"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path
                                  d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                              </Toggle>
                            </div>
                            <div className="margin-left-small">
                              <Toggle>
                              <svg
                                aria-label="Share Post"
                                className="_ab6- action"
                                color="#262626"
                                fill="#262626"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <line
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  x1="22"
                                  x2="9.218"
                                  y1="3"
                                  y2="10.083"
                                ></line>
                                <polygon
                                  fill="none"
                                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                  stroke="currentColor"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></polygon>
                              </svg>
                              </Toggle>
                            </div>
                          </div>
                          <div className="bookmark">
                            <Bookmark />
                          </div>
                        </div>
                        <span className="likes">
                          Liked by <b>{post.data().username}</b> and{" "}
                          <b> {2} others</b>
                        </span>
                        <span className="caption">
                          <span className="caption-username">
                            <b>{post.data().username}</b>
                          </span>
                          <span className="caption-text">
                            {post.data().caption}
                          </span>
                        </span>
                        <span className="comment">
                          <span className="caption-username">
                            <b>akhilboddu</b>
                          </span>
                          <span className="caption-text">Thank you</span>
                        </span>
                        <span className="comment">
                          <span className="caption-username">
                            <b>imharjot</b>
                          </span>
                          <span className="caption-text"> Great stuff</span>
                        </span>
                        <span className="posted-time">
                          {moment(
                            post.data().timestamp &&
                              post.data().timestamp.toDate()
                          ).fromNow()}
                        </span>
                      </div>
                      <div className="add-comment">
                        <input type="text" placeholder="Add a comment..." />
                        <span className="post-btn">Post</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                  </div>
                )}
              </div>
            </div>
            <Sidebar displayName={userName} profileImage={profileImage} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
