import React, { useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from 'react-native';
import {
    useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../Components/Header';
import { userApi } from '../api/userApi';
import { AuthContext } from '../context/AuthContext';
import Post from '../Components/Post';

export const Home = () => {

    const {token, getPosts, posts} = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await getPosts();
        setRefreshing(false);
    };

    return (
        <>
            <Header />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}></View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    data={posts}
                    renderItem={({item}) => <Post post={item} />}
                    keyExtractor={item => item.id.toString()}
                    style={styleList.flatList}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}/>
                    }
                />
                <View style={{ flex: 1 }}></View>
            </SafeAreaView>
        </>
    );
}

const styleList = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    flatList: {
        flexGrow: 1,
    }
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        backgroundColor: 'lightgrey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        marginTop: 15,
        width: 250
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        marginTop: 15,
        width: 200,
        alignItems: 'center'
    },
});
