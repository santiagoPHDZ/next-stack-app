
// import EditUserForm from "@/components/forms/edit-user-form";
import Indicator from "@/components/indicator";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/server/services/user";

const Page = async () => {
    const user = await getUser();

    if (!user) return <Indicator status="unauth" />

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
        </div>
    )
}

export default Page;