import express from 'express'
import { isAdmin } from '../Middlewares/isAdmin.js'
import { changeActivity, create, getAll, getPostComment, remove } from '../Controllers/commentCn.js'
import { isLogin } from '../Middlewares/isLogin.js'

const commentRouter=express.Router()
commentRouter.route('/').get(isAdmin,getAll).post(isLogin,create)
commentRouter.route('/:id').get(getPostComment).patch(isAdmin,changeActivity).delete(isAdmin,remove)

export default commentRouter