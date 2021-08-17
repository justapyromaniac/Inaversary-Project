import { useEffect, useState } from "react";
import { GoldenCookieProp } from "./MemberPage";

const GoldenCookieComponent: React.FC<GoldenCookieProp> = (goldenCookie) =>{
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [cookieLayer, setCookieLayer] = useState(0);

    const onClick = () => {
        if(opacity !== 0){
            setActive(true);
            setOpacity(0);
        }
    }

    // numbers will need to be adjusted for play testing
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if(isActive){
            if(seconds >= 0 && cookieLayer > 0){
                setCookieLayer(cookieLayer => 0);
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
    
            return () => clearInterval(interval);
        } else {     
            let counter = 0;
    
            interval = setInterval(() => { 
                if(opacity === 0 && seconds === 0){
                    counter = Math.round(Math.random() * 10);
    
                    if(counter >= 5){
                        goldenCookie.cookieService.randomizeCookie();
                        setOpacity(opacity=>1);
                        setCookieLayer(help=>10);
                    }
                } else {
                    setSeconds(seconds=>seconds + 1);
                    
                    if(seconds >= 5){
                        setActive(false);
                        setOpacity(0);
                        setSeconds(seconds=>0);
                        setCookieLayer(help => 0);
                    }
                }
            }, 1000);
    
            return () => clearInterval(interval);
        }
    });

    return (
        <svg width="100%" height="100%" style={{zIndex: cookieLayer, position: 'absolute'}}>
            <rect fill="orange" x={goldenCookie.cookieService.getXPosition()} y={goldenCookie.cookieService.getYPosition()} width="40" height="40" onClick={onClick} opacity={opacity} style={{zIndex: 3, position: 'relative'}}/>    
        </svg>
    );
};

export default GoldenCookieComponent;