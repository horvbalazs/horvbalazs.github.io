import { FC, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import styles from './sun.module.css';
import { useTime } from "../../contexts/time";
import { animate } from "motion";
import { lerpColor } from "../../utils/color";
import { TIME_TICK } from "../../constants/time-tick";


const sunColors = [
    { t: 0, color: '#FFDAB9' },
    { t: 25, color: '#FFF700' },
    { t: 50, color: '#FF8C00' },
    { t: 75, color: '#FFA500' },
    { t: 100, color: '#FFDAB9' }
];

const sunRayColors = [
    { t: 0, color: '#FFDAB9' },
    { t: 25, color: '#FFF700' },
    { t: 50, color: '#E43414' },
    { t: 75, color: '#FFA500' },
    { t: 100, color: '#FFDAB9' }
];

const curve = (t: number, radius = 50, centerX = 50, centerY = 50) => {
    const tWrapped = t % 100;
    const angle = (tWrapped / 100) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return { x, y };
};

function getSunColor(x: number): string {
    const t = x % 100;

    let start = sunColors[0];
    let end = sunColors[sunColors.length - 1];

    for (let i = 0; i < sunColors.length - 1; i++) {
        if (t >= sunColors[i].t && t <= sunColors[i + 1].t) {
            start = sunColors[i];
            end = sunColors[i + 1];
            break;
        }
    }

    const localT = (t - start.t) / (end.t - start.t);
    return lerpColor(start.color, end.color, localT);
}

function getSunRayColors(x: number): string {
    const t = x % 100;

    let start = sunRayColors[0];
    let end = sunRayColors[sunRayColors.length - 1];

    for (let i = 0; i < sunRayColors.length - 1; i++) {
        if (t >= sunRayColors[i].t && t <= sunRayColors[i + 1].t) {
            start = sunRayColors[i];
            end = sunRayColors[i + 1];
            break;
        }
    }

    const localT = (t - start.t) / (end.t - start.t);
    return lerpColor(start.color, end.color, localT);
}

export const Sun: FC = () => {
    const { t } = useTime();

    const tMV = useMotionValue(t);

    useEffect(() => {
        animate(tMV, t, { duration: TIME_TICK, ease: "linear" });
    }, [t]);

    const x = useTransform(tMV, (v) => curve(v).x);
    const y = useTransform(tMV, (v) => curve(v).y);

    const xStr = useTransform(x, (v) => `${v}%`);
    const yStr = useTransform(y, (v) => `${v}%`);

    const sunColor = useTransform(tMV, (v) => getSunColor(v));
    const boxShadow = useTransform(tMV, (v) => `0 0 30px 20px ${getSunRayColors(v)}`);

    return <motion.button className={styles.sun} style={{
        left: xStr,
        bottom: yStr,
        backgroundColor: sunColor,
        boxShadow,
    }} />;
}