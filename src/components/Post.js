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
import InputComment from './InputComment';
import Like from "./Like";

const width = Dimensions.get("screen").width;

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: this.props.item,
            quantityLikes: this.props.item.likers.length,
        };
        this.likeOrUnlike = this.likeOrUnlike.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    likeOrUnlike() {
        const usernameFake = "usernameFake";
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

    displayComments() {
        return this.state.photo.comentarios.map((comment, indice) => (
            <Comment key={indice}
                username={comment.login}
                comment={comment.texto} />
        ));
    }

    addComment(newComment) {
        const isNotEmpty = newComment.length > 0;
        if (isNotEmpty) {
            const photo = this.state.photo;
            photo.comentarios.push({
                login: usernameFake,
                texto: newComment,
                id: Math.random()
            });

            this.setState({ photo });
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