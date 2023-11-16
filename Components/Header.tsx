import {StyleSheet, Text, View} from 'react-native';

export const Header = (): JSX.Element => {
  return (
    <View style={styles.head}>
      <Text style={styles.headText}>SocialDEV</Text>
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
