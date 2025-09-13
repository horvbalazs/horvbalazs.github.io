import { FC, HTMLAttributes, memo, useEffect } from "react";
import styles from './stars.module.css';
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useTime } from "../../contexts/time";
import { TIME_TICK } from "../../constants/time-tick";

function tToDegree(t: number): number {
    return (t / 1000) * -360;
}

function tOpacity(t: number): number {
    const tWrapped = t % 100;
    if (tWrapped < 30) {
        return 0;
    } else {
        return 1 - (Math.abs(70 - tWrapped) / 20);
    }
}

export const Stars: FC = () => {
    const { t } = useTime();

    const tMV = useMotionValue(t);

    useEffect(() => {
        animate(tMV, t, { duration: TIME_TICK, ease: "linear" });
    }, [t]);

    const rotate = useTransform(tMV, (v) => tToDegree(v));
    const opacity = useTransform(tMV, (v) => tOpacity(v));

    return <motion.div className={styles.stars} style={{
        rotate, opacity, x: "-50%", // ✅ keep it centered horizontally
        left: "50%", // anchor to viewport center 
    }}>
        < RandomStars />
    </motion.div >;
}

const RandomStars = memo(() => Array.from({ length: 100 }).map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = 2 + Math.random() * 4;

    return (
        <Star
            key={i}
            style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
}))

const Star: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return <div className={styles.star} {...props} />;
}