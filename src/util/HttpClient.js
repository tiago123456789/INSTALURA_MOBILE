import Constantes from "../config/App";
import axios from "axios";

export default class HttpClient {

    static METHOD_GET = "GET";

    static METHOD_POST = "POST";
    
    constructor() {
        this._url = Constantes.BASE_URL_API;
        this._header = {};
        this._body = {};
        this._method;
    }

    withPath(path) {
        this._url += path;
        return this;
    }

    withHeader(values = {}) {
        this._populateObject(this._header, values);
        return this;
    }

    withBody(values = {}) {
        this._populateObject(this._body, values);
        return this;
    }

    _populateObject(objectToPopulate, values = {}) {
        const keys = Object.keys(values);
        keys.forEach(key => {
            objectToPopulate[key] = values[key];
        });
        return objectToPopulate;
    }

    withMethod(method) {
        this._method = method
        return this;
    }

    request() {
        this._method = this._method.toLowerCase();
        this._header["Content-Type"] = "application/json";
        
        if (this._method == HttpClient.METHOD_GET) {
            return axios[this._method](this._url, { "headers": this._header })
                .then(this._extractDataResponse);
        }

        return axios[this._method](this._url, this._body, { "headers": this._header })
            .then(this._extractDataResponse);
    }

    _extractDataResponse(response) {
        if (response.data) {
            return response.data;
        }
        return response;
    }
}