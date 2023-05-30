import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import PostService from "../API/PostService";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/loader";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: "", query: ""});
    const [modal, setModal] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount, limit));
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    }

    return (
        <div className="App">
            <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
            <MyButton style={{marginTop: "30px"}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{marginBlock: "15px"}} />

            <PostFilter filter={filter} setFilter={setFilter}/>

            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
                : <PostList
                    posts={sortedAndSearchedPosts}
                    remove={removePost}
                    title="Список постов 1"
                />
            }
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    );
}

export default Posts;