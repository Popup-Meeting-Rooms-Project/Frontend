/*import { useState, useEffect } from 'react';
import axios from 'axios';*/

import data from './placeholderdata.json';
import '../css/App.css';

export default function Content() {

    /* const [posts, setPosts] = useState([]);

    const statusBall = document.querySelector('.statusCircle');
    const statusInfo = document.querySelector('.statusColor');

    useEffect(() => {
         axios.get('https://jsonplaceholder.typicode.com/users')
             .then(res => {
                 console.log(res)
                 setPosts(res.data)
             })
             .catch(err => {
                 console.log(err)
             })
 
     }, [])*/

    const setStatus = (stats) => {
        if (stats === true) {
            return <div id="statusChange"><div id="greenCircle"></div><div id="available">Available</div></div>
        } else {
            return <div id="statusChange"><div id="redCircle"></div><div id="inUse">In use</div></div>

        }
    }

    //example data
    return (
        <div id="contentarea">
            {data.map(post =>
                <div key={post.room} id="data">
                    <h2 id="room">{post.room}</h2>
                    <h2 id="floor">{post.floor}</h2>
                    <h2 id="temperature">{post.temperature}</h2>
                    <h2 id="co2">{post.co2}</h2>
                    <h2 id="status">{setStatus(post.status)}</h2>
                </div>)}
        </div>
    )
}

