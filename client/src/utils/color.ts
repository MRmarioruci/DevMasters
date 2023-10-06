export const hexToRGB = (hex:string):string => {
    hex = hex.toLowerCase()
    // check for the length of hex input
    if (hex.length === 3) {
        // Expand hex code to 6 characters if the input is in the format of #RGB
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    } else if (hex.length === 4) {
        // Expand hex code to 8 characters if the input is in the format of #RGBA
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }

    // Convert the hex string to an array of integers
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Return an RGB object
    return `${r} ${g} ${b}`;
}