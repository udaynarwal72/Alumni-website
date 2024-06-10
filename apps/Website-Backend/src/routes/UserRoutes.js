const express = require('express')

const UserRouter = express.Router();

UserRouter.post('/singup',)
UserRouter.post('/login',)
UserRouter.put('/profile/:userId',)
UserRouter.get('/profile/:userID',)
UserRouter.get('/profile/:userID/likes',)
UserRouter.get('/profile/:userID/comments',)
UserRouter.get('/profile/:userID/bookmarks',)
UserRouter.put('/profile/:userID/settings/change-password',)
UserRouter.put('/profile/:userID/settings/change-email',)
UserRouter.delete('/profile/:userID/delete',)
UserRouter.get('/profile/:userID/notifications',)
UserRouter.get('/profile/:userID/notifications/:notificationID',)
UserRouter.delete('/profile/:userID/notifications/:notificationID',)

module.exports = UserRouter;