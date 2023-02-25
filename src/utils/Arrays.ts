

export class ArrayUtils {

    static isStringArraySubset(mainArray:string[],subSetArray:string[]){
        let isSubSet=true;

        const mainArrayObject = mainArray.reduce((acc,cur)=>{
            acc[cur]=true;
            return acc;
        },{});

        for (let i = 0; i < subSetArray.length; i++) {
            const subSet = subSetArray[i];
            if(!mainArrayObject[subSet]){
                isSubSet = false;
                break;
            }
        }
        return isSubSet;
    }

    static convertToArray(data:any){
        if(!Array.isArray(data)){
            data = [data]
        }
        return data;
    }

    static objectValuesArrayFlatUnq(data:{[key:string]:any[]}){
        return  [...new Set(Object.values(data).flat())]
    }

    static convertArrayToObj<T>(arr:T[],key: keyof T ){
        return arr.reduce((acc,cur:any)=>{
            acc[cur[key]]=cur;
            return acc
        },{}) as {[key:string]:T}
    }


    static createArrayChunks(array: any[], chunkSize: number) {
		return [].concat.apply(
			[],
			array.map(function (elem, i) {
				return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
			})
		);
	}

    static arrToCsv(stringArray: string[]): string {
		if (!stringArray.length) {
			return "";
		}
		const formattedString = stringArray.join(", ");
		return formattedString;
	}
}
