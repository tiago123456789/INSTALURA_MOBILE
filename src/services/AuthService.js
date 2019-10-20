import AbstractService from "./AbstractService";
import HttpClient from "../util/HttpClient";
import Constantes from "../config/App";

export default class AuthService extends AbstractService {

    constructor() {
        super();
    }

    login(credentials) {
        return this.getHttpClient()
            .withPath("public/login")
            .withMethod(HttpClient.METHOD_POST)
            .withBody(credentials)
            .request();
    }

}