import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // h1: ({ children }) => <h1 className='text-xl'>{children}</h1>,
    // img: (props) => (
    //     <Image
    //       sizes="100vw"
    //       style={{ width: '100%', height: 'auto' }}
    //     //   {...props as string[]}
    //       alt={props.alt as string}
    //       src={props.src as string}
    //     />
    // ),
    // p: ({ children }) => <p className='text-sm'>{children}</p>,
    // blockquote: ({ children }) => <div className='bg-red-500 w-[1px] h-[10px]'>{children}</div>,
    ...components,
  }
}