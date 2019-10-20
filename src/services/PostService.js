import AbstractService from "./AbstractService";
import HttpClient from "../util/HttpClient";
import Constantes from "../config/App";
import { AsyncStorage } from "react-native"

export default class PostService extends AbstractService {

    constructor() {
        super();
    }

    async likeUnlike(idPost) {
        const accessToken = await AsyncStorage.getItem(Constantes.ASYNC_STORAGE.TOKEN);
        return this.getHttpClient()
                    .withPath("fotos/" + idPost + "/like?X-AUTH-TOKEN=" + accessToken)
                    .withMethod(HttpClient.METHOD_POST)
                    .request();
    }

    async addComment(idPost, comment) {
        const accessToken = await AsyncStorage.getItem(Constantes.ASYNC_STORAGE.TOKEN);
        return this.getHttpClient()
                    .withPath("fotos/" + idPost + "/comment?X-AUTH-TOKEN=" + accessToken)
                    .withMethod(HttpClient.METHOD_POST)
                    .withBody(comment)
                    .request(); 
    }

    async findFeed() {
        const accessToken = await AsyncStorage.getItem(Constantes.ASYNC_STORAGE.TOKEN);
        return this.getHttpClient()
                    .withPath("fotos?X-AUTH-TOKEN=" + accessToken)
                    .withMethod(HttpClient.METHOD_GET)
                    .request();
    }

    findAllByUsername(username) {
        return this.getHttpClient()
            .withPath(`public/fotos/${username}`)
            .withMethod(HttpClient.METHOD_GET)
            .request();
    }
}