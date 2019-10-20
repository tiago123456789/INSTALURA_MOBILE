import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';

import Comment from "./Comment";
import InputComment from './InputComment';
import Like from "./Like";
import PostHeader from './PostHeader';
import PostService from '../services/PostService';
import Constants from '../config/App';
import NotificationService from "../services/NotificationService";

const width = Dimensions.get("screen").width;

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: this.props.item,
            quantityLikes: this.props.item.likers.length,
        };
        this._postService = new PostService();
        this.likeOrUnlike = this.likeOrUnlike.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    async likeOrUnlike() {
        const username = await AsyncStorage.getItem(Constants.ASYNC_STORAGE.USERNAME);
        const photo = { ...this.state.photo, likeada: !this.state.photo.likeada };
        let quantityLikes = this.state.quantityLikes;

        try {
            await this._postService.likeUnlike(photo.id);

            if (photo.likeada == false) {
                photo.likers = photo.likers.filter(liker => liker != username);
                quantityLikes -= 1;
            } else {
                photo.likers.push({
                    login: username
                });
                quantityLikes += 1;
            }
            this.setState({ photo: photo, quantityLikes: quantityLikes });
        } catch (error) {
            NotificationService.notify(
                "Ops...", 
                "Occour a problem! Operation can't complete.",
            );
        }
    }

    displayComments() {
        return this.state.photo.comentarios.map((comment, indice) => (
            <Comment key={indice}
                username={comment.login}
                comment={comment.texto} />
        ));
    }

    async addComment(newComment) {
        try {
            const isNotEmpty = newComment.length > 0;
            if (isNotEmpty) {
                const username = await AsyncStorage.getItem(Constants.ASYNC_STORAGE.USERNAME);
                const comment = {
                    login: username,
                    texto: newComment
                };

                await this._postService.addComment(this.state.photo.id, comment);

                const photo = this.state.photo;
                photo.comentarios.push(comment);
    
                this.setState({ photo });
            }
        } catch(error) {
            NotificationService.notify(
                "Ops...", 
                "Occour a problem! Operation can't complete.",
            );
        }
       
    }

    render() {
        return (
            <View>
                <PostHeader
                    urlPerfil={this.state.photo.urlPerfil}
                    loginUsuario={this.state.photo.loginUsuario}
                />
                <Image source={{ uri: this.state.photo.urlFoto }}
                    style={{ "width": width, "height": width }}
                />
                <View style={styles.photoFooter} >
                    <Like
                        likeOrUnlike={this.likeOrUnlike}
                        isLikeOrUnlike={this.state.photo.likeada}
                        quantityLikes={this.state.quantityLikes}
                    />
                    <Comment
                        username={this.state.photo.loginUsuario}
                        comment={this.state.photo.comentario} />
                    {this.displayComments()}
                    <InputComment addComment={this.addComment} />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    photoHeader: {
        margin: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    photoProfile: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10,
        marginBottom: 10
    },
    photoFooter: {
        margin: 7
    },
    quantityLikes: {
        fontWeight: "bold",
        marginLeft: 5
    },
    comment: {
        margin: 5,
        flexDirection: "row"
    },
    usernameComment: {
        fontWeight: "bold",
        marginRight: 5
    }
});

export default Post;