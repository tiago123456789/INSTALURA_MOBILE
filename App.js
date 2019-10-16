/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Post from './src/components/Post';

const photos = [
  { id: '1', user: { name: "Tiago Rosa da costa" } },
  { id: '2', user: { name: "Tiago R. da costa 2" } }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    fetch("http://192.168.1.104:8082/api/public/fotos/rafael")
      .then(response => response.json())
      .then(datas => this.setState({ photos: [...datas] }))
      .catch(console.log);
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.photos}
        keyExtractor={item => item.id.toString() }
        renderItem={({ item }) =>
          <Post item={item}/>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  photoHeader: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  photoProfile: { 
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10 
  }
});

export default App;
