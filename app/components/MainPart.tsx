import { PageKey } from "../types";
import { BuyersData } from "./BuyersData";
import { CreateSaas } from "./CreateSaas";
import { HomePage } from "./HomePage";

type MainPartProps = {
    activePage: PageKey;
};

export const MainPart: React.FC<MainPartProps>  = ({ activePage }) => {
    // Component mapping
    const components = {
        home: <HomePage />,
        saas: <CreateSaas />,
        buyers: <BuyersData />,
        // payment: <PaymentPage />,
        // settings: <SettingsPage />
    };

    return (
        <div className="p-8">
            {components[activePage]}
        </div>
    );
}