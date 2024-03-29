import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(){
    super();
    this.state = {
     articles: [],
      loading : false,
      page:1,

    } 
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d5f8d8fa7cf419fbc54d80066a23e2b&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d5f8d8fa7cf419fbc54d80066a23e2b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles
    
  })

}

  handleNextClick = async ()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

    }
    else{

          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d5f8d8fa7cf419fbc54d80066a23e2b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData);
          this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles
        })
}
}

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin: '15px 0px'}}><u>NewsHub - Top Headlines</u></h2>
      <div className="row">
      {this.state.articles.map((element)=>{
      return <div className="col md-4"  key={element.url}>
          <NewsItem title={element.title?element.title.slice(0, 22):""} description={element.description?element.description.slice(0, 45):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
      })}
        
      
       </div>
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
       <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
       </div>
      </div>
    )
  }
}

export default News
