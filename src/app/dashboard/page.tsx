import { api } from "@/trpc/server";

const Page = async () => {

    const hello = await api.user.hello.query({ text: "from tRPC" });

    console.log("from page", hello.greeting)

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Page
