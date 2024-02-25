
interface HeadingProps {
    titlle: string
    center?: boolean
    classname?: string
}


const Heading: React.FC<HeadingProps> = ( {titlle, center, classname}) => {
    return ( <h1 className={`text-3xl font-bold mt-2 ${center ? "text-center" : "text-start"} ${classname}`}>{titlle}</h1> );
}
 
export default Heading;