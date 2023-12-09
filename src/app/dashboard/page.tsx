
import EditUserForm from "@/components/forms/edit-user-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiServer } from "@/trpc/server";

const Page = async () => {

    const user = await apiServer.user.getCurrent.query()

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
        </div>
    )
}

export default Page;