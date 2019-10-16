import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

import Comment from "./Comment";

const width = Dimensions.get("screen").width;

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: this.props.item,
            quantityLikes: this.props.item.likers.length,
            newComment: ""
        };
        const usernameFake = "usernameFake";
        this.likeOrUnlike = this.likeOrUnlike.bind(this);
        this.loadingImageLikeOrUnlike = this.loadingImageLikeOrUnlike.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    likeOrUnlike() {
        const photo = { ...this.state.photo, likeada: !this.state.photo.likeada };
        let quantityLikes = this.state.quantityLikes;

        if (photo.likeada == false) {
            photo.likers = photo.likers.filter(liker => liker != usernameFake);
            quantityLikes -= 1;
        } else {
            photo.likers.push({
                login: usernameFake
            });
            quantityLikes += 1;
        }
        this.setState({ photo: photo, quantityLikes: quantityLikes });
    }

    loadingImageLikeOrUnlike() {
        if (this.state.photo.likeada) {
            return require("../../resources/img/s2-checked.png")
        }
        return require("../../resources/img/s2.png")
    }

    displayQuantityLikes() {
        if (!this.state.quantityLikes) {
            return;
        }
        return <Text style={styles.quantityLikes} >{this.state.quantityLikes} likes</Text>;
    }

    displayComments() {
        return this.state.photo.comentarios.map((comment, indice) => (
            <Comment key={indice}
                username={comment.login}
                comment={comment.texto} />
        ));
    }

    addComment() {
        const usernameFake = "usernameFake"
        const isNotEmpty = this.state.newComment.length > 0;
        if (isNotEmpty) {
            const photo = this.state.photo;
            photo.comentarios.push({
                login: usernameFake,
                texto: this.state.newComment,
                id: Math.random()
            });

            this.setState({ photo, newComment: "" });
        }
    }

    render() {
        return (
            <View>
                <View style={styles.photoHeader}>
                    <Image source={{ uri: this.state.photo.urlPerfil }}
                        style={styles.photoProfile} />
                    <Text>{this.state.photo.loginUsuario}</Text>
                </View>
                <Image source={{ uri: this.state.photo.urlFoto }}
                    style={{ "width": width, "height": width }}
                />
                <View style={styles.photoFooter} >
                    <TouchableOpacity onPress={this.likeOrUnlike} >
                        <Image
                            source={this.loadingImageLikeOrUnlike()}
                            style={styles.bottomLike} />
                    </TouchableOpacity>
                    {this.displayQuantityLikes()}
                    <Comment
                        username={this.state.photo.loginUsuario}
                        comment={this.state.photo.comentario} />
                    {this.displayComments()}
                    <View style={styles.containerInputComment}>
                        <TextInput placeholder="Typing comment..."
                            style={styles.inputComment}
                            onChangeText={textTyped => this.setState({ newComment: textTyped })}
                            value={this.state.newComment}
                        />

                        <TouchableOpacity onPress={this.addComment} >
                            <Image source={require("../../resources/img/send.png")}
                                style={styles.imageInputComment}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    inputComment: {
        height: 40, flex: 1,
        borderBottomWidth: 2, borderBottomColor: "#dddd"
    },
    imageInputComment: { width: 30, height: 30 },
    containerInputComment: {
        flexDirection: "row",
        alignItems: "center"
    },
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
    bottomLike: {
        width: 40,
        height: 40
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