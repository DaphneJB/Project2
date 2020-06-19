import React from 'react';
import { StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
import fetchMovies from './Datafetch';
import app from './App'

export default class App extends React.Component {
  state = {
    query: '',
    results: [],
    page: 1,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput style={styles.searchField}
          placeholder="Search for movies..." 
          onSubmitEditing={() => this.handleQueryChange()}
          returnKeyType='search'
          onChangeText={(text) => this.setState({query: text})}/>
        <FlatList data={this.state.results} renderItem={this.renderItem} onEndReached={this.getMoreMovies} />
      </View>
    );
  }
  
  getMovies = async () => {
    const { page} = this.state
    const results = await fetchMovies(this.state.query,page); 
    this.setState({results: [...this.state.results, ...results]});
  }

  getMoreMovies = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.getMovies()
    });
  };

  handleQueryChange() {
    this.setState({
      results: [],
    })
    this.getMovies();
    }

  renderItem = ({item}) => {
   return (
    <TouchableOpacity onPress={() =>  this.props.navigation.navigate("Details",item)}>
      <View>
        <Text style={styles.movie}>{item.title}<Text style={styles.year}> - {item.year}</Text></Text>
      </View>
    </TouchableOpacity>
  )
  }
}

const styles = StyleSheet.create({
  searchField: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 0.5,
    margin: 10,
    fontSize: 15,
  },
  movie: {
    padding:20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  year: {
    fontWeight: 'flat',
    fontSize: 13,
  }
});
