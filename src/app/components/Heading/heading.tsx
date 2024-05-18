interface HeadingProps {
  titlle: string;
  center?: boolean;
  classname?: string;
}

const Heading: React.FC<HeadingProps> = ({
  titlle: title,
  center,
  classname
}) => {
  return (
    <h1
      className={`mt-2 text-3xl font-bold ${center ? 'text-center' : 'text-start'} ${classname}`}
    >
      {title}
    </h1>
  );
};

export default Heading;
