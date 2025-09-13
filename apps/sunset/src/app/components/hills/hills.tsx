import { FC, useEffect } from "react";
import { ReactComponent as Image } from './hills.svg';
import styles from './hills.module.css';
import { useTime } from "../../contexts/time";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { getTimePeak } from "../../utils/time-peak";
import { TIME_TICK } from "../../constants/time-tick";

const MotionImage = motion(Image);

const BRIGHTNESS_MODIFIER = 0.8;

export const Hills: FC = () => {
    const { t } = useTime();

    const tMV = useMotionValue(t);

    useEffect(() => {
        animate(tMV, t, { duration: TIME_TICK, ease: "linear" });
    }, [t]);

    const brightnessValue = useTransform(tMV, (v) => `brightness(${getTimePeak(v) + 0.05})`);
    const secondaryBrightnessValue = useTransform(tMV, (v) => `brightness(${getTimePeak(v) * BRIGHTNESS_MODIFIER + 0.05})`);

    return <div className={styles.container}>
        <MotionImage className={styles.left} style={{ filter: secondaryBrightnessValue }} />
        <MotionImage className={styles.right} style={{ filter: secondaryBrightnessValue }} />
        <MotionImage className={styles.main} style={{ filter: brightnessValue }} />
    </div>;
};
