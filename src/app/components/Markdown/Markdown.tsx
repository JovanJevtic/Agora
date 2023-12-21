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

const md = `
    # Selektor fudbalske reprezentacije Srbije Dragan Stojković Piksi izjavio je večeras u Leskovcu da su "orlovi" zasluženo izborili plasman na Evropsko prvenstvo, koje će biti održano u Njemačkoj.  

    > Raduj se Srbijo. Ovo je veliki dan za srpski fudbal. Poslije toliko godina ćemo imati svoju ekipu na EP. Čestitam momcima koji su trčali, borili se i nisu se predavali. I kada smo bili u rezultatskom manjku, vjerovali su da mogu do gola. Upozoravao sam da moramo biti jako oprezni - rekao je Stojković za RTS.  

    Dodao je da su ove utakmice na psihološkom planu teške.  


    > Nije to lako izdržati, ali momci su pokazali mentalitet koji treba da krasi jednu ekipu. Zasluženo idemo u Njemačku. Važno je da smo ciklus završili na najbolji mogući način. Ovo je poklon naciji, našoj državi. Poklon svima koji su naspodržavali i vjerovali u nas. Ovo je veliki dan za srpski fudbal - dodao je selektor Srbije. Kapiten fudbalske reprezentacije Srbije Dušan Tadić izjavio je večeras da su ostvarili cilj, a to je plasman na Evropsko prvenstvo.  


    > Krivo mi je što smo ljubiteljima fudbala priuštili nepotreban stres. U drugo poluvrijeme smo ušli bojažljivo, samo da ne pogriješimo. Poslije drugog pogotka Bugarske je zavladao stres. Ovo je bila utakmica da se ostvari cilj, nebitno kako se igra i šta se radi - rekao je Tadić poslije meča za RTS. Dušan Vlahović izjavio je da ne bi volio sa Srbija u Njemačkoj bude samo još jedan učesnik.  


    > Imamo jako kvalitetnu ekipu i sigurno smo mogli da ovo riješimo ranije. Na kraju, najbitnije je da smo se plasirali na Evropsko prvenstvo i trebalo bi, kao što je Duća Tadić rekao, da nam ovo postane navika. Imamo kvalitet, imamo dobru ekipu. Ne treba da budemo samo učesnici, nego da idemo na velika prvenstva kao ekipa koju durge reprezentacije gledaju kao dobrog i velikog rivala - rekao je Vlahović.  
    

    Srđan Babić izjavio je večeras u Leskovcu da su "orlovi" plasmanom napravili velikih uspjeh.

    > Bio sam bolestan, preskočio sam utakmicu u klubu, ali sam se sa velikom željom odazvao pozivu reprezentacije Srbije i dao sve od sebe. Čestitam cijeloj ekipi, cijeloj reprezentaciji, stručnom štabu. Ovo je veliki uspjeh jer 24 godine nismo bili na EP i drago mi je da smo to večeras uradili - rekao je Babić za RTS.  

    **Fudbalska reprezentacija Srbije plasirala se na EP, prvi put poslije 2000. godine, pošto je danas u Leskovcu u posljednjem kolu grupe G kvalifikacija za kontinentalni šampionat odigrala nerješeno sa Bugarskom 2:2. Srbija je takmičenje u Grupi G završila na drugom mjestu sa 14 bodova, dok je Mađarska prva sa 18.**  
`
const components: MDXComponents = {
    h1: ({ children }) => <h1 className='text-lg md:text-xl font-bold leading-relaxed'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-sm md:text-lg font-bold leading-relaxed'>{children}</h2>,
    h3: ({ children }) => <h3 className='text-xs md:text-base font-bold leading-relaxed'>{children}</h3>,
    p: ({ children }) => <p className='text-base leading-loose'>{children}</p>,
    blockquote: ({ children }) => <div className='flex items-center md:pl-10 text-gray-500 mt-2 mb-2'>
        <div className='h-full border-solid border-l-[1px] border-primary pl-5 md:pl-5'>
            <div className='flex-[1]'><p className='italic leading-loose'>{children}</p></div>
        </div>
    </div>,
    strong: ({ children }) => <strong className='font-bold leading-loose'>{children}</strong>,
    Prostor,
    SiviText,
    li: ({ children }) => <li className='flex items-start'>
        <div className='min-w-[30px] w-[10vw] h-full flex items-start'>
            {/* <div className="min-h-[10px] w-[1px] h-full bg-primary"></div> */}
        </div>
        <div className="flex-[1] text-base text-black dark:text-white flex items-end">
            {children}
        </div>
    </li>
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