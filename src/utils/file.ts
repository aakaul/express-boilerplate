import * as https from 'https';
import * as http  from 'http';

export default class FileUtil {

    static async fetchUrlGet(url:string,port?:number,header:any={}):Promise<any>{
        const urlSplit=url.split('/')

        const proto={...(urlSplit[0]=="https:")?https:http};
        const options = {
            strictSSL: false,
            rejectUnauthorized: false,
            requestCert: false,
            hostname:urlSplit[2] ,
            port: port || ((urlSplit[0]=="https:")?443:80),
            path: '/'+urlSplit.splice(3).join('/'),
            headers: {
                ...header
            }
        };
        return new Promise((resolve,reject)=>{
            proto.get(options, (res:any) => {
                let resBody=``;
                res.on('data', (d:any) => {
                    resBody+=d;
                });

                res.on('end',()=>{
                    resolve(resBody);
                });

            }).on('error', (e:any) => {
                reject();
            });
        });
    }

    static async makePostReq(url:string,body:any,port?:number,header:any={}):Promise<any>{
        try {
            let data = JSON.stringify({...body});

            const urlSplit=url.split('/')

            const proto={...(urlSplit[0]=="https:")?https:http};

            const options = {
                strictSSL: false,
                rejectUnauthorized: false,
                requestCert: false,
                hostname:urlSplit[2] ,
                port: port || ((urlSplit[0]=="https:")?443:80),
                path: '/'+urlSplit.splice(3).join('/'),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    ...header
                }
            };

            return new Promise((resolve,reject)=>{
                const postReq = proto.request(options,(res:any) => {
                    let resBody=``;
                    res.on('data', (d) => {
                        resBody+=d;

                    });
                    res.on('end',()=>{
                        resolve(resBody)
                    })
                }).on('error', (e:any) => {
                    console.log(e)
                    reject(e);
                });
                postReq.write(data);
                postReq.end();
            });

        } catch (error) {
            console.log(error)
        };
    }

    static async fetchUrlPost(url:string,body:any,port?:number):Promise<any>{
        try {
            let smsSend = JSON.stringify({smsSend:body});


            const urlSplit=url.split('/')

            const proto={...(urlSplit[0]=="https:")?https:http};

            const options = {
                strictSSL: false,
                rejectUnauthorized: false,
                requestCert: false,
                hostname:urlSplit[2] ,
                port: port || ((urlSplit[0]=="https:")?443:80),
                path: '/'+urlSplit.splice(3).join('/'),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': smsSend.length
                }
            };


            return new Promise((resolve,reject)=>{
                const postReq = proto.request(options,(res:any) => {
                    let resBody='';
                    res.on('data', (d) => {
                        resBody+=d;
                    });
                    res.on('end',()=>{
                        resolve(resBody);
                    });
                }).on('error', (e:any) => {
                    reject(e);
                });
                postReq.write(smsSend);
                postReq.end();
            });

        } catch (error) {
            console.error(error)
        };
    }

    static getImage(imageNameWithExt: string): Promise < string > {
        let imageNameWithoutExt=imageNameWithExt.substr(0,imageNameWithExt.lastIndexOf("."));
        let ext=imageNameWithExt.substr(imageNameWithExt.lastIndexOf(".")+1,imageNameWithExt.length);
        return new Promise(async (resolve, reject) => {
            let imageBase64 = '';
            if (imageNameWithoutExt) {
                try {
                    const data = await FileUtil.fetchUrlGet(`https://ezobanks.com/api/v1/images/${imageNameWithoutExt}/${ext}`,5000);

                    const response: ImageCallResponse = JSON.parse(data);
                    imageBase64 = response && response.data && response.data.status == 'success' ?
                        response.data.base64 :
                        '';
                } catch (error) {
                    reject(error);
                }
            }
            resolve(imageBase64)
        })
    }
}

class ImageCallResponse {
    data: {
        status: string,
        base64: string
    };
}
