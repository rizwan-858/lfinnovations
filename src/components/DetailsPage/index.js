import {Component} from 'react'

import './index.css'

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

  onClickHome = () => {
    const {history} = this.props
    history.replace('/pokemon')
  }

  render() {
    const {url, name, type} = this.state
    return (
      <div className="details-container">
        <div className="details-card">
          <img className="image" src={url} alt="pokemon" />
          <div>
            <h1 className="name">{name}</h1>
            <p className="type">{type}</p>
          </div>
        </div>
        <button type="button" className="home-btn" onClick={this.onClickHome}>
          Home
        </button>
      </div>
    )
  }
}

export default DetailsPage
