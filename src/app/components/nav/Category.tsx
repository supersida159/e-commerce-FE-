'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
('query-string');

interface CategoryProps {
  label: string;
  icon: IconType;
  seleced?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, seleced }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === 'All') {
      router.push('/');
    } else {
      let CurrentQuery = {};
      if (params) {
        CurrentQuery = queryString.parse(params.toString());
      }
      const updatedQuery: any = {
        category: label
      };

      const url = queryString.stringifyUrl(
        {
          url: '/',
          query: updatedQuery
        },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [label, params, router]);
  return (
    <div
      className={`transistion flex  cursor-pointer items-center justify-center gap-1 border-b-2 p-2 hover:text-slate-800 ${seleced ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500'} `}
      onClick={handleClick}
    >
      <Icon size={24} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default Category;
