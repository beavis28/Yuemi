import React, { Component } from "react";
import RNFetchBlob from 'react-native-fetch-blob';
import SearchResultRow from "./SearchResultRow"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';

class App extends Component {

  constructor(){
    super();
    this.state = {
      videos: [{"title":"宇多田ヒカル - Passion ～single version～","id":"kWoJLdXJt0E","duration":"4:41."},{"title":"宇多田ヒカル「忘却 featuring KOHH」MUSIC VIDEO","id":"SmaeIlqqNCM","duration":"5:07."},{"title":"宇多田ヒカル - First Love","id":"_Q5-4yMi-xg","duration":"4:18."},{"title":"Utada - Come Back To Me","id":"CKPA8L5ZpqU","duration":"4:17."},{"title":"宇多田ヒカル - SAKURAドロップス","id":"mlwCZm2MQbQ","duration":"5:10."},{"title":"Lyris to Simple and Clean by Utada Hikaru","id":"v0xbO5LAnjc","duration":"5:01."},{"title":"Kingdom Hearts Ending LIVE Utada Hikaru   Simple and Clean","id":"B5rIpOmuD7U","duration":"6:00."},{"title":"宇多田ヒカル - 光","id":"kOSNIIx5u_U","duration":"4:23."},{"title":"宇多田ヒカル - Flavor Of Life -Ballad Version-","id":"3Ta0vEnki9E","duration":"5:38."},{"title":"Kingdom Hearts-Sanctuary (Utada Hikaru English Version)","id":"XyaXyGMgRAQ","duration":"4:19."},{"title":"Apple and Cinnamon - Utada Hikaru","id":"uR_rvhFgGg8","duration":"4:39."},{"title":"宇多田ヒカル - Goodbye Happiness","id":"cfpX8lkaSdk","duration":"5:55."},{"title":"Hikaru Utada - Topic","id":"UCfDndVwpf3tOF-vDmFQveog","duration":""},{"title":"Utada Hikaru - Sanctuary (Lyrics)","id":"ytVIHARbuK4","duration":"4:17."},{"title":"Utada Hikaru - This One (Crying Like A Child)","id":"w2fZQJIZIPk","duration":"4:32."},{"title":"Utada Hikaru - Beautiful World - Live Heyx3 - Evangelion 1.11 End","id":"Etvsj84vpJw","duration":"4:16."},{"title":"Hikaru Utada In The Flesh 2010 Concert","id":"NvBfUc592IE","duration":"1:46:42."},{"title":"Utada Hikaru - This One (Crying Like a Child) Lyrics","id":"SYulqHoGB0U","duration":"4:22."}],
      text: "utada hikaru",
      searching: false,
      downloading: false,
    }
    this.getVideos = this.getVideos.bind(this);
    this.getDownload = this.getDownload.bind(this);
  }

  getVideos(){
  	console.log("BUTTON PRESSED.");
    let self = this;
    fetch("http://104.236.165.165/api/search/" + self.state.text.split(" ").join("+"))
      .then(function(res){
        return res.json();
      })
      .then(function(json){
        self.setState({videos: json.videos});
      	console.log("updated videos");
      })
  }

  getDownload(id, title){
    let url = 'http://104.236.165.165/api/download/' + id;
    let musicDir = RNFetchBlob.fs.dirs.MusicDir + '/' + title + '.mp3';
    RNFetchBlob
    .config({
        addAndroidDownloads : {
            useDownloadManager : true,
            mime : 'audio/mp3',
            description : '',
            title,
            path: musicDir,
        }
    })
    .fetch('GET', url)
    .then((res) => {
      console.log(res.path());
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value = {this.state.text}
          onChangeText = {(text) => this.setState({text})}
          width = {300}
          onSubmitEditing={() => this.getVideos()}
          placeholder={'Search for something.'}
        />
        <View style={styles.mainButtons}>
          <Button
            onPress={() => this.getVideos()}
            title="SEARCH"
            color="#841584"
          />
          <Button
            onPress={(text) => this.setState({text: ''})}
            title="CLEAR"
            color="#ff8484"
          />
        </View>
        <ActivityIndicator
          size="large"
          animating={false}
        />
		<FlatList
		  data={this.state.videos}
		  renderItem={({item}) => <SearchResultRow data={item} styles={styles} getDownload={this.getDownload}/>}
		  ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
		/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listRow: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    fontSize: 18,
    paddingRight: 20,
    width: 275,
  },
  listSeparator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  listButton: {
    alignSelf: 'flex-end',
  },
  listContainer: {
    padding: 12,
  },
  mainButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  container: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;