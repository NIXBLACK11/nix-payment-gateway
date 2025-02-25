import { PageKey } from "../types";
import { HomePage } from "./HomePage";
import { UserPage } from "./UserPage";

type MainPartProps = {
    activePage: PageKey;
};

export const MainPart: React.FC<MainPartProps>  = ({ activePage }) => {
    // Component mapping
    const components = {
        home: <HomePage />,
        user: <UserPage />,
        // payment: <PaymentPage />,
        // settings: <SettingsPage />
    };

    return (
        <div className="p-8">
            {components[activePage]}
        </div>
    );
}