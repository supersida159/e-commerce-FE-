import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const SuspenHomepage = dynamic(() => import('./suspenHomepage'), {
  ssr: false
});

export default function SuspenHome() {
  return (
    <Suspense>
      <SuspenHomepage />
    </Suspense>
  );
}
