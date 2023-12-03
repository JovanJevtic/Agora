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

  return (
    <YouTube videoId={videoId} opts={opts} />
  )
}

export default YoutubeComponent