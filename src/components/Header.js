import { useEffect, useState } from 'react'
import '../css/App.css'
import headerPic from '../assets/headerPic.webp'
import { Breakpoint } from 'react-socks';
import { DarkMode } from '@mui/icons-material';


const lightMode = () => {
  console.log("Light mode enabled")
}

const darkMode = () => {
  console.log("Dark mode enabled")
}

const formatDate = (date) => {
  let month

  switch (date.getMonth()) {
    case 0:
      month = 'January'
      break
    case 1:
      month = 'February'
      break
    case 2:
      month = 'March'
      break
    case 3:
      month = 'April'
      break
    case 4:
      month = 'May'
      break
    case 5:
      month = 'June'
      break
    case 6:
      month = 'July'
      break
    case 7:
      month = 'August'
      break
    case 8:
      month = 'September'
      break
    case 9:
      month = 'October'
      break
    case 10:
      month = 'November'
      break
    case 11:
      month = 'December'
      break
    default:
  }

  return date.getDate() + ' ' + month + ' ' + date.getFullYear()
}



const formatTime = (date) =>
  (date.getMinutes() > 9) ? date.getHours() + ':' + date.getMinutes() : date.getHours() + ':0' + date.getMinutes()

export default function Header() {
  const [current, setCurrent] = useState(new Date())
  const date = formatDate(current);
  const time = formatTime(current);

  useEffect(() => {}, [])

  useEffect(() => {
    setInterval(() => setCurrent(new Date()), 30000);
  }, [])

  return (
    <div class='top'>
      <img class='header-background' src={headerPic} alt='' />
      <div class='top-row'>
        <h1 class='title'>Helsinki Office</h1>
        <div class='header-line'/>
        <Breakpoint medium up>
        <h2 class='mode' ><span class='light' onClick={() => lightMode()}>Light</span> / <span class='dark' onClick={() => darkMode()}>Dark</span></h2>
        </Breakpoint>
        <h1 class='time'>{time}</h1>
      </div>
      <div class='bottom-row'>
        <h2 class='subtitle'>Popup meeting rooms</h2>   
        <Breakpoint medium up>
        <h2 class="date">{date}</h2>  
        </Breakpoint>
      </div>
    </div>
  )
}
