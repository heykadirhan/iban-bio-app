import { HomeLayout } from '@/layouts/home-layout';
import { SearchPage } from '@/views/search';

export default function Page() {
    return (
        <HomeLayout>
            <SearchPage />
        </HomeLayout>
    );
}
