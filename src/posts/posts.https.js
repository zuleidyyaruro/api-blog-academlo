const postsControllers = require('./posts.controllers');

// Obtener todos los posts
const getAllPostsService = async (req, res) => {
    const data = postsControllers.getAllPostsController();

    res.status(200).json({
        status: 'success',
        response: data,
    });
};

// Ver un post en específico
const getPostByIdService = async (req, res) => {
    const id = req.params.id;
    const data = postsControllers.getPostByIdController(id);

    if (data) {
        res.status(200).json({
            status: 'Success',
            response: data,
        });
    } else {
        res.status(404).json({
            message: `El post con el id ${id} no existe`,
        });
    }
};

const getPostsByUserService = (req, res) => {
    const id = req.user.id;
    const data = postsControllers.getPostsByUserController(id);
    return res.status(200).json(data);
};

const getPostUserByIdService = (req, res) => {
    const id = req.params.id;
    const user = req.user.id;
    const post = postsControllers.getPostUserByIdController(id, user);
    if (post) {
        return res.status(200).json(post);
    } else {
        return res
            .status(400)
            .json({ message: `El post con el id ${id} no existe` });
    }
};

// Crear un post
const createPostService = async (req, res) => {

    const data = req.body;

    if (!data) {
        return res.status(400).json({
            status: 'Error',
            message: 'Missing Data',
        });
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image ||
        !data.user_id
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields must be completed',
        });
    } else {
        const response = postsControllers.createPostController(data);

        return res.status(201).json({
            status: 'success',
            message: `User created succesfully with id: ${response.id}`,
            post: response,
        });
    }
};

const editPostService = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: 'Missing data' });
    } else if (!data.title || !data.content) {
        return res.status(400).json({
            message: 'All field must be completed',
            fields: {
                title: 'string',
                content: 'string',
                header_image: 'image/img (opcional)',
            },
        });
    } else {
        const response = postsControllers.editPostController(id, data);
        return res.status(201).json({ message: 'Post editado correctamente', response });
    }
};

const deletePostService = (req, res) => {
    const id = req.params.id;
    const data = postsControllers.deletePostController(id);
    if (data) {
        return res.status(204).json();
    } else {
        return res.status(400).json({ message: 'Id invalido' });
    }
};

module.exports = {
    getAllPostsService,
    getPostByIdService,
    getPostsByUserService,
    getPostUserByIdService,
    createPostService,
    editPostService,
    deletePostService,
};
