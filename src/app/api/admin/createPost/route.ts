import { NextRequest, NextResponse } from 'next/server';
import { postCreationFormSchema } from '@/app/libs/validation/form'
import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/app/libs/authOptions';
import { getServerSession } from 'next-auth';

type PostCreationData = {
    title: string;
    subtitle: string;
    body: string;
    image: string;
    slug: string;
    categoryId: string;
    subcategoryId: string;
    positionPrimary: boolean;
    positionSecondary: boolean;
    fotoIzvor: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const bodyex = `
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

        const {
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId
        } = (await request.json()) as PostCreationData;
    
        const session = await getServerSession(authOptions)
    
        const postData = {
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId
        }
    
        const validateResponse = postCreationFormSchema.safeParse({ 
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId
        })
    
        let zodErrors = {};
        if (!validateResponse.success) {
                validateResponse.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
    
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }
    
        const post = await prisma.post.create({
            data: {
                ...postData,
                authorId: "clop313zk0000ju089a48am77"
            }
        })
    
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ error })
    }
}