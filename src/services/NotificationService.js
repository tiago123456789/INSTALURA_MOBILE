import { Alert } from "react-native";

export default class NotificationService {

    static notify(title, message, action = () => {}) {
        Alert.alert(
            title, 
            message,
            [
                { text: "OK", onPress: action }
            ]
        );
    }
}