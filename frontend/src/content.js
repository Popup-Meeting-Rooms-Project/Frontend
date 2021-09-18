import React, { useState, useEffect } from 'react'
/*import axios from 'axios';*/
import './App.css';

export default function content() {

    /*const [posts, setPosts] = useState([]);*/
    const posts = new Map ([['room', 'a23'],['floor', '1'],['temperature', '20'],['CO2', '20'],['status', true]})


    useEffect(() => {
        

    }, [])

    


    return (

        <div class="contentarea">
            {posts.map(post =>

                <div key={post.room} class="data">
                    <h2>{post.room}</h2>
                    <h2>{post.floor}</h2>
                    <h2>{post.temperature}</h2>
                    <h2>{post.CO2}</h2>
                    <h2>{post.status}</h2>
                </div>)}
        </div>
    )

}
