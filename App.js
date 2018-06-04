/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import AesCrypto from 'react-native-aes-kit';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const plaintxt = 'test';
const secretKey = '0102030405060708';
const iv = '1112131415161718';
type Props = {};
export default class App extends Component<Props> {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            cipher:'',
            plaintxt:''
        };
      }

    componentDidMount() {
        AesCrypto.encrypt(plaintxt, secretKey, iv).then(cipher => {
            console.log(cipher);// return a string type cipher
            this.setState({ cipher });
            AesCrypto.decrypt(cipher, secretKey, iv).then(plaintxt => {
                console.log(plaintxt);// return a string type plaintxt
                this.setState({ plaintxt });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {cipher,plaintxt} =this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    cipher:{cipher}
                </Text>
                <Text style={styles.welcome}>
                    plaintxt:{plaintxt}
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
