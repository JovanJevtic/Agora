'use client'
import { MDXComponents } from 'mdx/types';
// import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteProps, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ReactNode } from 'react';

interface Props {
    mdxSource: MDXRemoteSerializeResult;
    content: string;
}

interface MDXContentProps {
    source: MDXRemoteProps;
}

const Prostor: React.FunctionComponent = () => {
    return (
        <div className='h-4 w-full'>
            {/* <p className='text-white'>Test</p> */}
        </div>
    );
}

type SiviTextProps = {
    children: ReactNode
}

const SiviText: React.FunctionComponent<SiviTextProps> = ({ children }) => {
    return (
        <p className='text-gray-400 text-sm md:text-base'>
            {children}
        </p>
    );
}

const Video = ({ izvor }: { izvor: string }) => {
    return (
        <video style={{ width: '100%' }} width={100} height={100}>
            <source src={izvor} type="video/mp4"></source>
        </video>
    )
}

const components: MDXComponents = {
    h1: ({ children }) => <h1 className='text-lg md:text-xl font-bold leading-relaxed'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-sm md:text-lg font-bold leading-relaxed'>{children}</h2>,
    h3: ({ children }) => <h3 className='text-xs md:text-base font-bold leading-relaxed'>{children}</h3>,
    p: ({ children }) => <p className='text-base leading-[1.8]'>{children}</p>,
    blockquote: ({ children }) => <div className='flex items-center md:pl-10 text-gray-500 mt-2 mb-2'>
        <div className='h-full border-solid border-l-[1px] border-primary pl-5 md:pl-5'>
            <div className='flex-[1]'><p className='italic leading-loose'>{children}</p></div>
        </div>
    </div>,
    strong: ({ children }) => <strong className='font-bold leading-loose'>{children}</strong>,
    Prostor,
    SiviText,
    Video,
    li: ({ children }) => <li className='flex items-star min-h-fit'>
        {/* <div className='min-w-[30px] w-[10vw] h-full flex items-start'>
            <div className="min-h-[10px] w-[1px] h-full bg-primary"></div>
        </div>
        <div className="flex-[1] text-base text-black dark:text-white flex items-end">
            {children}
        </div> */}
        <p className='flex-[1] italic mt-2 mb-0'>
            <span className='text-primary'>* </span>
            {children}
        </p>
    </li>,
}  

const RemoteMdxPage = ({ source }: MDXContentProps) => {
    return (
    <MDXRemote 
        {...source} 
        components={components} 
        // source={mdxSource.compiledSource} 
        // source={mdxSource.}
    />
  );
}

// export const getStaticProps: GetStaticProps<{
    // mdxSource: MDXRemoteSerializeResult
//   }> = async () => {
    // const mdxSource = await serialize(content)
    // return { props: { mdxSource } }
//   }

export default RemoteMdxPage