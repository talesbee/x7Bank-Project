import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, SafeAreaView } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

interface IProps {
    handleClose: () => {};
}

export default function CardPessoa(props: IProps) {
    const { handleClose } = props;
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleClose}></TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.subTittle}>Dados da Pessoa Selecionada:</Text>
            </View>

            {/* <View style={{ flex: 1, borderWidth: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 8, paddingLeft: 20, justifyContent: 'center' }}>
                            <Text style={styles.subTittle}>Dados da Pessoa Selecionada:</Text>

                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10 }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => handleClose(false)}>
                                <AntDesign name="close" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: '80%' }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text>Nome: </Text>
                            <TextInput style={{ fontFamily: 'Calistoga', fontSize: 18, borderWidth: 1, width: '40%', paddingLeft: 5 }}
                                onChangeText={(text) => setEditedName(text)}
                                value={editedName} />
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, paddingTop: 10 }}>
                            <Text>Data de Nascimento: </Text>
                            <TextInput style={{ fontFamily: 'Calistoga', fontSize: 18, borderWidth: 1, width: '40%', paddingLeft: 5 }}
                                onChangeText={(text) => setEditedBirthDay(text)}
                                keyboardType='numeric'
                                value={editedBirthDay} />
                        </View>


                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', paddingRight: 10 }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => setIsSelectedId(false)}>
                                <FontAwesome name="save" size={50} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', paddingRight: 10 }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => setIsSelectedId(false)}>
                                <AntDesign name="delete" size={50} color="black" />
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        backgroundColor:'red',
        marginVertical: 20,
        marginLeft: 10,
        marginRight: 10
    },
    subTittle: {
        fontSize: 20,
        fontFamily: "Calistoga",
    },
});