const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="
        min-h-fit
        h-full
        items-center
        justify-center
        pb-12
        ppt24

        "
        >
            <div
                className="
            w-full
            max-w[650px]
            flex
            flex-col
            items-center
            shadow-xl
            shadow-slate-200
            rounded-md
            p-4
            md:p-8
            "
            >
                {children}
            </div>
        </div>

    );
}

export default FormWrap;