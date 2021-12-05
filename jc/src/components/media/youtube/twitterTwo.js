import React from "react";
import { Timeline } from 'react-twitter-widgets'

const TwitterEmbedTwo = () => (
  <Timeline
  dataSource={{
    sourceType: 'profile',
    screenName: 'jctelemedicine'
  }}
  options={{
    height: '300'
  }}
  />
)


export default TwitterEmbedTwo;
