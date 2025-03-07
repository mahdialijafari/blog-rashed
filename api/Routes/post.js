import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/postCn.js'
import { isAdmin } from '../Middlewares/isAdmin.js'

const postRouter=express.Router()
postRouter.route('/').get(getAll).post(isAdmin,create)
postRouter.route('/:id').get(getOne).patch(isAdmin,update).delete(isAdmin,remove)



export default postRouter