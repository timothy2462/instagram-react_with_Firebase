import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import "swiper/css";
import { randUser } from '@ngneat/falso';
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './Avatars';

const Story = () => {

  const user = randUser({length: 15})


  return (
    <div className="stories">
    <div className="stories-inner">
      <Swiper
        navigation={true}
        slidesPerView={5}
        spaceBetween={0} 
        modules={[Navigation]}
        className="mySwiper"
      >
        {
          user.map((stories)=>(
            <SwiperSlide key={stories.id}>
            <div className="story">
            <Avatar
            className='user-story'
        avatarStyle='Circle'
        {...generateRandomAvatarOptions() } />
              <div className="story-border" />
              <span className="story-text">{stories.firstName}</span>
            </div>
          </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  </div>
  )
}

export default Story