/* eslint-disable prettier/prettier */
import Role from '#models/role'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('pages/login')
  }

  async login({ request, response, session, auth }: HttpContext) {
    const data = request.only(['email', 'password'])

    // Email dan password yang dibuat secara manual
    const adminEmail = "admin@example.com";
    const adminPassword = "password123";

    try {
      // Cek jika email dan password dari request sama dengan email dan password admin
      if (data.email === adminEmail && data.password === adminPassword) {
        session.flash({ status: 'Login successful' })
        return response.redirect('/admin')
      }

      const user = await User.query().where('email', data.email).firstOrFail()

      await auth.use('web').login(user)

      // Check if the user is an admin
      const isAdmin = await user.related('role').query().where('name', 'Admin').first()

      session.flash({ status: 'Login successful' })

      // If the user is an admin, redirect to the admin page
      if (isAdmin) {
        return response.redirect('/admin')
      }

      // If the user is not an admin, redirect to the home page
      return response.redirect('/home')
    } catch (e) {
      session.flash({ error: 'Invalid credentials' })
      return response.redirect('back')
    }
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash({ status: 'Logout successful' })
    return response.redirect('/login')
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const roles = await Role.query().where('name', '=', 'Admin')
    // return roles
    return view.render('pages/register', { roles: roles })
  }

  /**
   * Handle form submission for the create action
   */
  async store({  }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({  }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({  }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({  }: HttpContext) {}
  
}
