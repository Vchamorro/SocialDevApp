import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import images from '../utils/images';
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';

export const Header = (): JSX.Element => {
  const {logOut} = useContext(AuthContext);
  return (
    <View style={styles.head}>
      <Text style={styles.headText}>SocialDev</Text>
      <TouchableOpacity onPress={logOut}>
        <Image
          source={images.header.logoutImage}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </View>
  );
};

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
    fontFamily: 'LobsterTwo-Regular',
    fontSize: 30,
    color: 'white',
  },
});
