import { useEffect, useState } from 'react'

import '../css/App.css'

const formatDate = (date) => {
    let month;

    switch (date.getMonth()) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
        default:
    }

    return date.getDate() + " " + month + " " + date.getFullYear();
}

const formatTime = (date) =>
    (date.getMinutes() > 9) ? date.getHours() + ":" + date.getMinutes() : date.getHours() + ":0" + date.getMinutes();


export default function Header() {
    const [current, setCurrent] = useState(new Date())
    const date = formatDate(current);
    const time = formatTime(current);

    useEffect(() => {}, [])

    useEffect(() => {
        setInterval(() => setCurrent(new Date()), 30000);
      }, []);


    return (
        <div id="top">
            <div id="top-row">
                <h1 id="title">eficode - Helsinki Office</h1>
                <h1 id="time">{time}</h1>
            </div>
            <div id="bottom-row">
                <h2 id="subtitle">Popup meeting rooms</h2>
                <h2 id="date">{date}</h2>
            </div>
        </div>
    )
}