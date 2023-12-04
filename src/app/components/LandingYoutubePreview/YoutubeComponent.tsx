'use client'

import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
    videoId: string;
    opts: {
        width: number;
        height: number
    }
}

const YoutubeComponent: React.FunctionComponent<Props> = ({ videoId, opts: options }) => {
    const opts: YouTubeProps['opts'] = {
      width: options.width,
      height: options.height
    }

    const options2: YouTubeProps['opts'] = {
      // width: 300,
      // height: 200
      // width: 300
    }

  return (
    <YouTube 
      videoId={videoId} 
      // opts={opts} 
      opts={options2}
      iframeClassName={`w-[100%]`}
      className={` w-[90%]`}
    />
  )
}

export default YoutubeComponent