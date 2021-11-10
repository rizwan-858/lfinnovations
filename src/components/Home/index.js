import {Component} from 'react'

import {Link} from 'react-router-dom'

import Pagination from '@mui/material/Pagination'

import './index.css'

class Home extends Component {
  state = {
    dataList: [],
    limit: 10,
    page: 1,
  }

  componentDidMount() {
    this.getPokemonData()
  }

  getPokemonData = async () => {
    const {page, limit} = this.state
    console.log(page)
    const offset = (page - 1) * limit
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const formattedData = data.results.map(each => ({
      name: each.name,
    }))

    console.log(formattedData)
    this.setState({dataList: formattedData})
  }

  renderPokemonsList = () => {
    const {dataList} = this.state
    return (
      <ul className="list-container">
        {dataList.map(each => (
          <li className="list-item" testid="data-item" key={each.name}>
            <Link style={{textDecoration: 'none'}} to={`/pokemon/${each.name}`}>
              <div className="listItem-container">
                <h1>{each.name}</h1>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {page} = this.state
    console.log(page)
    return (
      <div className="home-container">
        <h1 className="heading">Pokemons</h1>
        {this.renderPokemonsList()}
        <Pagination
          count={10}
          color="primary"
          page={page}
          onChange={(event, value) => {
            this.setState({page: value})
            this.getPokemonData()
          }}
        />
      </div>
    )
  }
}

export default Home
