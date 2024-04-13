interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        mx-auto
        flex-grow
        px-4
        md:px-2
        xl:px-20
        "
    >
      {children}
    </div>
  );
};

export default Container;
