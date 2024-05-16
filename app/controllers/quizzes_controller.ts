/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class QuizzesController {
  public async submit({ request, view, auth }: HttpContext) {
    try {
      // Authenticating user
      const user = await auth.authenticate()

      // Getting answers from request
      const answers = request.input('answers')

      // Counting 'yes' answers
      let yesCount = 0
      for (const answer in answers) {
        if (answers[answer] === 'yes') {
          yesCount++
        }
      }

      // Determining result and solution based on 'yes' count
      let result = ''
      let solusi = ''
      if (yesCount === 0) {
        result = 'Tidak Depresi'
        solusi = 'Tetap jaga kesehatan mental Anda.'
      } else if (yesCount === 5) {
        result = 'Depresi Berat'
        solusi = 'Kami sarankan Anda segera konsultasi dengan ahli kesehatan mental.'
      } else if (yesCount <= 2) {
        result = 'Depresi Ringan'
        solusi = 'Coba lakukan relaksasi dan aktivitas yang Anda sukai.'
      } else {
        result = 'Depresi Menengah'
        solusi = 'Pertimbangkan untuk berbicara dengan konselor atau terapis.'
      }

      // Update user model with quiz result
      user.result = result
      user.solution = solusi
      await user.save()

      // Returning the view with result and solution
      return view.render('question/output', { result, solusi })
    } catch (error) {
      console.error('Failed to submit quiz:', error)  
      // Handle error accordingly, maybe return an error view
      return view.render('error', { message: 'Failed to submit quiz.' })
    }
  }
}