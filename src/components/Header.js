import { useEffect, useState } from 'react'
import { Breakpoint } from 'react-socks'
import { MdModelTraining } from 'react-icons/md'

import '../css/App.css'
import headerPic from '../assets/headerPic.webp'

const getCurrentTheme = () =>
  localStorage.getItem('room.theme') !== null
    ? localStorage.getItem('room.theme')
    : window.matchMedia('(prefers-color-sceheme: dark)').matches ? 'dark' : 'light'

const loadTheme = (theme) => {
  const root = document.querySelector(':root')
  root.setAttribute('color-scheme', `${theme}`)
}

const changeTheme = () => {
  let theme = getCurrentTheme() === 'dark' ? 'light' : 'dark'
  localStorage.setItem('room.theme', `${theme}`)
  loadTheme(theme)
}

window.addEventListener('DOMContentLoaded', () => loadTheme(getCurrentTheme()))

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
  const date = formatDate(current)
  const time = formatTime(current)

  useEffect(() => setInterval(() => setCurrent(new Date()), 30000), [])

  return (
    <div className='top'>
      <img className='header-background' src={headerPic} alt='' />
      <div className='top-row'>
        <h1 className='title'>Helsinki Office</h1>
        <div className='header-line'/>
        <Breakpoint medium up>
        <h2 className='mode' id="mode" onClick={() => changeTheme()}><MdModelTraining/></h2>
        </Breakpoint>
        <h1 className='time'>{time}</h1>
      </div>
      <div className='bottom-row'>
        <h2 className='subtitle'>Popup meeting rooms</h2>   
        <Breakpoint medium up>
        <h2 className="date">{date}</h2>  
        </Breakpoint>
      </div>
    </div>
  )
}
