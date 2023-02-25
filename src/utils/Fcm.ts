import * as http from 'https';

export default class Fcm {

    public static send(config: {fcmToken: string, title: string, body: string, click_action?: string, image?: string, data?: any}) { /*TODO add sound,img,data keys */
        if (!config.data) {config.data = {}; }
        return new Promise((resolve) => {
            try {
                const fcmReq = http.request({
                    protocol: 'https:',
                    hostname: 'fcm.googleapis.com',
                    port: 443,
                    path: '/fcm/send',
                    method: 'POST',
                    headers: {
                        'Authorization': 'key=${:urkey}',
                        'Content-Type': 'application/json',
                    },
                }, (res) => {

                });
                let tnsData = '{}';
                try {
                    tnsData = JSON.stringify({
                        to : config.fcmToken,
                        collapse_key : 'type_a',
                        notification : {
                            click_action : config.click_action,
                            body : config.body,
                            title: config.title,
                            image: config.image,
                        },
                        data : config.data,
                    });
                } catch (e) {
                    console.error(e);
                }
                fcmReq.write(tnsData);
                fcmReq.end();
            } catch (e) {
                console.error(e);
            }
            setTimeout(() => {
                resolve('');
            }, 1);
        });
    }
    public static sendDataNotif(config: {
        fcmToken: string, 
        title: string, 
        body: string, 
        url?: string,
        bellType?:string,
        imageUrl?:string,
        isAlarm?:boolean,
        loopCount?:number,
        clickAction?:string,
    }) {
        return new Promise((resolve) => {
            try {
                const fcmReq = http.request({
                    protocol: 'https:',
                    hostname: 'fcm.googleapis.com',
                    port: 443,
                    path: '/fcm/send',
                    method: 'POST',
                    headers: {
                        'Authorization': 'key=${:urkey}',
                        'Content-Type': 'application/json',
                    },
                }, (res) => {

                });
                let tnsData = '{}';
                try {
                    tnsData = JSON.stringify({
                        to : config.fcmToken,
                        collapse_key : 'type_a',
                        data : {
                            body : config.body,
                            title: config.title,
                            url : config.url,
                            bell_type:config.bellType,
                            loopCount:config.loopCount,
                            imageUrl:config.imageUrl,
                            isAlarm:config.isAlarm,
                            click_action:config.clickAction,
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
                fcmReq.write(tnsData);
                fcmReq.end();
            } catch (e) {
                console.error(e);
            }
            setTimeout(() => {
                resolve('');
            }, 1);
        });
    }
}
