import { trpc } from "@/trpc/server";

const Page = async () => {

    const hello = await trpc.user.hello.query({ text: "from tRPC" });

    console.log("from page", hello.greeting)

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Page
