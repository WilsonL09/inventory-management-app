
export type Inventory = {
    name : string,
    quantity: number,
}

export function parseName(name: string):string {
    name = name.trim();
    if(name.length == 0)
        return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
}
