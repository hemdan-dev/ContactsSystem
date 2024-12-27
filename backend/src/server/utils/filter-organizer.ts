export const FilterOrganizer = (query: any) => {
    //get the filter values
    let { offset, limit, where } = query;
    //check if the limit is greater than 5 just reset it to 5
    if((limit && +limit > 5) || !limit) limit = 5;
    //check if where is not an object just reset it to an empty object
    if((where && typeof where !== "string") || !where) where = "{}";
    //parse the where object to JSON
    where = JSON.parse(where)?.['$where'] || {};
    //check if offset is not a number just reset it to 0
    if(!offset || isNaN(+offset)) offset = 0;
    //return the filter
    return {
        offset,
        limit,
        where
    };
}