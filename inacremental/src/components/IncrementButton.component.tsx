import ActiveGenerator from "../services/ActiveGenerator";
//test for active generator
export default function IncrementButtonComponent() {
    const handleClick = () => {
        ActiveGenerator.handleClick();
    }

    return (
        <button onClick={() => handleClick()}>🍪</button>
    );
}