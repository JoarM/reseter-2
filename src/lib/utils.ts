import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function randomUsage() {
    const sizeMultiplier = Math.floor(Math.random() * 220) + 1;

    let arr = [];
    for (let i = 0; i < 7; i++) {
        arr.push(((Math.floor(Math.random() * 10)) + 1)  * sizeMultiplier);
    }
    return arr;
}

export const getYAxisDomain = (
    autoMinValue: boolean,
    minValue: number | undefined,
    maxValue: number | undefined,
) => {
    const minDomain = autoMinValue ? "auto" : minValue ?? 0;
    const maxDomain = maxValue ?? "auto";
    return [minDomain, maxDomain];
};

export function hasOnlyOneValueForThisKey(array: any[], keyToCheck: string) {
    const val = [];
  
    for (const obj of array) {
      if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
        val.push(obj[keyToCheck]);
        if (val.length > 1) {
          return false;
        }
      }
    }
  
    return true;
}

export type ValueFormatter = {
    (value: number): string;
};
export type CurveType = "linear" | "natural" | "monotone" | "step";

export const defaultValueFormatter: ValueFormatter = (value: number) => value.toString();

export function getPriceMultiplier(requests: number) {
    return 0.1904;
}
