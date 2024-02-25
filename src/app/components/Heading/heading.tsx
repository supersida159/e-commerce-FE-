
interface HeadingProps {
    titlle: string
    center?: boolean
}


const Heading: React.FC<HeadingProps> = ( {titlle, center}) => {
    return ( <h1 className={`text-3xl font-bold ${center ? "text-center" : "text-start"}`}>{titlle}</h1> );
}
 
export default Heading;