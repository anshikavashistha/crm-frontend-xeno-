import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import CalenderGrid from '../CalenderGrid/CalenderGrid';
import SendsEditingTableau from '../SendsEditingTableau/SendsEditingTableau';
import AudienceTable from '../AudienceTable/AudienceTable';
import PopupCreateNewSend from '../PopupCreateNewSend/PopupCreateNewSend';
import PopupTestingSendPhone from '../PopupTestingSendPhone/PopupTestingSendPhone';
import PopupTestingSendEmail from '../PopupTestingSendEmail/PopupTestingSendEmail';
import PopupCreateNewAudience from '../PopupCreateNewAudience/PopupCreateNewAudience';
import PopupDeleteCardConfirm from '../PopupDeleteConfirm/PopupDeleteConfirm';

import { BASE_URL }  from '../../utils/Api';
import { ITEMS_PER_DAY }  from '../../utils/constants';
import * as Api from '../../utils/Api.js';

import moment from 'moment';
import 'moment/locale/ru';


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  window.moment = moment;
  moment.locale('en-US');
  moment.updateLocale('en-US', { week: { dow: 0 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(ITEMS_PER_DAY, 'days').format('X');

  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isCreateNewSendPopupOpen, setIsCreateNewSendPopupOpen] = useState(false);
  const [isPushTestingSendPopupOpen, setPushIsTestingSendPopupOpen] = useState(false);
  const [isEmailTestingSendPopupOpen, setEmailIsTestingSendPopupOpen] = useState(false);
  const [isCreateNewAudiencePopupOpen, setIsCreateNewAudiencePopupOpen] = useState(false);

  const defaultEvent = {
    name: '',
    date: moment().format('X'),
    time: moment().format('X'),
    audience: [],
    canal: [],
    finalValue: '',
    value: '',
  };
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [method, setMethod] = useState(null);

  const defaultAudience = {
    name: '',
    date: moment().format('X'),
    value: '',
    deep: '',
    categorys: [],
  };
  const [audiences, setAudiences] = useState([]);
  const [audience, setAudience] = useState(null);

  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/marketing-communication-crm/' || location.pathname === '/marketing-communication-crm') {
      navigate('/calender');
    };

    fetch(
      `${BASE_URL}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`
    )
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });

    fetch(`${BASE_URL}/audiences`)
      .then((res) => res.json())
      .then((res) => {
        setAudiences(res);
      });

    fetch(`${BASE_URL}/currentreport`)
      .then((res) => res.json());

  }, [today, location.pathname, navigate]);

  // ================= calender-dates ==================
  function showPreviousMonth() {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };

  function showCurrentMonth() {
    setToday(moment());
  };

  function showNextMonth() {
    setToday((next) => next.clone().add(1, 'month'));
  };

  // ================= open modal windows ==================
  function openAddNewSendsForm(methodName, eventForCreate, dayItem) {
    setIsCreateNewSendPopupOpen(true);
    setEvent(eventForCreate || { ...defaultEvent, date: dayItem.format('X') });
    setMethod(methodName);
  };

  function openEditSendsForm(methodName, eventForUpdate) { 
    navigate('/sends');
    setEvent(eventForUpdate);
    setMethod(methodName);
  };

  function openAddNewAudienceForm(audienceForCreate, dayItem) {
    setIsCreateNewAudiencePopupOpen(true);
    setAudience(
      audienceForCreate || { ...defaultAudience, date: dayItem.format('X') }
    );
  };

  function openPushTestForm(eventId, contactForCreate) {
    console.log('Test push', eventId);
    setPushIsTestingSendPopupOpen(true);
    setEvent(
      events.find((event) => {
        return eventId === event.id;
      })
    );
    setContact(contactForCreate);
  };

  function openEmailTestForm(eventId, contactForCreate) {
    console.log('Test email', eventId);
    setEmailIsTestingSendPopupOpen(true);
    setEvent(
      events.find((event) => {
        return eventId === event.id;
      })
    );
    setContact(contactForCreate);
  };

  // ================= change filds in modal windows ==================
  function changeEventHandler(text, field) {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  function onChangeTime(date) {
    setEvent((prevState) => ({
      ...prevState,
      date: moment(date).format('X'),
    }));
  };

  function onChangeAudience(selectedItems) {
    setEvent((prevState) => ({
      ...prevState,
      audience: selectedItems,
    }));
  };

  function onChangeCanals(selectedItems) {
    setEvent((prevState) => ({
      ...prevState,
      canal: selectedItems,
    }));
  };

  function changeAudienceHandler(text, field) {
    setAudience((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  function onChangeCategory(selectedItems) {
    setAudience((prevState) => ({
      ...prevState,
      categorys: selectedItems,
    }));
  };

  function changePhoneHandler(text, field) {
    setContact((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  // ================= calender backend part ==================
  function handleCreateSend() {
    return Api.createEvent(event).then((res) => {
      setEvents((prevState) => [...prevState, res]);
      closeAllPopups();
      setEvent(null);
    });
  };

  function handleUpdateSend() {
    return Api.updateEvent(event)
      .then((res) => {
        setEvents((prevState) =>
          prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
        );
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  };

  function handleRemoveEvent() {
    return Api.deleteEvent(event).then((res) => {
      setEvents((prevState) =>
        prevState.filter((eventEl) => eventEl.id !== event.id)
      );
      closeAllPopups();
      navigate('/');
    });
  };

  // =================  Audiences backend part ==================
  function createAudience() {
    return Api.createAudience(audience)
      .then((res) => {
        setAudiences((prevState) => [...prevState, res]);
        closeAllPopups();
        setAudience(null);
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  };

  function removeAudience() {
    return Api.deleteAudience(audience).then((res) => {
      setAudiences((prevState) =>
        prevState.filter((eventEl) => eventEl.id !== audience.id)
      );
      closeAllPopups();
    });
  };

  // =================  Campaign Testing ==================
  function sendTestMessage() {
    Api.sendTest(event, contact).then((res) => {
      console.log('test message', res);
    });
    closeAllPopups();
  };

  // =================  actions with modal windows ==================
  function deleteClick() {
    setIsDeleteConfirmPopupOpen(true);
  };

  function deleteAudienceClick(audienceId) {
    setIsDeleteConfirmPopupOpen(true);
    setAudience(
      audiences.find((audience) => {
        return audienceId === audience.id;
      })
    );
  };

  function closeAllPopups() {
    setIsDeleteConfirmPopupOpen(false);
    setIsCreateNewSendPopupOpen(false);
    setEmailIsTestingSendPopupOpen(false);
    setPushIsTestingSendPopupOpen(false);
    setIsCreateNewAudiencePopupOpen(false);
  };

  return (
    <div className='page'>
      <Header/>

      <Routes>
        <Route
          path='/calender'
          element={
            <CalenderGrid
              startDay={startDay}
              today={today}
              events={events}
              openAddNewSendsForm={openAddNewSendsForm}
              openEditSendsForm={openEditSendsForm}
              showPreviousMonth={showPreviousMonth}
              showCurrentMonth={showCurrentMonth}
              showNextMonth={showNextMonth}
            />
          }
        />
        <Route
          path='/sends'
          element={
            <SendsEditingTableau
              deletSends={deleteClick}
              pushTestClick={openPushTestForm}
              emailTestClick={openEmailTestForm}
              event={event}
              changeEventHandler={changeEventHandler}
              handleUpdateSend={handleUpdateSend}
              onChangeTime={onChangeTime}
              events={events}
              setEvents={setEvents}
            />
          }
        />
        <Route
          path='/audience'
          element={
            <AudienceTable
              openAddNewAudienceForm={openAddNewAudienceForm}
              deletAudience={deleteAudienceClick}
              audiences={audiences}
              today={today}
            />
          }
        />
      </Routes>

      <PopupDeleteCardConfirm
        isOpen={isDeleteConfirmPopupOpen}
        onClose={closeAllPopups}
        confirmEventDelete={handleRemoveEvent}
        confirmAudienceDelete={removeAudience}
        audience={audience}
        event={event}
      />
      <PopupCreateNewSend
        isOpen={isCreateNewSendPopupOpen}
        onClose={closeAllPopups}
        handleCreateSend={handleCreateSend}
        changeEventHandler={changeEventHandler}
        method={method}
        onChangeTime={onChangeTime}
        audiences={audiences}
        onChangeAudience={onChangeAudience}
        onChangeCanals={onChangeCanals}
      />
      <PopupTestingSendPhone
        isOpen={isPushTestingSendPopupOpen}
        onClose={closeAllPopups}
        sendTestMessage={sendTestMessage}
        changePhoneHandler={changePhoneHandler}
      />
      <PopupTestingSendEmail
        isOpen={isEmailTestingSendPopupOpen}
        onClose={closeAllPopups}
        sendTestMessage={sendTestMessage}
        changePhoneHandler={changePhoneHandler}
      />
      <PopupCreateNewAudience
        isOpen={isCreateNewAudiencePopupOpen}
        onClose={closeAllPopups}
        changeAudienceHandler={changeAudienceHandler}
        createAudience={createAudience}
        onChangeCategory={onChangeCategory}
      />
    </div>
  );
}

export default App;