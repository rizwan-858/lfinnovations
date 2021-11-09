import {Component} from 'react'

import {Link} from 'react-router-dom'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import './index.css'

class Home extends Component {
  state = {
    dataList: [],
    limit: 10,
    activePage: 1,
  }

  componentDidMount() {
    this.getPokemonData()
  }

  getPokemonData = async () => {
    const {activePage, limit} = this.state
    const offset = (activePage - 1) * limit
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

  onForward = () => {
    const {activePage} = this.state
    if (activePage < 10) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getPokemonData,
      )
    }
  }

  onBackward = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getPokemonData,
      )
    }
  }

  render() {
    const {activePage} = this.state
    return (
      <div className="home-container">
        <h1 className="heading">Pokemons</h1>
        {this.renderPokemonsList()}
        <div className="pagination-container">
          <div className="btn-container">
            <button
              className="btn"
              testid="pagination-left-button"
              onClick={this.onBackward}
              type="button"
            >
              <IoIosArrowBack />
            </button>{' '}
          </div>
          <div className="pages">
            <p testid="active-page-number">{activePage}</p>{' '}
            <p className="text"> of </p>
            <p>10</p>
          </div>
          <div className="btn-container">
            <button
              className="btn"
              testid="pagination-right-button"
              onClick={this.onForward}
              type="button"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
