'use client'

import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
    videoId: string;
    opts: {
        width: number;
        height: number
    };
    title: string;
}

const YoutubeComponent: React.FunctionComponent<Props> = ({ videoId, opts: options, title }) => {
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
    <div className='flex flex-col w-[100%]'>
      <h1 className='text-white mb-3 mt-1 font-bold md:hidden'>{title}</h1>
      <YouTube 
        videoId={videoId} 
        // opts={opts} 
        opts={options2}
        iframeClassName={`w-[100%]`}
        className={` w-[90%]`}
      />
    </div>
  )
}

export default YoutubeComponent