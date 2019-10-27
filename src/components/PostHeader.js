import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';


class PostHeader extends Component {

    constructor(props) {
        super(props);
    }

    goToProfile(username) {
        this.props.navigation.navigate('Profile', {
            username
        });
    }

    render() {
        const { urlPerfil, loginUsuario } = this.props;
        return (
            <TouchableOpacity onPress={() => this.goToProfile(loginUsuario)} >
                <View style={styles.photoHeader}>
                    <Image source={{ uri: urlPerfil }}
                        style={styles.photoProfile} />
                    <Text>{loginUsuario}</Text>
                </View>
            </TouchableOpacity>
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