import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import {TrailersContext} from './TrailersContext';


export class TrailersListItem extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <TrailersContext.Consumer>
            {
                ({getTrailerDetail}) => {
                    return (
                        <TouchableHighlight onPress={() => getTrailerDetail(this.props.trailer)}>
                            <View style={styles.item}>
                                <Text>{this.props.trailer.title}</Text>
                                <Image style={styles.images} source={{uri : this.props.trailer.poster}}></Image>
                            </View>
                        </TouchableHighlight> 
                    )
                }  
            }         
            </TrailersContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        flex : 1,
        backgroundColor: '#ffffff',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding : 16,
        margin : 4,
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
    images : {
      width: 40,
      height: 60
    }
  });

  