import AdsSection from '../components/AdsSection';
import PickupDropoffComponent from '../components/PickupDropoffComponent';

const HomePage = () => {
    return (
        <div className='px-6 md:px-16 py-8'>
            <AdsSection />
            <PickupDropoffComponent />
        </div>
    );
};

export default HomePage;