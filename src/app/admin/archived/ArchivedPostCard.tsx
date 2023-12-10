import { Post } from "@prisma/client"
import Link from "next/link";

type Props = {
    post: Post;
}
const ArchivedPostCard: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <Link href={`/admin/archived/${post.id}`}>
        <div className="bg-card p-4 mt-2 border-secondary border-solid border-[1px]">
            <p className="underline font-bold text-base">{post.title}</p>
        </div>
    </Link>
  )
}

export default ArchivedPostCard