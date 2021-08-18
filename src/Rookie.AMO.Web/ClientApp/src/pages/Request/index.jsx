import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/callApi';
import * as action from '../../actions/ManagerRequest/ActionType';
import RequestList from '../../components/Request/RequestList';
import RequestItem from '../../components/Request/RequestItem';

const stateList = [
  { name: 'Accepted', value: 'Accepted' },
  { name: 'Waiting', value: 'Waiting for accepted' },
];

function Request() {
  //Table requests
  const [stateFilter, setStateFilter] = useState('');
  const [dateFilter, setdateFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [optionSort, setOptionSort] = useState({
    propertyName: '',
    desc: 'false',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isReLoad, setIsReLoad] = useState(1);

  let requestPage = FetchPageRequest(
    stateFilter,
    dateFilter,
    searchText,
    pageNumber,
    optionSort,
    isReLoad,
    setIsReLoad
  );
  CheckLoading(setIsLoading, requestPage);

  let requests = requestPage.items;

  function showRequests(requests) {
    let result = null;
    if (requests != null) {
      if (requests.length > 0) {
        result = requests.map((request, index) => {
          return (
            <RequestItem
              key={index}
              request={request}
              index={index}
              stateList={stateList}
            />
          );
        });
      }
    }
    return result;
  }

  return (
    <div>
      <RequestList
        isLoading={isLoading}
        stateList={stateList}
        totalPages={requestPage.totalPages}
        totalItems={requestPage.totalItems}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        setIsReLoad={setIsReLoad}
      >
        {showRequests(requests)}
      </RequestList>
    </div>
  );
}

function FetchPageRequest(
  stateFilter,
  dateFilter,
  searchText,
  pageNumber,
  optionSort = { propertyName: '', desc: 'false' },
  isReLoad,
  setIsReLoad
) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      let enpoint =
        'Request/find?State=' +
        stateFilter +
        '&Date=' +
        dateFilter +
        '&KeySearch=' +
        searchText +
        '&OrderProperty=' +
        optionSort.propertyName +
        '&Desc=' +
        optionSort.desc +
        '&Page=' +
        pageNumber +
        '&Limit=2';

      console.log(enpoint);
      const res = await apiCaller(enpoint, 'GET', null);
      dispatch({ type: action.FETCH_REQUESTS, payload: res.data });
    }
    if (isReLoad) {
      fetch();
      setIsReLoad(0);
    }
  }, [isReLoad]);

  const requestPage = useSelector((state) => state.RequestReducer);

  return requestPage;
}

function CheckLoading(setIsLoading, page) {
  useEffect(() => {
    console.log(page);
    if ('items' in page) setIsLoading(false);
  }, [page]);
}

export default Request;
