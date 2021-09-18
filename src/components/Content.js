
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';
import data from './placeholderdata.json';
export default function Content() {


    const [posts, setPosts] = useState([]);

    const statusBall = document.querySelector('.statusCircle');
    const statusInfo = document.querySelector('.statusColor');

    /* useEffect(() => {
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
        if (stats == true) {
            return <div class="statusChange"><div class="greenCircle"></div><div class="available">Available</div></div>
        } else {
            return <div class="statusChange"><div class="redCircle"></div><div class="inUse">In use</div></div>

        }
    }


    //example data
    return (
        <div class="contentarea">
            {data.map(post =>
                <div key={post.room} class="data">
                    <h2 class="room">{post.room}</h2>
                    <h2 class="floor">{post.floor}</h2>
                    <h2 class="temperature">{post.temperature}</h2>
                    <h2 class="co2">{post.co2}</h2>
                    <h2 class="status">{setStatus(post.status)}</h2>
                </div>)}
        </div>
    )
}

