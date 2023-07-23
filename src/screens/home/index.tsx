import React, { useState } from "react";
import { TextBodyTittleText, TextTittle, ViewBody, ViewBodyList, ViewBodyTittle, ViewBodyTittleButton, ViewBodyTittleText, ViewCard, ViewDocument, ViewTittle } from "./styles";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { propsStack } from "../../navigators/propsStack";
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

interface ItemProps {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

type ItemData = {
  ID: number;
  Nome: string;
  DataNascimento: string;
};

const defaultItem = {
  ID: 1,
  Nome: "",
  DataNascimento: ""
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.name, { color: textColor }]}>{item.Nome}</Text>
    <Text style={[styles.birtyDay, { color: textColor }]}>Data de Nascimento: {item.DataNascimento}</Text>
  </TouchableOpacity>
);


const Index: React.FC = () => {

  const [selectedId, setSelectedId] = useState<number>(0);
  const [isSelected, setIsSelectedId] = useState<boolean>(false);
  const [DATA, setData] = useState<ItemData[]>([defaultItem]);

  const navigation = useNavigation<propsStack>();

  const getData = async () => {

    try {
      let isMemory = false;
      let listPeople: ItemData[] = [];

      //Busca na memoria a lista de pessoas
      const PeopleMemory = await AsyncStorage.getItem('Pessoas');

      if (PeopleMemory !== null) {//Caso exista a lista, usa ela
        listPeople = JSON.parse(PeopleMemory);
        isMemory = true;

      } else {//Caso não exista a lista, busque no banco
        await api.get("/pessoas").then((json) => {
          listPeople = JSON.parse(JSON.stringify(json.data));
        });
      }

      if (listPeople.length !== 0) {
        let listPeopleFiltered: ItemData[] = [];

        //Removendo Duplicados
        listPeople.forEach((item) => {
          var duplicated = listPeopleFiltered.findIndex(redItem => {
            return item.Nome == redItem.Nome;
          }) > -1;

          if (!duplicated) {
            item.ID = listPeopleFiltered.length;
            listPeopleFiltered.push(item);
          }
        });

        //Colocando em ordem por data de nascimento
        listPeopleFiltered.sort(function (a: ItemData, b: ItemData) {
          let data1 = a.DataNascimento;
          let data2 = b.DataNascimento;
          if (isMemory) {
            data1 = a.DataNascimento.split('/')[2] + "-" + a.DataNascimento.split('/')[1] + "-" + a.DataNascimento.split('/')[0];
            data2 = b.DataNascimento.split('/')[2] + "-" + b.DataNascimento.split('/')[1] + "-" + b.DataNascimento.split('/')[0];
          }
          return (
            new Date(data1).getTime()) - (new Date(data2).getTime())
        });


        //Localiza João e Maria
        let listaJoaoMaria: ItemData[] = [];
        listPeopleFiltered.find((item) => {
          item.Nome.includes("João") || item.Nome.includes("Maria") ? listaJoaoMaria.push(item) : null;
        });

        //Retirando João e Maria da Lista antiga
        listaJoaoMaria.forEach((a) => listPeopleFiltered.find((b, index) => b.ID === a.ID ? listPeopleFiltered.splice(index, 1) : null));

        //Adicionando no topo da lista os João e Maria
        listPeopleFiltered.unshift(...listaJoaoMaria);

        //Formata a data de nascimento para padrão BR (DD/MM/AAAA) e atualiza o ID da lista para ficar na ordem
        listPeopleFiltered.forEach((item, index) => {
          const dataFormatada = item.DataNascimento.split('-');
          item.ID = index;
          if (!isMemory) {
            item.DataNascimento = dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0];
          }
        });

        //Salvando na Memoria
        const jsonValue = JSON.stringify(listPeopleFiltered);
        await AsyncStorage.setItem('Pessoas', jsonValue);

        listPeople = listPeopleFiltered;
      }

      setData(listPeople);

    } catch (e) {
      console.log("Erro ao recuperar os arquivos: " + e);
    }
  };

  React.useEffect(() => {
    getData();

  }, []);

  React.useEffect(() => {
    getData();
  }, [useIsFocused()]);


  React.useEffect(() => {
    setIsSelectedId(true);
  }, [selectedId]);

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = isSelected ? (item.ID === selectedId) ? '#2e8a57' : '#c2d6dc' : '#c2d6dc';
    const color = isSelected ? (item.ID === selectedId) ? 'white' : 'black' : 'black';
    return (
      <ViewCard>
        <Item
          item={item}
          onPress={() => { setSelectedId(item.ID); navigation.navigate('People', item); }}
          backgroundColor={backgroundColor}
          textColor={color} />
      </ViewCard>
    );
  };


  return (

    <ViewDocument>
      <ViewTittle>
        <TextTittle>X7 Bank - Projeto Teste</TextTittle>
      </ViewTittle>

      <ViewBody>
        <ViewBodyTittle >
          <ViewBodyTittleText>
            <TextBodyTittleText>
              Lista de Pessoas:
            </TextBodyTittleText>
          </ViewBodyTittleText>
          <ViewBodyTittleButton >
            <TouchableOpacity onPress={() => navigation.navigate('People')}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </ViewBodyTittleButton>
        </ViewBodyTittle>
        <ViewBodyList style={{ flex: 18 }}>


          <FlatList
            refreshing={useIsFocused()}
            style={{ width: "100%" }}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={useIsFocused}
          />
        </ViewBodyList>
      </ViewBody>
    </ViewDocument>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    backgroundColor: '#9966ff',
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0, 0.3)',
  },
  name: {
    fontSize: 20,
    fontFamily: "Calistoga",
  },
  birtyDay: {
    fontSize: 10,
    fontFamily: "Calistoga",
  },
});

export default Index;
