import {Component} from 'react'

class DetailsPage extends Component {
  state = {url: '', name: '', type: ''}

  componentDidMount() {
    this.getPokemonDetails()
  }

  getPokemonDetails = async () => {
    const {match} = this.props

    const {params} = match
    const {name} = params
    console.log(name)
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      url: data.sprites.front_default,
      name: data.species.name,
      type: data.types[0].type.name,
    })
  }

  render() {
    const {url, name, type} = this.state
    return (
      <div>
        <img src={url} alt="pokemon" />
        <p>{name}</p>
        <p>{type}</p>
      </div>
    )
  }
}

export default DetailsPage
