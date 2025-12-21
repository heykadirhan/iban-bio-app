import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function Page() {
    notFound();
}

export const metadata: Metadata = {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
};
