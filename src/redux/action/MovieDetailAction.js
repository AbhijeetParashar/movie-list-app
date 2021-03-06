import { apiKey , dataPerPage } from "../../constant/constant";
import axios from "axios";

export const dispatchMovieDetailSearch = (response) => {
  return {
    type: "movieDetailedList",
    payload: response,
  };
};

export const onMovieDetailedSearch = (name, year, errorCallback) => {
  return function action(dispatch) {
    axios
      .get(`http://www.omdbapi.com/?s=${name}&y=${year}&apikey=${apiKey}`)
      .then((res) => {
        if (res.data.Response == "True") {
          let searchResult = res.data.Search;
          let myMovieList=[]
          if(searchResult.length <= dataPerPage){
            myMovieList.push(searchResult)
          }else{
            let totalPageCount = Math.floor(searchResult.length / dataPerPage)+((searchResult.length%dataPerPage)?1:0);
            for(let i=0;i<totalPageCount;i++){
              let startIndex=i*dataPerPage;
              let lastNumber=((i+1)*dataPerPage)<=searchResult.length?(i+1)*dataPerPage:searchResult.length
              myMovieList.push(searchResult.slice(startIndex,lastNumber))
            }
          }
          dispatch(dispatchMovieDetailSearch(myMovieList));
        } else {
            if(errorCallback)
            errorCallback(res.data.Error)
        }
      });
  };
};
