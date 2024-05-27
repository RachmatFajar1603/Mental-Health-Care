/* eslint-disable prettier/prettier */
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'address', 'phoneNumber', 'roleId', 'id', 'result', 'solution'])

    try {
      await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        address: data.address,
        phoneNumber: data.phoneNumber,
        id:data.id,
        result:data.result,
        solution:data.solution,
      })

      session.flash({ status: 'User created successfully' })
      return response.redirect('/login')
    } catch (error) {
      console.error(error)
      session.flash({ error: 'User failed to create' })
      return response.redirect('/register')
    }
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    try {
      const user = await User.find(params.id)

      if (!user) {
        // Handle the case where no user was found
        // This could be redirecting to a 404 page, showing an error message, etc.
        return // Add appropriate handling here
      }

      return view.render('pages/profile', { user: user })
    } catch (error) {
      console.error(error)
      // Handle the error
      return // Add appropriate handling here
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params, request, response, session }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'address', 'phoneNumber', 'roleId', 'id', 'result', 'solution'])
    // validate password not null
    const user = await User.find(params.id)
    if (!data.password) {
      session.flash({ error: 'Password cant be null' })
      return response.redirect('/user/' + params.id)
    }
    // check if user not null
    if (user) {
      user.fullName = data.fullName
      user.email = data.email
      user.password = data.password
      user.address = data.address
      user.phoneNumber = data.phoneNumber
      user.roleId = data.roleId
      user.result = data.result
      user.solution = data.solution
      user.id = data.id
      const update = await user.save()
      if (update) {
        session.flash({ status: 'User updated successfully' })
        return response.redirect('/profile')
      } else {
        session.flash({ status: 'User cant updated' })
        return response.redirect('/profile')
      }
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const user = await User.find(params.id)

      if (user) {
        await user.delete()
        session.flash({ status: 'User deleted successfully' })
        return response.redirect('/admin')
      }
    } catch (error) {
      console.error(error)
      // Handle the error
      return // Add appropriate handling here
    }
  }


}
