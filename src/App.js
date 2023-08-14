import './App.css';
import { Fragment, useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';

function App() {

  const [cards, setCards] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [user, setUser] = useState(null);

  // assuming fetch request will ALWAYS be for user 17
  const fetchData = () => {
    Promise.all([
      fetch("https://6488eff70e2469c038fe8705.mockapi.io/api/v1/cards").then(resp => resp.json()),
      fetch("https://6488eff70e2469c038fe8705.mockapi.io/api/v1/users/17").then(resp => resp.json())
    ])
    .then(resp => {
      setCards(resp[0]);
      setUser(resp[1]);
    })
    .catch(err => {
      console.log(err);
    })
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  }

  return (
    <div className="App">
      {user && <SideMenu showSideMenu={showSideMenu} avatar={user.avatar} name={user.name} onClose={toggleSideMenu}/>}
      <div className='menu-bar'>
        <h1>MySpend</h1>
        <input className="menu-btn" type="button" value={"≡"} onClick={toggleSideMenu}/>
      </div>
      {/* insert cards here */}
      <table>
      {cards && cards.map(card => {
        return ( <Card issuedTo={card.issuedTo} cardNum={card.cardNumber}/>)
      })}
      </table>
    </div>
  );
}

function Card({ issuedTo, cardNum}) {

  const slicedCardNum = cardNum.slice(0, 16);

  const date = new Intl.DateTimeFormat(
    "default", {
      year: "2-digit",
      month: "2-digit"
    }
  ).format(new Date(issuedTo));
  

  return (
    <tr className="card-row">
      <td className="card-num">{slicedCardNum}</td>
      <td className="date">{date}</td>
    </tr>
  );
};

function SideMenu({showSideMenu, avatar, name, onClose}) {
  
  return (
    <Drawer
      anchor={"right"}
      open={showSideMenu}
      onClose={onClose}
    >
      <input className="exit-btn" type="button" value={"X"} onClick={onClose} />
      <img src={avatar} width="100" height="100" />
      <p className="avatar-name">{name}</p>
      <p className="logout-link">Logout</p>
    </Drawer>
  )
};

export default App;
