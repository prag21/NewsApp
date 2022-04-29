import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles,setarticles]=useState([])
  const [loading,setloading]=useState(true)
  const [page,setpage]=useState(1)
  const [totalarticles,settotalarticles]=useState(0)
  
    News.defaultProps={
        country:"in",
        pageSize:8,
        category:"general"
    }
 
    News.propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    const capitalized=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    
    const updatenews=async()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      let data=await fetch(url);
      props.setProgress(30);
     setloading(true);
      let parsedData=await data.json();
      props.setProgress(50);
      setarticles(parsedData.articles);
      settotalarticles(parsedData.totalResults);
      setloading(false);
    
     props.setProgress(100);
    }
    const fetchMoreData = async() => {
      setpage(page+1);
     
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setpage(page+1);
      let data=await fetch(url);
     
      let parsedData=await data.json();
      setarticles(articles.concat(parsedData.articles));
      settotalarticles(parsedData.totalResults);
   
     
    };
    useEffect(()=>{
      document.title=`${capitalized(props.category)} - News App`;
      updatenews();
    },[])

 
    /*handlenextclick=async()=>{
  console.log("next");
  
      this.setState({
        page:this.state.page+1,
      })
      this.updatenews();
    
    }
    handleprevclick=async()=>{
      
       this.setState({
         page:this.state.page-1,
       })
       this.updatenews();
    }*/

     
    return (
      <>
      
          <h2 className="text-center" style={{"marginTop":"90px"}}>{`News App - Top Headlines on ${capitalized(props.category)} category`}</h2>
          {loading && <Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalarticles}
          loader={<Spinner/>}
        >
          <div className='container'>
          <div className='row'>
            
          {articles.map((element)=>{
              
                return   <div className='col-md-4' key={element.url}>
                <Newsitem  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage?element.urlToImage:"https://th.bing.com/th/id/OIP.e58I71dQU3DvfMnhktKzLgHaEL?w=273&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt?element.publishedAt:" "} source={element.source['name']}/>
                </div>  
          })}
            
     
      </div>
      </div>
      </InfiniteScroll>
     {/*<div className='container d-flex justify-content-between'>
      <button disabled={this.state.page<=1}type="button" className="btn btn-dark " onClick={this.handleprevclick}>&larr; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/props.pageSize)}type="button" className="btn btn-dark " onClick={this.handlenextclick}>Next  &rarr;</button>
        </div>*/}
      
      </>
    )
  }
  export default News


