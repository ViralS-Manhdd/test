import * as React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity, TextStyle, TextInput, FlatList } from "react-native"
import { Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface TodoAppScreenProps extends NavigationScreenProps<{}> {
}

const HEADER: TextStyle = {
  width: '100%',
  textAlign: 'center',
  paddingTop: '2%',
  fontSize: 30,
  color: '#fff',
  paddingBottom: 10,
  backgroundColor: "#35D1ED"
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  // justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}
const txInput: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  // color: 'black',
  paddingLeft: 10,
  width: '90%',
  textTransform: "capitalize"
}
const txInputContainer: TextStyle = {
  width: '100%',
  borderColor: 'black',
  borderBottomWidth: 1,
  marginTop: 10,
  minHeight: 50
}
const btnADD: TextStyle = {
  width: 70,
  height: 70,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 50,
  position: 'absolute',
  bottom: 20,
  right: 15,
  backgroundColor: 'red',
}
const ADD: TextStyle = {
  color: '#fff',
  fontSize: 50,
  width: 30,
}
const txList: TextStyle = {
  color: '#000',
  fontSize: 20,
  textAlign: "left",
}
const viewList: ViewStyle = {
  width: '100%',
  paddingHorizontal: 15,
  borderWidth: 1,
}

export const TodoAppScreen: React.FunctionComponent<TodoAppScreenProps> = observer((props) => {
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.movies)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const addTodo = () => {
    if (value.length > 0) {
      // @ts-ignore
      setData([{ title: value, id: Date.now(), checked: false }, ...data])
      setValue('')
    }
  }

  const renderItem1 = ({ item, index }) => {
    return (
      <Text style={txList}>{item.title}</Text>
    )
  }

  return (
    <Screen style={CONTAINER} preset={"fixed"}>
      <Text style={HEADER}>Danh sách phim</Text>
      <View style={txInputContainer}>
        <TextInput
          style={txInput}
          multiline={true}
          autoCapitalize={"sentences"}
          placeholder="Nhập tên phim ?"
          placeholderTextColor="#abbabb"
          value={value}
          onChangeText={value => setValue(value)}
        />
      </View>
      <FlatList
        style={viewList}
        data={data}
        renderItem={renderItem1}
      />
      <TouchableOpacity style={btnADD} onPress={addTodo}>
        <Text style={ADD}>+</Text>
      </TouchableOpacity>
    </Screen>
  )
})
