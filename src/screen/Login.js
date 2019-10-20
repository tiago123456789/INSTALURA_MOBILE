import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    Button,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';  

import AuthService from '../services/AuthService';
import Constantes from "../config/App";
import NotificationService from '../services/NotificationService';

const width = Dimensions.get("screen").width;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            senha: ""
        };
        this._authService = new AuthService();
        this.authenticate = this.authenticate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    cleanForm() {
        this.setState({ login: "", senha: "" });
    }

    authenticate() {
        this._authService
            .login({ login: this.state.login, senha: this.state.senha })
            .then(async token => {
                await AsyncStorage.setItem(Constantes.ASYNC_STORAGE.TOKEN, token);
                await AsyncStorage.setItem(Constantes.ASYNC_STORAGE.USERNAME, this.state.login);
                this.props.navigation.navigate('Feed');
            })
            .catch(error =>  {
                NotificationService.notify("Ops...", "Datas invalid!", this.cleanForm);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title} >Instalura</Text>
                    <TextInput placeholder="Login..."
                        value={this.state.login}
                        onChangeText={(textTyped) => this.setState({ login: textTyped })}
                        style={styles.input} autoCapitalize={'none'} />

                    <TextInput placeholder="Password..."
                        value={this.state.senha}
                        onChangeText={(textTyped) => this.setState({ senha: textTyped })}
                        style={styles.input} secureTextEntry={true} />

                    <View style={styles.button}>
                        <TouchableOpacity>
                            <Button title="Login" onPress={this.authenticate} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
    form: { flex: 1, alignItems: "center", justifyContent: "center" },
    input: { marginBottom: 10, width: width * 0.8, borderBottomWidth: 1, borderBottomColor: "#ddd", height: 40 },
    button: { marginBottom: 10, width: width * 0.8, marginTop: 20 }
});

export default Login;