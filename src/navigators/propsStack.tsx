import { StackNavigationProp } from "@react-navigation/stack";

type ItemData = {
    ID: number;
    Nome: string;
    DataNascimento: string;
  };

export type propsStackNavegation = {
    Home: undefined
    People?: ItemData
}

export type propsStack = StackNavigationProp<propsStackNavegation>;