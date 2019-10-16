import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';


class InputComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newComment: ""
        };
        this.submitComment = this.submitComment.bind(this);
    }

    submitComment() {
        this.props.addComment(this.state.newComment);
        this.setState({ newComment: "" });
    }

    render() {
        return (
            <View style={styles.containerInputComment}>
                <TextInput placeholder="Typing comment..."
                    style={styles.inputComment}
                    onChangeText={textTyped => this.setState({ newComment: textTyped })}
                    value={this.state.newComment}
                />

                <TouchableOpacity onPress={this.submitComment} >
                    <Image source={require("../../resources/img/send.png")}
                        style={styles.imageInputComment}
                    />
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    inputComment: {
        height: 40, flex: 1,
        borderBottomWidth: 2, borderBottomColor: "#dddd"
    },
    imageInputComment: { 
        width: 30,
        height: 30
    },
    containerInputComment: {
        flexDirection: "row",
        alignItems: "center"
    },
});

export default InputComment;