import HttpClient from "../util/HttpClient";

export default class AbstractService {

    constructor() {
        this.httpClient = new HttpClient();
    }

    getHttpClient() {
        return this.httpClient;
    }
}