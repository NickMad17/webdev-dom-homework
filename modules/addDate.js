import format from "date-fns/format";

export const addDate = (date) =>{
    date = new Date(date);
    return format(date, "yyyy-MM-dd hh.mm.ss");
}
