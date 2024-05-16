/* eslint-disable prettier/prettier */
/* eslint-disable @adonisjs/prefer-lazy-controller-import */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AccountsController from '#controllers/accounts_controller'
import PagesController from '#controllers/pages_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import edge from 'edge.js'
import { migrate } from 'edge.js/plugins/migrate'
import { middleware } from './kernel.js'
import QuizzesController from '#controllers/quizzes_controller'

edge.use(migrate)


// router.on('/').render('pages/home')
// router.on('/login').render('pages/login')
// router.on('/register').render('pages/register')

router
  .group(() => {
    router.get('/home', [PagesController, 'home'])
    router.get('/', [PagesController, 'home'])
    router.post('/logout', [AccountsController, 'logout'])
    router.get('/register', [PagesController, 'register'])
    router.get('/about', [PagesController, 'about'])
    router.get('/history', [PagesController, 'history'])
    router.get('/blog', [PagesController, 'blog'])
    router.get('/admin', [PagesController, 'admin'])
    router.get('/profile', [PagesController, 'profile'])
    router.get('/guide', [PagesController, 'guide'])
    router.get('/quiz', [PagesController, 'quiz'])
  })
  .use(middleware.auth())

  router.post('/login', [AccountsController, 'login'])
  router.get('/login', [AccountsController, 'index'])

  router.post('/quizzes', [QuizzesController, 'submit'])

  router.resource('account', AccountsController)
  // user route
  router.resource('user', UsersController)

