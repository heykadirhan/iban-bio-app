import { SectionHero } from './components/section-hero';
import { SectionBrands } from './components/section-brands';
import { SectionSearchPay } from './components/section-search-pay';
import { SectionHowItWorks } from './components/section-how-it-works';
import { SectionFeatures } from './components/section-features';
import { SectionCta } from './components/section-cta';
import {
    SectionUseCasesClient,
    SectionFaqClient,
} from './components/client-sections';

export function HomePage() {
    return (
        <>
            <SectionHero />

            <SectionBrands />

            <SectionSearchPay />

            <SectionHowItWorks />

            <SectionUseCasesClient />

            <SectionFeatures />

            <SectionFaqClient />

            <SectionCta />
        </>
    );
}
