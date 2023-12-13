import React from "react";
import { Text, View, FlatList, StyleSheet } from 'react-native';

const SkillList = ({ skills }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Habilidades blandas:</Text>
        <FlatList
            data={skills}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (<Text style={styles.text2}>-{item.name}</Text>) }
        />
        </View>
    );
    }
    const styles = StyleSheet.create({
        container: {
            marginLeft: 20, // Ajusta el margen izquierdo según sea necesario
        },
        title:{
            color: 'black',
            fontSize: 24,
            textAlign: 'left',
            marginTop: 13,
            fontFamily: 'LobsterTwo-Regular'
        },
        text2:{
            marginLeft: 20,
            color: 'black',
            fontSize: 24,
            textAlign: 'left',
            marginTop: 13,
            fontFamily: 'LobsterTwo-Regular'
        },
    });
    export default SkillList;