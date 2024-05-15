/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class QuizzesController {
  public async submit({ request, view, auth }: HttpContext) {
    const user = await auth.authenticate()

    const answers = request.input('answers')

    const userResult = await User.query().where('id', user.id).firstOrFail()

    let yesCount = 0

    for (const answer in answers) {
      if (answers[answer] === 'yes') {
        yesCount++
      }
    }

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

    // Save the quiz result and solution to the user's record
    userResult.result = result
    userResult.solution = solusi
    await userResult.save()

    return view.render('question/output', { result, solusi })
  }
}