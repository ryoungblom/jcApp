import React from "react";
import { Timeline } from 'react-twitter-widgets'

const TwitterEmbed = () => (
  <Timeline
  dataSource={{
    sourceType: 'profile',
    screenName: 'carafem'
  }}
  options={{
    height: '300'
  }}
  />
)


export default TwitterEmbed;
