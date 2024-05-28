import { useEffect, useState } from "react";

const TimeAndDate = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000);
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM"

        hours = hours % 12;
        hours = hours ? hours : 12

        const strHours = hours < 10 ? `0${hours}` : hours;
        const strMinutes = minutes < 10 ? `0${minutes}`  : minutes;
        
        return {strHours, strMinutes, ampm}
    }

    const {strHours, strMinutes, ampm} = formatTime(currentTime)
    return (  
        <div className="flex font-manrope items-center">
            <div className="flex pr-6 justify-center items-center">
                <span className="border rounded-md p-3 mx-2">{strHours}</span>
                <p className="flex flex-col justify-center items-stretch">
                    <p className="pb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                            <circle cx="1" cy="1" r="1" fill="#4C4C4C"/>
                        </svg>
                    </p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                            <circle cx="1" cy="1" r="1" fill="#4C4C4C"/>
                        </svg>
                    </p>
                </p>
                <span className="border rounded-md p-3 mx-2">{strMinutes}</span>
                <span className="bg-tax-lime rounded-md p-3">{ampm}</span>
            </div>
            <div>
                {currentTime.toLocaleDateString()}
            </div>
        </div>
     );
}
 
export default TimeAndDate;