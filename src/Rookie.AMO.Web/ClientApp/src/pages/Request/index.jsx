import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/callApi';
import * as action from '../../actions/ManagerRequest/ActionType';
import RequestList from '../../components/Request/RequestList';
import RequestItem from '../../components/Request/RequestItem';
import PopupComplete from '../../components/Popup/PopupComplete';
import PopupCancel from '../../components/Popup/PopupCancel';

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

  //Popup cancel request
  const [idRequestCancel, setIdRequestCancel] = useState('');
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancel, setIsCancel] = useState(0);

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

  useEffect(() => {
    if (isComplete == 0) {
      setTimeout(() => {
        setIsReLoad(1);
      }, 300);
    }
    if (isCancel == 0) {
      setTimeout(() => {
        setIsReLoad(1);
      }, 300);
    }
  }, [isComplete, isCancel]);

  CompleteRequest(
    idRequestComplete,
    isComplete,
    isReLoad,
    setIsReLoad,
    setIsComplete,
    'johnd',
    'f1ebfde9-c567-4ed5-b96f-20b9b51b8251'
  );

  CancelRequest(idRequestCancel, isCancel, isReLoad, setIsReLoad, setIsCancel);

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
              handleCancelOpen={handleCancelOpen}
            />
          );
        });
      }
    }
    return result;
  }

  //Popup complete request
  const handleCompleteOpen = (id, e) => {
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

  //Popup cancel request
  const handleCancelOpen = (id, e) => {
    console.log('cancel open');
    setIdRequestCancel(id);
    handleCancelShow(true);
  };

  const handleCancelShow = (isCancelOpen) => {
    setIsCancelOpen(isCancelOpen);
  };

  const handleCancel = (e) => {
    setIsCancel(1);
    handleCancelShow(false);
  };

  function cancelPopup(handleCancel, handleCancelShow) {
    if (1)
      return (
        <PopupCancel
          isModalOpen={isCancelOpen}
          handleCancel={handleCancel}
          handleModelShow={handleCancelShow}
        ></PopupCancel>
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
      {cancelPopup(handleCancel, handleCancelShow)}
    </div>
  );
}

function CompleteRequest(
  id,
  isComplete,
  isReLoad,
  setIsReLoad,
  setIsComplete,
  username,
  adminId
) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function completeRequest(id) {
      const res = await apiCaller(
        'Request/complete/' + id + '/' + username + '/' + adminId,
        'PUT',
        null
      );
      dispatch({ type: action.COMPLETE_REQUEST, payload: id });
    }
    if (id !== '' && isComplete === 1) {
      completeRequest(id);
      setIsReLoad(0);
      setIsComplete(0);
    }
  }, [id, isComplete, isReLoad, setIsReLoad, setIsComplete]);
}

function CancelRequest(id, isCancel, isReLoad, setIsReLoad, setIsCancel) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function cancelRequest(id) {
      const res = await apiCaller('Request/' + id, 'DELETE', null);
      dispatch({ type: action.CANCEL_REQUEST, payload: id });
    }
    if (id !== '' && isCancel === 1) {
      cancelRequest(id);
      setIsReLoad(0);
      setIsCancel(0);
    }
  }, [id, isCancel, isReLoad, setIsReLoad, setIsCancel]);
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
    if ('items' in page) setIsLoading(false);
  }, [page, setIsLoading]);
}

export default Request;
