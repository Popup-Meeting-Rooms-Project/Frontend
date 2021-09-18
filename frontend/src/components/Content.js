
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';
export default function Content() {

    const [tests, setTests] = useState([]);
    
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    console.log(res)
                    setTests(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        
    }, [])

    //example data
    return (
        <div class="contentarea">
            {tests.map(test =>
                <div key={test.id} class="data">
                    <h2>name: {test.name}</h2>
                    <h2>username: {test.username}</h2>
                    <h2>email: {test.email}</h2>
                </div>)}
        </div>
    )
}

/*
<div class="contentarea">
            {posts.map(post =>
                <div key={post.roomNo} class="data">
                    <h2>{post.roomNo}</h2>
                    <h2>{post.floor}</h2>
                    <h2>{post.temp}</h2>
                    <h2>{post.co2}</h2>
                </div>)}
        </div>





<div class="contentarea">
            {posts.map(post =>
                <div key={post.room} class="data">
                    <h2>{post.room}</h2>
                    <h2>{post.floor}</h2>
                    <h2>{post.temperature}</h2>
                    <h2>{post.co2}</h2>
                    <h2><span class="status">{post.status}</span></h2>
                </div>)}
        </div>

            


    )*/ 