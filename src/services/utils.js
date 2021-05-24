export  function getColor(imp_lvl){
    switch(imp_lvl){
        case "1":
            return "cyan lighten-2"
        case "2":
            return "lime lighten-2";
        case "3":
            return "yellow lighten-2"
        case "4":
            return "orange lighten-2";
        case "5":
            return "red lighten-2";
        default:
            return "cyan lighten-2";
    }
}

export function parseDate(date){
    return date.substr(0,10);
}