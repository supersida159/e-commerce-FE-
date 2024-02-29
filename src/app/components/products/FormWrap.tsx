const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-full min-h-fit flex-col items-center justify-center pb-12 pt-24">
      <div className="flex w-full max-w-[650px] flex-col items-center justify-center gap-6 rounded-md p-4 shadow-xl shadow-slate-200 md:p-8 ">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
