export const decodeYokogawaYear = (yearString) => {
    let year = null
    switch (yearString) {
        case "Z":
            year = "23"
            break;
        default:
            break;
    }
    return year;
}

export const decodeYokogawaMonth = (monthString) => {
    let month = null;
    switch (monthString) {
        case "A":
            month = 1;
            break;
        case "B":
            month = 2;
            break;
        case "C":
            month = 3;
            break;
        case "D":
            month = 4;
            break;
        case "E":
            month = 5;
            break;
        case "F":
            month = 6;
            break;
        case "G":
            month = 7;
            break;
        case "H":
            month = 8;
            break;
        case "J":
            month = 9;
            break;
        case "K":
            month = 10;
            break;
        case "L":
            month = 11;
            break;
        case "M":
            month = 12;
            break;
        default:
            break;
    }
    return month.toString().padStart(2, "0");
}