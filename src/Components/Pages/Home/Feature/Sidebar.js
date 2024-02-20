import React from 'react'
import { randUser } from '@ngneat/falso';
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './Avatars';

const Sidebar = (props) => {
  const {displayName, profileImage} = props;
  const user = randUser({length: 5});

  return (
    <div className="sidebar">
    <div className="profile-details">
      <div className="profile-details-pic">
        <img
          className="user-story"
          alt="profile"
          data-testid="user-avatar"
          draggable="false"
          srcSet={profileImage}
        />
      </div>
      <div className="user-details">
        <span className="username">{displayName}</span>
        <span className="name">{displayName}</span>
      </div>
    </div>
    <div className="suggestions">
      <div className="suggestions-header">
        <span className="title">Suggestions for you</span>
        <span className="see-all-btn">
          See all
        </span>
      </div>
      {
        user.map((suggest, index)=>(
          <div className="suggestion" key={index}>
          <div className="suggestion-details">
            <div className="suggestion-pic">
            <Avatar
        style={{ width: '42px', height: '42px' }}
        avatarStyle='Circle'
        {...generateRandomAvatarOptions() } />
            </div>
            <div className="suggestion-profile-details">
              <span className="profile-name">{suggest.username}</span>
              <span className="text-muted">New to instagram</span>
            </div>
          </div>
          <span className="follow-btn">
            Follow
          </span>
        </div>
        ))
      }
    </div>
    <div className="sidebar-footer" />
  </div>
  )
}

export default Sidebar;