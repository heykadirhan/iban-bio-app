import { HomeLayout } from '@/layouts/home-layout';
import { HomePage } from '@/views/home';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function Page() {
    return (
        <HomeLayout>
            <HomePage />
        </HomeLayout>
    );
}
