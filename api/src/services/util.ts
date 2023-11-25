export const checkMandatoryParams = (obj: Object, params: Array<any>) => {
    for(var i of params){
        if(!(i in obj)) return i;
    }
    return null;
};