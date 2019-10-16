import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';


class PostHeader extends Component {

    render() {
        const { urlPerfil, loginUsuario } = this.props;
        return (
            <View style={styles.photoHeader}>
                <Image source={{ uri: urlPerfil }}
                    style={styles.photoProfile} />
                <Text>{loginUsuario}</Text>
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
    }
});

export default PostHeader;