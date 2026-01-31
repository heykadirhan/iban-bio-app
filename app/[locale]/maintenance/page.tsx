import { HomeLayout } from '@/layouts/home-layout';
import { MaintenancePage } from '@/views/maintenance';

export default function Page() {
    return (
        <HomeLayout>
            <MaintenancePage />
        </HomeLayout>
    );
}
