import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
        id?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
        <div className="flex justify-between border-b px-4 border-slate-300">
            <div className="text-lg flex flex-col justify-center">
                <h1 className="text-xl">Rupii</h1>
            </div>
            <div className="flex flex-row justify-center pt-2">
                <div className="p-4">{user ? `Welcome user ${user.id}` : ""}</div>
                <Button onClick={user ? onSignout : onSignin}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
}