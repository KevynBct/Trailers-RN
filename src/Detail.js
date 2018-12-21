import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';


type Props = {};
export class Detail extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {
      trailer: this.props.navigation.getParam('trailer', 'NO-TRAILER')
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('trailer', 'NO-TRAILER').title
    };
  };

  getReleaseDate() {
    const date = this.state.trailer.releasedate.substring(0, 16);

    return (
      <>
        <Text style={styles.section}>Date de sortie</Text>
        <Text >{date}</Text>
      </>
    )
  }

  getGenre() {
    const genre = this.state.trailer.genre.map((genre) => <Text key={genre}>{genre}</Text>);

    return (
      <>
        <Text style={styles.section}>Genre(s)</Text>
        {genre}
      </>
    )
  }

  getActorsList() {
    const actors = this.state.trailer.actors.map((actor) => <Text key={actor}>{actor}</Text>);

    return (
      <>
        <Text style={styles.section}>Acteurs</Text>
        {actors}
      </>
    )
  }

  getMovieSite() {
    const movieSite = this.state.trailer.moviesite;

    if(movieSite != null){
      return (
        <>
          <Text style={styles.section}>Site du film</Text>
          <Text style={styles.link} onPress={()=>{Linking.openURL(movieSite)}}>{movieSite}</Text>
        </>
      )
    }
    return null

  }

  render() {
    console.log(this.state.trailer.poster);
    

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image  style={styles.image} source={{uri : this.state.trailer.poster}}></Image>
        </View>
        <View style={styles.content}>
          <Text style={styles.section}>Titre</Text>
            <Text>{this.state.trailer.title}</Text>
          {this.getGenre()}
          {this.getReleaseDate()}
          {this.getActorsList()}
          <Text style={styles.section}>Studio</Text>
            <Text>{this.state.trailer.studio}</Text>  
          {this.getMovieSite()}   
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    margin : 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer : {
    flex: 1,
    justifyContent : 'center',
    alignItems: 'center'
  },
  image : {
    width: 200,
    height: 300,
    marginTop: 15,
  },
  content:{
    flex: 1,
    flexDirection: 'column',
    margin:8,
    height : '100%',
  },
  section:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6
  },
  link:{
    color: '#1093af'
  }
});
