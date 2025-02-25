import { PageKey } from "../types";
import { CreateSaas } from "./CreateSaas";
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
        saas: <CreateSaas />
        // payment: <PaymentPage />,
        // settings: <SettingsPage />
    };

    return (
        <div className="p-8">
            {components[activePage]}
        </div>
    );
}