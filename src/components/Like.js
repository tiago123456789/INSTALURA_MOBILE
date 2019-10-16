import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';


class Like extends Component {

    constructor(props) {
        super(props);
    }

    displayQuantityLikes() {
        if (!this.props.quantityLikes) {
            return;
        }
        return <Text style={styles.quantityLikes} >{this.props.quantityLikes} likes</Text>;
    }

    loadingImageLikeOrUnlike() {
        if (this.props.isLikeOrUnlike) {
            return require("../../resources/img/s2-checked.png")
        }
        return require("../../resources/img/s2.png")
    }

    render() {
        return (
            <View>  
                <TouchableOpacity onPress={this.props.likeOrUnlike} >
                    <Image
                        source={this.loadingImageLikeOrUnlike()}
                        style={styles.bottomLike} />
                </TouchableOpacity>
                {this.displayQuantityLikes()}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    bottomLike: {
        width: 40,
        height: 40
    }
});

export default Like;