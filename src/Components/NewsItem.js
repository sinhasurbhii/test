import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description , imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card"style={{width: "16rem"}}>
        <img src={!imageUrl?"https://images.hindustantimes.com/tech/img/2023/01/16/1600x900/Untitled_desi_1673851041158_1673851053360_1673851053360.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More..</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
