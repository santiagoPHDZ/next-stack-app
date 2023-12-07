"use client"
// import EditUserForm from "@/components/forms/edit-user-form";
import Indicator from "@/components/indicator";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/server/services/user";
import { apiClient } from "@/trpc/trpc-provider";

const Page = () => {
    // const user = await getUser();

    // if (!user) return <Indicator status="unauth" />

    const { mutate, data, error } = apiClient.user.postCurrent.useMutation()
    return (
        <div className="w-full h-full">
            {/* <Card className="w-full mt-8">
                <CardHeader>
                    <CardTitle>
                        Edit user
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditUserForm user={user} />
                </CardContent>
            </Card> */}
            hi
            <Button onClick={() => {
                mutate()
            }}>
                {data}
                click
            </Button>
        </div>
    )
}

export default Page;