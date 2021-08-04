import ActiveGenerator from "../services/ActiveGenerator";
//test for active generator
export const IncrementButtonComponent: React.FC = () => {
    const handleClick = () => {
        //ActiveGenerator.handleClick();
    }

    return (
        <button onClick={handleClick}>🍪</button>
    );
}