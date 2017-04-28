import RNFetchBlob from 'react-native-fetch-blob';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SectionList,
  ListItem,
  ListView,
  Linking,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

export default class Yuemi extends Component {

  constructor(){
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      videos: this.ds.cloneWithRows([]),
      text: "",
      searching: false,
      downloading: false,
    }
    this.getVideos = this.getVideos.bind(this);
    this.getDownload = this.getDownload.bind(this);
  }

  getVideos(){
    let self = this;
    fetch("http://104.236.165.165/api/search/" + self.state.text.split(" ").join("+"))
      .then(function(res){
        return res.json();
      })
      .then(function(json){
        self.setState({videos: self.ds.cloneWithRows(json.videos)});
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

  getRow(data){
    return (
      <View style={styles.listViewRow}>
        <Text style={styles.listViewText}>
          {data.title + '\n' + data.duration}
        </Text>
        <Button
          style={styles.listViewButton}
          onPress={() => this.getDownload(data.id, data.title)}
          title="DOWNLOAD"
          color="#1990B8"
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          value = {this.state.text}
          onChangeText = {(text) => this.setState({text})}
          width = {300}
          onSubmitEditing={() => this.getVideos()}
          placeholder={'Search for something.'}
          //autoFocus={true}
          //clearButtonMode="always"
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
        <ListView
          style={styles.listViewContainer}
          dataSource={this.state.videos}
          renderRow={(video) => this.getRow(video)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.listViewSeparator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listViewRow: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listViewText: {
    fontSize: 18,
    paddingRight: 20,
    width: 275,
  },
  listViewSeparator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  listViewButton: {
    alignSelf: 'flex-end',
  },
  listViewContainer: {
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
  textBox: {
    marginTop: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});