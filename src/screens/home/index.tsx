import React, { useState } from "react";

import { Container, TextTittle, ViewTittle, ViewDocument } from "./styles";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

type ItemData = {
  id: number;
  name: string;
  birthDay: string;
};



const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
    <Text style={[styles.birthDay, { color: textColor }]}>{item.birthDay}</Text>
  </TouchableOpacity>
);

const Index: React.FC = () => {

  const [selectedId, setSelectedId] = useState<number>(0);
  const [DATA, setData] = useState<ItemData>();

  

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (

    <Container>
      <ViewTittle>
        <TextTittle>X7 Bank - Projeto Teste</TextTittle>
      </ViewTittle>

      <ViewDocument>

        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          extraData={selectedId.toString()}
        />

      </ViewDocument>
      <ViewDocument style={{borderWidth:1}
      }>

        <Text>{DATA[selectedId].name}</Text>
        <Text>{DATA[selectedId].birthDay}</Text>






      </ViewDocument>
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#9966ff',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 5,
  },
  name: {
    fontSize: 32,
  },
  birthDay: {
    fontSize: 20,
  },
});

export default Index;
