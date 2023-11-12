import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import images from "../utils/images";

export const Header = (): JSX.Element => {
    return (
        <View style={styles.head}>
            <Text style={styles.headText}>
                SocialDEV
            </Text>
            <TouchableOpacity>
                <Image source={images.header.loginImage} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        height: 75,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 15,
    },
    headText: {
        fontFamily: "LobsterTwo-Regular",
        fontSize: 30,
        color: 'white'
    }
});