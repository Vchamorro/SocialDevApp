import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import images from "../utils/images";

export const Footer = (): JSX.Element => {
    return (
        <View style={styles.foot}>
            <TouchableOpacity>
                <Image source={images.footer.homeImage} style={{ width: 40, height: 40 }}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={images.footer.addImage} style={{ width: 40, height: 40 }}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={images.footer.userImage} style={{ width: 40, height: 40 }}></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    foot: {
        height: 75,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 15,
    }
});