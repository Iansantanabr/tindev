import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Text, Platform,  StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';


export default function Login({navigation}){
    const [user, setUser] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then( user => {
            if (user){
                navigation.navigate("Main", { user })
            }
        })
    } , [])

    async function handleLogin(){
        console.log(user);

        const response = await api.post('/devs', { username: user });

        const {_id} = response.data;;

        await AsyncStorage.setItem('user', _id)

        
        navigation.navigate("Main", { user: _id });
    };
    
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            bahavior="padding"
            enabled={Platform.OS === "ios"}
        >
            <Image source={logo}/>

            <TextInput placeholder = "Digite Seu User do GitHub"
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#999"
                value={user}
                onChangeText={setUser}
                />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}> Entrar </Text>
            </TouchableOpacity>


                   
        </KeyboardAvoidingView>
    );
}


//styles

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor:'#f5f5f5',
        justifyContent:'center',
        alignItems:'center',
        padding:30,
    },
    input:{
        height:46,
        alignSelf:'stretch',
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:3,
        borderColor:'#ddd',
        marginTop:20,
        paddingHorizontal:15,
        },

    button:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
