const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=" flex flex-col min-h-fit h-full items-center justify-center pb-12 pt-24">
        <div className="w-full max-w-[650px] gap-6 items-center flex flex-col justify-center shadow-xl shadow-slate-200 rounded-md p-4 md:p-8 ">
          {children}
        </div>
      </div>
    );
  }
  
  export default FormWrap;