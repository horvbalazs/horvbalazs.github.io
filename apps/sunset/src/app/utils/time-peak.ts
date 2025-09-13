/**
 * Get the value of the time of the day peak based on t.
 * @input t Time of the day, from 0 to 100 (0 = dusk, 25 = noon, 50 = dawn, 75 = midnight; if t > 100 it normalised to 100).
 * @return A number from 0 to 1 representing the peak of the time of the day (0 = midnight, 1 = noon).
 */
export function getTimePeak(t: number): number {
    const mod = t % 100;
    const radians = ((mod - 25) / 50) * Math.PI;
    return (Math.cos(radians) + 1) / 2;
}