import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import TrailersList from "./components/TrailersList";
import {Detail} from "./Detail.js"
import {TrailersContext} from './components/TrailersContext';


type Props = {};
class App extends Component<Props> {
  constructor(props){
    super(props);

    this.getTrailerDetail = (trailer) => {
      this.props.navigation.navigate('Details',{
        trailer: trailer
      })
    }

    this.state = {
        getTrailerDetail : this.getTrailerDetail,
    }
  }

  static navigationOptions = {
    title: 'Liste'
  }

  render() {

    return (
      <View style={styles.container}>
        <TrailersContext.Provider value={this.state}>
          <TrailersList />
        </TrailersContext.Provider>
      </View>
    );
  }
}


const TrailersApp = createStackNavigator({
    Home: {screen: App},
    Details: {screen : Detail}
  });

export default createAppContainer(TrailersApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
