import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/callApi';
import * as action from '../../actions/ManagerRequest/ActionType';
import RequestList from '../../components/Request/RequestList';
import RequestItem from '../../components/Request/RequestItem';
import PopupComplete from '../../components/Popup/PopupComplete';

const stateList = [
  { name: 'Completed', value: 'Completed' },
  { name: 'Waiting for returing', value: 'WaitingReturn' },
];

function Request() {
  //Table requests
  const [stateFilter, setStateFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [optionSort, setOptionSort] = useState({
    propertyName: '',
    desc: 'false',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isReLoad, setIsReLoad] = useState(1);

  //Popup complete request
  const [idRequestComplete, setIdRequestComplete] = useState('');
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(0);

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

  CompleteRequest(idRequestComplete, isComplete, setIsReLoad, setIsComplete);

  const resetPage = () => {
    setPageNumber(1);
    setIsReLoad(1);
  };

  const handleSort = (e, option) => {
    setOptionSort({
      propertyName: option.propertyName,
      desc: option.desc.toString(),
    });
    setIsReLoad(1);
  };

  const handleSearch = (text, e) => {
    resetPage();
    setSearchText(text);
    setIsReLoad(1);
  };

  const handleFilterState = (option, e) => {
    if (option != null)
      setStateFilter(option.map((a, index) => a.value).join(','));
    else setStateFilter('');
    resetPage();
    setIsReLoad(1);
  };

  const handleFilterDate = (date, e) => {
    resetPage();
    if (date === dateFilter) {
      setDateFilter('');
    } else setDateFilter(date);
    setIsReLoad(1);
  };

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
              handleCompleteOpen={handleCompleteOpen}
            />
          );
        });
      }
    }
    return result;
  }

  //Popup complete request
  const handleCompleteOpen = (id, e) => {
    console.log('complete open');
    setIdRequestComplete(id);
    handleCompleteShow(true);
  };

  const handleCompleteShow = (isCompleteOpen) => {
    setIsCompleteOpen(isCompleteOpen);
  };

  const handleComplete = (e) => {
    setIsComplete(1);
    handleCompleteShow(false);
  };

  function completePopup(handleComplete, handleCompleteShow) {
    if (1)
      return (
        <PopupComplete
          isModalOpen={isCompleteOpen}
          handleComplete={handleComplete}
          handleModelShow={handleCompleteShow}
        ></PopupComplete>
      );
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
        handleSort={handleSort}
        handleFilterState={handleFilterState}
        handleFilterDate={handleFilterDate}
        handleSearch={handleSearch}
      >
        {showRequests(requests)}
      </RequestList>
      {completePopup(handleComplete, handleCompleteShow)}
    </div>
  );
}

function CompleteRequest(id, isComplete, setIsReLoad, setIsComplete) {
  // const dispatch = useDispatch()

  useEffect(() => {
    async function completeRequest(id) {
      // const res = await apiCaller('Request/'+id, 'PUT', null);
      // dispatch({ type: action.COMPLETE_REQUEST, payload: id });
      setIsReLoad(0);
      setIsComplete(0);

      console.log('Fetch' + id);
    }
    if (id !== '' && isComplete === 1) {
      completeRequest(id);
    }
  }, [id, isComplete, setIsReLoad, setIsComplete]);
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
        '&ReturnedDate=' +
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
  }, [
    isReLoad,
    stateFilter,
    dateFilter,
    searchText,
    pageNumber,
    optionSort.propertyName,
    optionSort.desc,
    setIsReLoad,
  ]);

  const requestPage = useSelector((state) => state.RequestReducer);

  return requestPage;
}

function CheckLoading(setIsLoading, page) {
  useEffect(() => {
    console.log(page);
    if ('items' in page) setIsLoading(false);
  }, [page, setIsLoading]);
}

export default Request;
