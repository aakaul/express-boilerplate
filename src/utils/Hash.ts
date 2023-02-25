import { Md5 } from 'md5-typescript';
import bcrypt  from "bcryptjs"
import config from "config"
import { v4 } from "uuid";

const saltRounds = config.get<number>("saltRounds");
export class Hash {

    static md5(str: string){
      return Md5.init(str).toString();
    }

    static generateKey (length=10, set: 'ALL' | 'NUM' | 'ALPHA' | 'CAPS' | 'SAFE' = 'ALL' ){
      let characters= CharSets[set]

      var charactersLength = characters.length-1;
      var randomString = '';
      for (let i = 0; i < length; i++) {
          randomString+=characters[Math.floor(Math.random()*(charactersLength+1))];
      }
      return randomString;
    }

    static bcryptHash(s:string){
        return bcrypt.hash(s,saltRounds)
    }

    static compareBcryptHash(s:string,hash:string){
        return bcrypt.compare(s,hash)
    }

    static bcyrptSalt(){
      return bcrypt.genSalt(10)
    }

    static hash(str:string){
      let hash = 0,char;
          if (str.length == 0) {
              return hash;
          }
          for (var i = 0; i < str.length; i++) {
              char = str.charCodeAt(i);
              hash = ((hash<<5)-hash)+char;
              hash = hash & hash; // Convert to 32bit integer
            }
            hash = hash < 0 ? hash*-1 : hash;
          return (hash+"");
    }

    static uuid() {
		return v4();
	}

}


export class CharSets{
  static ALL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static NUM = '0123456789';
  static ALPHA =  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static CAPS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static SAFE = 'bcdfghjklmnpqrstvwxz';
}
