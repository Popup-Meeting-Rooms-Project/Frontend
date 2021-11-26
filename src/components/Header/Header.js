import { useEffect, useState } from 'react'
import { Breakpoint } from 'react-socks'
import { MdModelTraining } from 'react-icons/md'

import { formatDate, formatTime } from './dateUtils'
import '../../css/App.css'
import headerPic from '../../assets/headerPic.webp'

const getCurrentTheme = () =>
  localStorage.getItem('room.theme') !== null
    ? localStorage.getItem('room.theme')
    : window.matchMedia('(prefers-color-sceheme: dark)').matches ? 'dark' : 'light'

const loadTheme = (theme) => {
  const root = document.querySelector(':root')
  root.setAttribute('color-scheme', `${theme}`)
}

window.addEventListener('DOMContentLoaded', () => loadTheme(getCurrentTheme()))

export default function Header({ setMode }) {
  const [current, setCurrent] = useState(new Date())
  const date = formatDate(current)
  const time = formatTime(current)

  useEffect(() => setInterval(() => setCurrent(new Date()), 30000), [])

  const changeTheme = () => {
    let theme = getCurrentTheme() === 'dark' ? 'light' : 'dark'
    localStorage.setItem('room.theme', `${theme}`)
    loadTheme(theme)
    setMode(theme)
  }

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
