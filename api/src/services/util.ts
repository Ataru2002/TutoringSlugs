// util.ts
// Any utility functions go here. Currently just a helper function to check that all mandatory parameters are provided in an api request.

export const checkMandatoryParams = (obj: {[key: string] : any}, params: Array<string>) => {
    for(var i of params){
        if(!(i in obj) || obj[i] == null) return i;
    }
    return null;
};