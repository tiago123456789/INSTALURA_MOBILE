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

import Post from '../components/Post';
import PostService from '../services/PostService';
import NotificationService from '../services/NotificationService';

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      urlProfile: ""
    };
    this.postService = new PostService();
    this.props.navigation.setParams({ title: this.props.navigation.state.params.username });
  }

  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `${state.params.title}`,
    };
  };

  async componentDidMount() {
    await this.postService.findFeed()
      .then(datas => this.setState({ photos: [...datas], urlProfile: datas[0]["urlPerfil"] }))
      .catch(error => NotificationService.notify("Ops...", "Datas invalid!", () => {}));
  }

  render() {
    return (
      <View>
        <View style={{ 
          flexDirection: "row", alignItems: "center",
          height: 150, borderBottomColor: "#d6d6c2", borderBottomWidth: 1 }}>
          <Image 
            style={styles.photoProfile}
            source={{ uri: this.state.urlProfile }}/>
            <View style={styles.containerPublish}>
              <Text style={styles.textPublish}>Publishs</Text>
              <Text style={styles.quantityPublishs}>
                {this.state.photos.length}
              </Text>
            </View>
        </View>
        <FlatList style={styles.container}
        data={this.state.photos}
        keyExtractor={item => item.id.toString() }
        renderItem={({ item }) =>
          <Post navigation={this.props.navigation} item={item}/>
        }
      />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  photoHeader: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  photoProfile: { marginLeft: 20, width: 100, height: 100, borderRadius: 70 },
  containerPublish: { marginLeft: 60 },
  textPublish: { fontSize: 26, fontWeight: "bold" },
  quantityPublishs: { marginLeft: 35, fontSize: 26, fontWeight: "bold" }
});

export default Feed;
