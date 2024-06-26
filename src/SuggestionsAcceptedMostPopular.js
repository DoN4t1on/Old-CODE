
import React, { useState, useEffect } from 'react';
import { Suggestion } from './Suggestion';
import { NavbarBottom } from './NavbarBottom';
import Spielplatz from './img/playground_Suggestion.jpg';
import Parkbank from './img/bench.jpg';
import Sportplatz from './img/sportsfield.jpg';
import Radweg from './img/bikeway.jpg';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
export const SuggestionsAcceptedMostPopular = () => {
  const [allPost, setallPost] = React.useState([]);

  //////const { allPost } = useSelector((state) => state.Posts);

  const [chunksPost, setchunksPost] = React.useState(0);
  const [moreRefetch, setmoreRefetch] = React.useState(true);

  const getAllPosts = useQuery(
    'allmostpopulardata',
    () => userServices.commonGetService(`/post/getAllPost/${chunksPost}`),
    {
      refetchOnWindowFocus: false,
      refetchInterval: moreRefetch == true ? 500 : false,
      refetchIntervalInBackground: true,
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        console.log(
          '----------------------------------------------------',
          res.data.data
        );

        if (res.data.data == '') {
          setmoreRefetch(false);
        } else {
          setchunksPost(chunksPost + 1);

          for (let i = 0; i < res.data.data.length; i++) {
            //// console.log(res.data.data[i].upVote);

            if (res.data.data[i].upVote == undefined) {
              res.data.data[i].upVote = 0;
            }
            if (res.data.data[i].downVote == undefined) {
              res.data.data[i].downVote = 0;
            }
            if (res.data.data[i].bidder == undefined) {
              res.data.data[i].bidder = 0;
            }
          }

          ////let newData = (oldArray) => [...oldArray, ...res.data.data];

          ///////// dispatch(Get_All_POSTS(res.data.data));

          setallPost((oldArray) => [...oldArray, ...res.data.data]);
        }
      },
    }
  );

  return (
    <div>
      <Header suggestions={true} suggestions_accepted={true} suggestions_favourites={true}/>
      <div className='campaigns no-data'>
        In diesem Gebiet befinden sich noch keine akzeptierten
        Crowdfundingkampagnen. Wir sind bereits im Dialog mit der lokalen
        Regierung. Gerne können Sie diese auch persönlich kontaktieren.
      </div>
      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div >
  );
};