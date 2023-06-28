import PostModel from "../models/Post.js"

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            succes: true
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to update articles'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId
        })
            .then(doc => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found'
                    })
                }

                res.json({
                    succes: true
                })
            }
            )
            .catch(err => {
                console.log(err)
                return res.status(500).json({
                    message: 'Failed to get article'
                })
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to delete articles'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: { viewsCount: 1 }
        }, {
            returnDocument: 'after'
        })
            .then(doc => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found'
                    })
                }

                res.json(doc)
            }
            )
            .catch(err => {
                console.log(err)
                return res.status(500).json({
                    message: 'Failed to get article'
                })
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get articles'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get article'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to create article'
        })
    }
}