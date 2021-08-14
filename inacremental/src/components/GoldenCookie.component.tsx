import { useEffect, useState } from "react";
import { GoldenCookieProp } from "./MemberPage";

const GoldenCookieComponent: React.FC<GoldenCookieProp> = (goldenCookie) =>{
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const [visibility, setVisibility] = useState("hidden");

    const onClick = () => {
        if(visibility === "visible"){
            setActive(true);
            setVisibility("hidden");
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let counter = 0;

        if(isActive){
            if(seconds === 0){
                goldenCookie.cookieService.applyCookieEffect();
            }

            if(seconds === 10){
                goldenCookie.cookieService.revertCookieEffect();
                setActive(false);
                setSeconds(seconds=>0);
            }

    
            interval = setInterval(() => { 
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {     
            interval = setInterval(() => { 
                if(visibility === "hidden"){
                    counter = Math.round(Math.random() * 10);

                    console.log(counter);
    
                    if(counter === 10){
                        goldenCookie.cookieService.randomizePosition();
                        setVisibility("visible");
                    }
                } else {
                    setSeconds(seconds=>seconds + 1);

                    if(seconds === 5){
                        setActive(false);
                        setVisibility("hidden");
                        setSeconds(seconds=>0);
                    }
                }
                console.log(visibility, seconds);
            }, 1000);
        }

        return () => clearInterval(interval);
    });

    return (
        <svg width="100%" height="100%">
            <rect visibility={visibility} fill="orange" id="test" x={goldenCookie.cookieService.getXPosition()} y={goldenCookie.cookieService.getYPosition()} width="40" height="40" onClick={onClick}/>    
        </svg>
    );
};

export default GoldenCookieComponent;