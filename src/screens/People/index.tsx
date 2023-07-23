import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import api from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { propsStack } from "../../navigators/propsStack";
import { ViewDocument, ViewTittle, TextTittle, ViewBody, ViewBodyTittle, TextBodyTittleText, ViewBodyForm, TextForm, ViewBodyFormField, ViewBodyButton, ViewBodyFormText, ViewBodyFormInput, ViewBodyButtonActionSave, ViewBodyButtonAction, ViewBodyTextValid } from "./styles";

type ItemData = {
    ID?: number;
    Nome?: string;
    DataNascimento?: string;
};


const Index: React.FC = () => {
    const navigation = useNavigation<propsStack>();
    const params: ItemData | undefined = useRoute().params;

    const [name, setName] = useState<string>();
    const [birthDay, setBirthDay] = useState<string>();

    const [isValid, setIsValid] = useState<boolean>(true);


    const isCreatePeople: boolean = params === undefined;

    React.useEffect(() => {
        if (params !== undefined) {
            setName(params.Nome);
            setBirthDay(params.DataNascimento);
        }
    }, []);

    React.useEffect(() => {
        setIsValid(true);
    }, [name, birthDay]);

    const newPeople = async () => {
        console.log("New!");
        let validing = true;
        if ((birthDay !== "" && birthDay !== undefined) && (name !== "" && name !== undefined)) { //Validação simples, apenas se os campos não estão vazio
            let listPeople: ItemData[] = [];
            const PeopleMemory = await AsyncStorage.getItem('Pessoas');
            const newPeopleItem: ItemData = {
                ID: PeopleMemory?.length,
                Nome: name,
                DataNascimento: birthDay
            }
            if (PeopleMemory !== null) {
                listPeople = JSON.parse(PeopleMemory);
            } else {
                newPeopleItem.ID = 0;
            }

            listPeople.find((a) => a.Nome === newPeopleItem.Nome ? validing = false : listPeople.push(newPeopleItem));

            if (validing) {
                const jsonValue = JSON.stringify(listPeople);
                await AsyncStorage.setItem('Pessoas', jsonValue);
                navigation.navigate('Home');
            } else {

                setIsValid(false);
            }

        } else {
            setIsValid(false);
        }

    };

    const delPeople = async () => {
        const PeopleMemory = await AsyncStorage.getItem('Pessoas');
        let listPeople: ItemData[] = [];

        if (PeopleMemory !== null) {

            listPeople = JSON.parse(PeopleMemory);

            if (params?.ID !== undefined) {

                listPeople.splice(params.ID, 1);
                const jsonValue = JSON.stringify(listPeople);
                await AsyncStorage.setItem('Pessoas', jsonValue);
                navigation.navigate('Home');
            }
        }
    }

    const updatePeople = async () => {

        if ((birthDay !== "" && birthDay !== undefined) && (name !== "" && name !== undefined)) { //Validação simples, apenas se os campos não estão vazio
            const PeopleMemory = await AsyncStorage.getItem('Pessoas');

            let listPeople: ItemData[] = [];
            if (PeopleMemory !== null) {

                listPeople = JSON.parse(PeopleMemory);
                if (params?.ID !== undefined) {

                    const item: ItemData = {
                        ID: params.ID,
                        Nome: name,
                        DataNascimento: birthDay
                    }

                    listPeople.splice(params.ID, 1);
                    listPeople.push(item);


                    const jsonValue = JSON.stringify(listPeople);
                    await AsyncStorage.setItem('Pessoas', jsonValue);
                    navigation.navigate('Home');
                }
            }

        } else {
            setIsValid(false);
        }
    }



    return (
        <ViewDocument>
            <ViewTittle>
                <TextTittle>X7 Bank - Projeto Teste</TextTittle>
            </ViewTittle>

            <ScrollView>
                <ViewBody>
                    <ViewBodyTittle>
                        {isCreatePeople ?

                            <TextBodyTittleText>Cadastro de uma nova Pessoa</TextBodyTittleText>

                            :
                            <TextBodyTittleText>Editar Pessoa</TextBodyTittleText>

                        }
                    </ViewBodyTittle>
                    <ViewBodyForm>
                        <ViewBodyFormField>
                            <ViewBodyFormText>
                                <TextForm>Nome</TextForm>
                            </ViewBodyFormText>
                            <ViewBodyFormInput >
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setName}
                                    value={name}
                                    placeholder="Nome"
                                />
                            </ViewBodyFormInput>

                            <ViewBodyFormText>
                                <TextForm>Data de Nascimento</TextForm>

                            </ViewBodyFormText>
                            <ViewBodyFormInput>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setBirthDay}
                                    value={birthDay}
                                    placeholder="DD/MM/AAAA"
                                    maxLength={10}
                                />
                            </ViewBodyFormInput>
                        </ViewBodyFormField>
                    </ViewBodyForm>
                    <ViewBodyButton>
                        <ViewBodyButtonAction>
                            <ViewBodyButtonActionSave>
                                <TouchableOpacity onPress={() => isCreatePeople ? newPeople() : updatePeople()}>
                                    <Feather name="save" size={50} color="green" />
                                </TouchableOpacity>
                            </ViewBodyButtonActionSave>
                            <ViewBodyButtonActionSave>
                                {isCreatePeople ?
                                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                        <MaterialIcons name="cancel" size={50} color="red" />
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity onPress={() => delPeople()}>
                                        <AntDesign name="delete" size={50} color="red" />
                                    </TouchableOpacity>

                                }
                            </ViewBodyButtonActionSave>
                        </ViewBodyButtonAction>
                        {!isValid && (
                            <ViewBodyTextValid >
                                <TextForm style={{ color: 'red' }}>Obrigatório os dois campos preenchidos</TextForm>
                            </ViewBodyTextValid>
                        )}
                        {!isCreatePeople && (
                            <ViewBodyTextValid >
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <MaterialIcons name="cancel" size={50} color="black" />
                                </TouchableOpacity>
                            </ViewBodyTextValid>
                        )}
                    </ViewBodyButton>
                </ViewBody>
            </ScrollView>

        </ViewDocument>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        fontFamily: 'Calistoga',
        padding: 5
    }
});

export default Index;