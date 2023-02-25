export default class DateUtil {


    static daysInMonth(date:number):number{
      const d = new Date(date),
      mm = d.getMonth() + 1,
      yyyy = d.getFullYear();
      return new Date(yyyy, mm, 0).getDate()
    }

    static isValidDate = (date: any) => !isNaN(Date.parse(date));

    static dateToDDMMYYY(date: number, seperator ? : string) {
        if (!seperator) seperator = '/';
        const d = new Date(date),
        dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
        mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1),
        yyyy = d.getFullYear();
        return dd + seperator + mm + seperator + yyyy;
    }

    static dateToMMDDYYY(date: number, seperator ? : string) {
        if (!seperator) seperator = '/';
        const d = new Date(date),
        dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
        mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1),
        yyyy = d.getFullYear();
        return mm + seperator + dd + seperator + yyyy;
    }

    static getMonthSpan(year?:number, month?:number): {startTime: number, endTime: number}{
      const date = new Date(), 
      y = year && month!=undefined && this.yearTest(year) ? year : date.getFullYear(), 
      m = month!=undefined && month<13 && month >= 0 ? month : date.getMonth();
      const startTime = new Date(y, m, 1).getTime();
      const endTime = new Date(y, m + 1, 1).getTime();
      return {
        startTime,
        endTime
      }
    }

    static yearTest(year: number|undefined){
      let currYear = new Date().getFullYear();
      return parseInt(year + '',10) === year && year > (currYear-5) && year < (currYear+5);
    }

    static getToAndFromFn(type: string, days: number = 0): ToAndFrom {
        const today = Date.now();
        const timeStampinOneDay = 86400000;
        const fromObject:any = {
          Week(d: number) {
            const date = new Date(today);
            const day = (date).getDay() || 7;
            if (day !== 1) date.setHours(-24 * (day - 1));
            return +new Date(date);
          },
    
          Today: (d: number) => +(new Date(today).setHours(0, 0, 0, 0)),
    
          Month: (d: number) => +new Date(new Date().setDate(1)).setHours(0, 0, 0, 0),
    
          Quarter(d: number) {
            const date = new Date();
            const setQuaterMonth = date.setMonth((date.getMonth() - date.getMonth() % 3), 1);
            return new Date(setQuaterMonth).setHours(0, 0, 0, 0);
          },
    
          Year: (d: number) => new Date().getMonth() > 3 ?
            +new Date(new Date().getFullYear(), 3, 1) :
            +new Date(new Date().getFullYear() - 1, 3, 1),
    
          Custom: (days: number) => +new Date(Date.now() - days * timeStampinOneDay),
        }
        return {
          fromDate: fromObject[type](days),
          toDate: today
        }
    
      }


}



class ToAndFrom {
    toDate:number;
    fromDate:number;
}