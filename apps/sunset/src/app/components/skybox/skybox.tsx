import { FC, useEffect } from "react";
import styles from './skybox.module.css';
import { Sun } from "../sun/sun";
import { useTime } from "../../contexts/time";
import { Hills } from "../hills/hills";
import { useMotionValue, useTransform } from "motion/react";
import { animate, motion } from "motion/react";
import { lerpColor } from "../../utils/color";
import { Stars } from "../stars/stars";
import { TIME_TICK } from "../../constants/time-tick";

const skyColors = [
    { t: 0, color: '#D5E3E8 ' },  // dawn (peach)
    { t: 25, color: '#87CEEB' }, // noon (light blue)
    { t: 50, color: '#FF7F50' }, // dusk (coral/orange)
    { t: 60, color: '#000112' }, // midnight (dark blue)
    { t: 80, color: '#000112' }, // midnight (dark blue)
    { t: 100, color: '#D5E3E8 ' } // wrap back to dawn
];

function getSkyColor(x: number): string {
    const t = x % 100;

    // find the two surrounding keyframes
    let start = skyColors[0];
    let end = skyColors[skyColors.length - 1];

    for (let i = 0; i < skyColors.length - 1; i++) {
        if (t >= skyColors[i].t && t <= skyColors[i + 1].t) {
            start = skyColors[i];
            end = skyColors[i + 1];
            break;
        }
    }

    // normalize t between start.t and end.t
    const localT = (t - start.t) / (end.t - start.t);
    return lerpColor(start.color, end.color, localT);
}

export const Skybox: FC = () => {
    const { t } = useTime();

    const tMV = useMotionValue(t);

    useEffect(() => {
        animate(tMV, t, { duration: TIME_TICK, ease: "linear" });
    }, [t]);

    const backgroundColor = useTransform(tMV, (v) => getSkyColor(v));

    return (
        <motion.div className={styles.skybox} style={{ backgroundColor }}>
            <div className={styles.sunarea}>
                <Stars />
                <Sun />
                <Hills />
            </div>
        </motion.div>
    );
}
