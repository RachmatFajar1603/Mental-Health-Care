/* eslint-disable prettier/prettier */
import Role from '#models/role'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'


export default class PagesController {
  async home({ view }: HttpContext) {
    // users from oldest to newest
    const users = await User.query().orderBy('id', 'asc').preload('role')
    return view.render('pages/home', { users: users })
  }

  async admin({ view }: HttpContext) {
    // users from oldest to newest
    const users = await User.query().orderBy('id', 'asc').preload('role')
    return view.render('admin/home', { users: users })
  }

  async about({ view }: HttpContext) {
    return view.render('pages/about')
  }

  async history({ view }: HttpContext) {
    return view.render('pages/history')
  }

  async blog({ view }: HttpContext) {
    return view.render('pages/blog')
  }

  async profile({ view }: HttpContext) {
    return view.render('pages/profile')
  }

  async guide({ view }: HttpContext) {
    return view.render('question/guide')
  }

  async quiz({ view }: HttpContext) {
    return view.render('question/quiz')
  }

  async register({ view }: HttpContext) {
    const roles = await Role.query().where('name', '!=', 'Admin')
    // return console.log(roles)
    return view.render('pages/register', { roles: roles })
  }

  
}
