import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function randomUsage() {
    const sizeMultiplier = Math.floor(Math.random() * 8) + 1;

    let arr = [];
    for (let i = 0; i < 7; i++) {
        arr.push(Math.floor(Math.random() * 10) * sizeMultiplier);
    }
    return arr;
}
