'use strict'

const Client = use('App/Models/Client')
const Antl = use('Antl')

class ClientController {
  async index() {
    return await Client.all()
  }

  async show({ params, locale}) {
    const client = await Client.findOrFail(params.id)
    await client.load('user')

    const user = client.getRelated('user')
    
    if(client.age >= 60) {
      client.observation = Antl.forLocale(locale).formatMessage('messages.warning', {name: user.name })
    }
    return client
  }

  async store({ request }) {
    const data = request.only(['user_id', 'address', 'age', 'weight'])
    const client = await Client.create(data)
    return client

  }
  async update({ params, request }) {
    const data = request.only(['user_id', 'address', 'age', 'weight'])
    const client = await Client.findOrFail(params.id)
    client.merge(data)
    await client.save()
    return client
  }
  async destroy({ params }) {
    const client = await Client.findOrFail(params.id)
    return await client.delete()
  }
}

module.exports = ClientController
