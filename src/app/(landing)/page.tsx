import { apiServer } from "@/trpc/server";

interface PageProps {
}

const Page = async ({ }: PageProps) => {

    const posts = await apiServer.medium.latestPosts.query()
    console.log(posts)

    return (
        <div className="flex flex-col pt-12 space-y-8">
            {/* <div className="flex justify-between">
                <div className=" flex flex-col space-y-1">
                    <h2 className=" text-xl font-semibold">
                        Uso
                    </h2>
                    <p className=" text-base text-muted-foreground font-light">
                        Tablas de uso por mes
                    </p>
                </div>
            </div> */}
            {
                posts && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {
                                posts[0] && (
                                    <div className="col-span-1 md:col-span-2 md:row-span-2">
                                        <div className=" w-640 aspect-square bg-accent w-full h-auto"></div>
                                        <div className="mt-2">
                                            <p className="text-xs uppercase tracking-wide text-gray-500"> {posts[0].author}</p>
                                            <h2 className="text-xl font-semibold">
                                                {posts[0].title}
                                            </h2>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                posts.map((post, i) => (
                                    <div key={i}>
                                        <div className=" w-320 aspect-square bg-accent"></div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500"> {post.author}</p>
                                        <h2 className="text-lg font-semibold">
                                           {post.title}
                                        </h2>
                                    </div>
                                ))
                            }
                        </div>
                )
            }
        </div >
    )
}

export default Page;