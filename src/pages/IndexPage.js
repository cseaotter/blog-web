import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        //instead of localhost:4000
        fetch("https://blog-web-api-ce9j.onrender.com/post").then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        })
    }, [])

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </>
    );
}