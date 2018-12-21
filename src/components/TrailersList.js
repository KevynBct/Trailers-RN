import React, { Component } from 'react';
import {StyleSheet, View, NetInfo, Text, FlatList, AsyncStorage} from 'react-native';
import {TrailersListItem} from './TrailersListItem';

export default class TrailersList extends Component {
  constructor (props) {
    super(props);

    this.state = {
        allTrailers : []
    }

    this.loadAllTrailers = this.loadAllTrailers.bind(this);
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
  }
  componentDidMount(){
    NetInfo.addEventListener('connectionChange',this._handleConnectivityChange);
 
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ isConnected: isConnected })}
    );

    this.loadAllTrailers();
  }

  loadAllTrailers() {
    fetch("http://192.168.10.204:8080/trailers")
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          allTrailers: responseJson,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange',this._handleConnectivityChange);
  }

  static getDerivedStateFromProps (props, state) {   
    console.log('test');
    
    return {
      allTrailers : state.allTrailers,  
      isConnected : state.isConnected
    }
  }

  _handleConnectivityChange = isConnected => {
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ isConnected: isConnected })}
    );
  }

  _keyExtractor = (item, index) => item.title;

  _renderItem = ({item}) => (
    <TrailersListItem trailer={item} key={item.title}/>
  )

  render() {
    const connected = this.state.isConnected ? (
      <View style={styles.listContainer}>
        <FlatList
                data={this.state.allTrailers}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
        />
      </View>
    ) : (
      <View style={styles.disconnectContainer}>
          <Text style={styles.disconnect}>Vous n'êtes pas connecté à internet</Text>
      </View>
    )

    return (
        <>
            {connected}
        </>
    );
  }
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#e3f2fd', 
        flex: 1 
    },
    disconnectContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    disconnect: {
      fontSize: 20,
      textAlign: 'center',
      justifyContent: 'center',
      margin: 10,
    }
});