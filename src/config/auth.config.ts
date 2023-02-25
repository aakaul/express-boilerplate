import config from "config"

export default {
    "secret": config.get<string>("token.sessionSecret"),
    "tokenExpiry": config.get<number>("token.expiry")
}