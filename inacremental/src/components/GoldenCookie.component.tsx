import { useEffect, useState } from "react";
import GoldenCookieService from "../services/GoldenCookieService";
import { GoldenCookieProp } from "./MemberPage";


const GoldenCookieComponent: React.FC<GoldenCookieProp> = (cookieService) =>{
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);

    const onClick = () => {
        setActive(true);
    }

    useEffect(() => {
        console.log(cookieService);
        let interval: NodeJS.Timeout;

        if(isActive){
            if(seconds === 0){
                cookieService.cookieService.apply();
            }
    
            if(seconds === 10){
                cookieService.cookieService.revert();
            }
    
            interval = setInterval(() => { 
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    });

    return (
        <div>
            <button onClick={onClick}>GoldenCookie</button>
            {seconds}
        </div>
    );
};

export default GoldenCookieComponent;