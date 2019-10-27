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

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
    this.postService = new PostService();
    this.loadFeed = this.loadFeed.bind(this);
  }

  async loadFeed() {
    await this.postService.findFeed()
      .then(datas => this.setState({ photos: [...datas] }))
      .catch(console.log);
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('willFocus', async () => {
      await this.loadFeed();

    });

    await this.loadFeed();
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.photos}
        keyExtractor={item => item.id.toString() }
        renderItem={({ item }) =>
          <Post navigation={this.props.navigation} item={item}/>
        }
      />
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
  photoProfile: { 
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10 
  }
});

export default Feed;
