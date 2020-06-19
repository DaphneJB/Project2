import React from 'react';
import { StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import fetchMovieDetails from './DataDetailfetch';
import app from './App'

export default class App extends React.Component {
  state = {
    results: [],
  };

  render() {
    const { Title, Year, Poster, Rated, Runtime, Director, Actors, Plot } = this.state.results;
    return (
      <View style={{ flex: 1 }}>
        <Image style={styles.image} source={{uri: `${Poster}`}} />
        <Text style ={styles.title}>{Title} - {Year}</Text>
        <Text style={styles.rating}>{Rated}, {Runtime}</Text>
        <Text style={styles.actors}>{Actors}</Text>
        <Text style={styles.plot}>{Plot}</Text>
      </View>
    );
  }

  componentDidMount() {
    this.getMovieDetails();
    }

  getMovieDetails = async () => {
    const key = this.props.route.params.key;
    const result = await fetchMovieDetails(key);
    this.setState({results: result});
    }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    padding: 25,
    marginLeft: 40,
    },
  title: {
    textAlign: 'center',
    fontSize: 25,
  },
  plot: {
    fontStyle: 'italic',
    padding: 10,
  },
  rating: {
    padding: 10,
  },
  actors: {
    padding: 10,
    fontWeight: 'bold',
  },
});
