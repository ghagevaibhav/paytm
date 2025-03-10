import { Users } from "../components/Users"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"

export const DashboardComponent = ({balance}) => {
    return <>
        <AppBar />
        <div className="m-8">
            <Balance  value={"10000"} />
            <Users />
        </div>
    </>
}