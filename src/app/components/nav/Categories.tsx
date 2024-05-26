'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { categories } from '../../../../utils/Categories';
import Category from './Category';
import Container from './Container';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="flex  flex-row items-center justify-between overflow-x-auto pt-4">
          <Suspense>
            {categories.map((item) => (
              <Category
                key={item.label}
                label={item.label}
                icon={item.icon}
                seleced={
                  category === item.label || (!category && item.label === 'All')
                }
              />
            ))}
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
