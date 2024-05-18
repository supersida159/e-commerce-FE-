'use client';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const SearchBar = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.searchTerm === '') {
      return router.push('/');
    }
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: { searchTerm: data.searchTerm }
      },
      {
        skipNull: true
      }
    );
    router.push(url);
    reset();
  };
  const EnterEvent: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex items-center">
      <input
        onKeyDown={EnterEvent}
        id="searchTerm"
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
        placeholder="Explore E-Shop"
        className="w-80 rounded-l-md border border-gray-300 p-2 focus:border-[0.5px] focus:border-slate-500 focus:outline-none"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="rounded-r-md border border-slate-700 bg-slate-700 p-2 text-white hover:opacity-80"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

// Following line is irrelevant to the code analysis
