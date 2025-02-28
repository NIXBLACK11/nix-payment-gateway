import { PageKey } from '../types';
import { BuyersData } from './BuyersData';
import { CreateSaas } from './CreateSaas';
import { HomePage } from './HomePage';
import { HowToUse } from './HowToUse';

type MainPartProps = {
    activePage: PageKey;
};

export const MainPart: React.FC<MainPartProps> = ({ activePage }) => {
    // Component mapping
    const components = {
        home: <HomePage />,
        saas: <CreateSaas />,
        buyers: <BuyersData />,
        howtouse: <HowToUse />,
        // payment: <PaymentPage />,
        // settings: <SettingsPage />
    };

    return <div className="p-8">{components[activePage]}</div>;
};
