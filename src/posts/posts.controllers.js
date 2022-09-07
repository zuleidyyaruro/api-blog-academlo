const uuid = require('uuid');

const posts = [
    {
        id: 'daskjfi13413uio2345jkl',
        title: 'prueba',
        content: 'contenido de prueba',
        header_image: 'www.google.com',
        user_id: '1',
        published: true,
    },
];

// obtener todos los posts
const getAllPostsController = () => {
    return posts;
};

// Ver un post en específico
const getPostByIdController = (id) => {
    const post = posts.filter((item) => item.id === id);
    return post.length ? post[0] : null;
};

// Ver únicamente los posts del usuario logged
const getPostsByUserController = (id) => {
    const data = posts.filter((item) => item.user_id === id);
    return data;
};

// Ver un post en especifico pero solo los del usuario loggeado
const getPostUserByIdController = (id, user) => {
    const data = posts.filter((item) => item.user_id === user);
    const postByUser = data.filter((post) => post.id === id);
    return postByUser.length ? postByUser[0] : null;
};

// crear un post
const createPostController = (post) => {
    let newPost = {
        id: uuid.v4(),
        title: post.title,
        content: post.content,
        header_image: post.header_image,
        user_id: post.user_id,
        published: true,
    };

    posts.push(newPost);
    return newPost;
};

// editar un post
const editPostController = (id, data) => {
    const index = posts.findIndex((item) => item.id === id);

    if (index !== 1) {
        posts[index] = {
            id,
            title: data.title,
            content: data.content,
            header_image: data.header_image ? data.header_image : ' ',
            user_id: posts[index].user_id,
            published: true,
        };
        return posts[index];
    } else {
        return createPostController(data);
    }
};

// eliminar un post
const deletePostController = (id) => {
    const index = posts.findIndex(post => post.id === id)
    if (index !== -1) {
        posts.splice(index, 1)
        return true
    } else {
        return false
    }
};

module.exports = {
    getAllPostsController,
    getPostByIdController,
    getPostsByUserController,
    createPostController,
    getPostUserByIdController,
    editPostController,
    deletePostController,
};
