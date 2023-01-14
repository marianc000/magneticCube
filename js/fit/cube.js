export function cube(size = 3) {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => new Array(size)));
}


