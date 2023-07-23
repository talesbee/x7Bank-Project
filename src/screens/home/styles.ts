import styled from "styled-components/native";

export const ViewDocument = styled.View`
  flex: 1
`

export const ViewTittle = styled.View`
  padding-top: 5%;
  justify-content: flex-start;
  alignItems: center;
`;

export const TextTittle = styled.Text`
  font-family:Calistoga;
  fontSize: 24px;
`;

export const ViewBody = styled.View`
  flex: 2;
`

export const ViewBodyTittle = styled.View`
  flex: 1;
  flexDirection: row;
`
export const ViewBodyTittleText = styled.View`
  flex: 4;
`
export const TextBodyTittleText = styled.Text`
    alignSelf: flex-start;
    paddingLeft: 10px;
    fontSize: 20px;
    fontFamily: Calistoga;
`
export const ViewBodyTittleButton = styled.View`
  flex: 1;
  alignItems: center;
  justify-content: center;
`

export const ViewBodyList = styled.View`
  flex: 18;
`

export const ViewCard = styled.View`
  paddingLeft: 10px; 
  paddingRight: 10px;
`
export const TouchItem = styled.TouchableOpacity`
    borderRadius: 15;
    backgroundColor: '#9966ff';
    padding: 10px;
    marginVertical: 2;
    marginHorizontal: 5;
    borderWidth: 1;
    borderColor: 'rgba(0,0,0, 0.3)';
`