"use client"

import EditUserForm from "@/components/forms/edit-user-form";
import Indicator from "@/components/indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/server/services/user";
import { apiClient } from "@/trpc/trpc-provider";

const Page = () => {
    // const user = await getUser();

    // if (!user) return <Indicator status="unauth" />

    const { data: user } = apiClient.user.getCurrent.useQuery()

    const { mutate, data, error, status } = apiClient.user.postCurrent.useMutation()
    return (
        <div className="w-full h-full">
            <Card className="w-full mt-8">
                <CardHeader>
                    <CardTitle>
                        Edit user
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        user ? (
                            <EditUserForm user={user} />
                        ) : null
                    }
                </CardContent>
            </Card>
            hi
            <Button onClick={() => {
                mutate()
            }}>

                click
            </Button>

            <div>
                status: {status}
            </div>
            <div>
                err: {error?.data?.code}
            </div>
        </div>
    )
}

export default Page;