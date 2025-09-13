import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useTime } from "../../contexts/time";

export const DragWrapper: FC<PropsWithChildren> = ({ children }) => {
    const { setT } = useTime();
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!isDragging) return;
        const newX = (event.clientX / window.innerWidth) * 100;
        const newValue = Math.min(100, Math.max(0, newX));

        setT(newValue);
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove, { signal: abortController.signal });
            window.addEventListener("mouseup", handleMouseUp, { signal: abortController.signal });
        }

        return () => {
            abortController.abort();
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div onMouseDown={handleMouseDown}>
            {children}
        </div>
    );
}