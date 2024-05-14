import type { HttpContext } from '@adonisjs/core/http'

export default class QuizzesController {
  public async submit({ request, view }: HttpContext) {
    const answers = request.input('answers')

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

    return view.render('question/output', { result, solusi })
  }
}
