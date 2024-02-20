import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase-config";
import { useParams } from "react-router-dom";
import { Tabs, Empty, Button, Select } from "antd";
import { TableOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import "./Profile.css";

const { TabPane } = Tabs;
const { Option } = Select;

const Profile = (props) => {
  const [posts, setPosts] = useState([]);

  let { userId } = useParams();
  const { user } = props;
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("authorId", "==", userId),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [userId]
  );

  console.log(user);
  return (
    <div className="profilePage">
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img srcSet={user.photoURL} alt="" height={140} width={140} />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{user.displayName}</h1>

              <button className="btn profile-edit-btn">Edit Profile</button>

              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <svg
                  aria-label="Options"
                  className="_ab6-"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
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
              </button>
            </div>

            <div className="profile-stats">
              <div>
                <li>
                  <span className="profile-stat-count">
                    {faker.random.numeric()}
                  </span>{" "}
                  posts
                </li>
                <li>
                  <span className="profile-stat-count">
                    {faker.random.numeric()}
                  </span>{" "}
                  followers
                </li>
                <li>
                  <span className="profile-stat-count">
                    {faker.random.numeric()}
                  </span>{" "}
                  following
                </li>
              </div>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">{user.displayName}</span>{" "}
                <br />
                {faker.lorem.words(18)} {faker.internet.emoji()}
              </p>
              <span className="userUrl">
                <b>{faker.internet.url()}</b>
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="profilePosts">
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <TableOutlined />
                POSTS
              </span>
            }
            key="1"
          >
            {posts.length > 0 ? (
              <div>
                <div>
                  <div className="row row-cols-3 gy-3">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="col imageOverlay"
                      >
                        <img
                          height={"90%"}
                          width={"90%"}
                          srcSet={`${
                            post.data().postImg
                          }?w=174&h=174&fit=crop&auto=format&dpr=2 2x`}
                          alt={post.data().imageAlt}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" emptyAdd d-flex flex-column justify-content-center align-items-center">
                <Empty
                  image="https://www.citypng.com/public/uploads/small/11637046102sou8wtwfq52fpjskuonogi0ug4z0mnjw7mluqrayeo7rml1wvszax9chy1jlkqyahdftfibh017m8dfxvtijitqnjlcklhlqptoh.png"
                  imageStyle={{
                    height: 40,
                  }}
                  description={
                    <span>
                      When you share photos, they will appear on your profile.
                    </span>
                  }
                >
                  <Button type="link">
                    <b>Share your first photo</b>
                  </Button>
                </Empty>
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <BookOutlined />
                SAVED
              </span>
            }
            key="2"
          >
            <div className="emptyDesc">
            <Empty description={"No Saved Post"} />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <UserOutlined />
                TAGGED
              </span>
            }
            key="3"
          >
            <div className="emptyDesc">
            <Empty description={"You're not tagged in any post"} />
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className="homeLoginFooter profileFooter">
        <ul className="loginFooterList">
          <li className="loginFooterLinks">Meta</li>
          <li className="loginFooterLinks">About</li>
          <li className="loginFooterLinks">Blog</li>
          <li className="loginFooterLinks">Jobs</li>
          <li className="loginFooterLinks">Help</li>
          <li className="loginFooterLinks">API</li>
          <li className="loginFooterLinks">Privacy</li>
          <li className="loginFooterLinks">Terms</li>
          <li className="loginFooterLinks">Top Accounts</li>
          <li className="loginFooterLinks">Hashtags</li>
          <li className="loginFooterLinks">Locations</li>
          <li className="loginFooterLinks">Instagram Lite</li>
          <li className="loginFooterLinks">Contact Uploading & Non-Users</li>
        </ul>
        <div className="loginFooterBottom">
          <Select
            defaultValue="English"
            style={{
              width: 95,
            }}
            bordered={false}
          >
            <Option value="French">French</Option>
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="Yoruba">Yoruba</Option>
            <Option value="Xhosa">isiXhosa</Option>
            <Option value="Afrikaana">Afrikaans</Option>
          </Select>
          © 2022 Instagram from Meta
        </div>
      </div>
    </div>
  );
};

export default Profile;
