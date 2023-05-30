import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const responce = await PostService.getById(id);
        setPost(responce.data);
    })
    const [fetchComment, isComLoading, comError] = useFetching( async (id) => {
        const responce = await PostService.getCommentsByPostId(id);
        setComments(responce.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComment(params.id);
    }, [])
    return (
        <div>
            <h1>Вы открыли страницу поста c id = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h2 style={{marginTop: 30}}>Комментарии</h2>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map((comm, index) =>
                        <div key={index} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;