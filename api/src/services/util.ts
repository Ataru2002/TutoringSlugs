export const checkMandatoryParams = (obj: {[key: string] : any}, params: Array<string>) => {
    for(var i of params){
        if(!(i in obj) || obj[i] == null) return i;
    }
    return null;
};