import axios, {AxiosPromise} from "axios";
import {IUser} from "../models/IUser";

export default class UserServer {
    static async getUsers(): Promise<AxiosPromise<IUser[]>> {
        return axios.get<IUser[]>("./users.json")
    }
}

