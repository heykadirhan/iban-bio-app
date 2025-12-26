import { HomeLayout } from '@/layouts/home-layout';
import { NotFoundPage } from '@/views/not-found';

export default function Page() {
    return (
        <HomeLayout>
            <NotFoundPage />
        </HomeLayout>
    );
}
