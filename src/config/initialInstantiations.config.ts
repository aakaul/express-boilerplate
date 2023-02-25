import { UserService } from "../routes/api/v1/users/user.service"


function Instantiates() {
    return [
        UserService
    ]
}

export default {
    instance:Instantiates
}