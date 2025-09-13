import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { TIME_TICK } from "../constants/time-tick";

export interface TimeContextValue {
    t: number;
    setT: (t: number) => void;
}

export const TimeContext = createContext<TimeContextValue>({
    t: 25,
    setT: () => void 0,
});

export const TimeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [t, setT] = useState(25);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setT((prev) => (prev + 1));
        }, TIME_TICK * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <TimeContext.Provider value={{
        t,
        setT,
    }}>{children}</TimeContext.Provider>;
};

export const useTime = () => {
    const context = useContext(TimeContext);

    if (!context) {
        throw new Error('useTime must be used within a TimeProvider');
    }

    return context;
}