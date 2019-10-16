import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


class Comment extends Component {

    render() {
        const { username, comment } = this.props;
        return (
            <View style={styles.comment} >
                <Text style={styles.usernameComment} >
                    {username}</Text>
                <Text style={styles.textComment}>{comment}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    comment: {
        margin: 5,
        flexDirection: "row"
    },
    usernameComment: {
        fontWeight: "bold",
        marginRight: 5
    },
    textComment: {
        textAlign: "justify"
    }
});

export default Comment;