export default  class Env{
    static jwtSecret='jwtSecret';
    static jwtEncoderKey='jwtEncoderKey';
    static NODE_ENV='development';
    static env= 'local';
    static ROOT= 'http://localhost:4000/';
    static ROOT_URL = 'http://localhost';
    static PORT = 4000;
    static sessionSecret = "csjcdkjfnlm823u2#@#$87sbdch87qy98"
    static db={
        host: 'localhost',
        user: 'root',
        password: '',
        database: '',
        port: '3306',
    };
    static ip= '127.0.0.1';
}

