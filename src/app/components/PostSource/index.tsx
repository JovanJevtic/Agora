import { User } from "@prisma/client"
import Image from "next/image";

type Props = {
    author: User;
    izvor: string | null;
}
const PostSource = ({
    author,
    izvor
}: Props) => {
  return (
    <>
        {
            (!izvor)  ?
            
            <>
                <p className="text-gray-500 text-sm mr-2">Autor:</p>
                <p className="text-xs md:text-sm mr-1 text-gray-950 dark:text-gray-50">
                    {author.name}
                </p>
                    
                {author.image ? (
                    <Image
                        className="mr-0 ml-1"
                        style={{ borderRadius: "50%", width: "25px", height: "25px" }}
                        src={author.image}
                        height={0}
                        width={0}
                        alt="profile"
                    />

                    ) : (
                      // <FaUserCircle className='mr-0 w-[30px]' />
                      <></>
                )}
            </> 
                : 
                 
            <>
                <p className="text-gray-500 text-sm mr-2">Izvor:</p>
                <p className="text-xs md:text-sm mr-1 text-gray-950 dark:text-gray-50">
                    {izvor}
                </p>
            </>  
        }
    </>
  )
}

export default PostSource