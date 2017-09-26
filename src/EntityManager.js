const Entity = require('./Entity.js')

module.exports = class EntityManager {
  constructor () {
    this._entities = []
  }

  create () {
    let ent = new Entity()
    this._entities.push(ent)
    return ent
  }

  removeAll () {
    this._entities = []
  }

  getWith (components) {
    return this._entities.filter(entity =>
      entity.hasComponents(components)
    )
  }

  remove (entity) {
    if (!this._entities.includes(entity)) {
      throw new Error('No such entity.')
    } else {
      let index = this._entities.indexOf(entity)
      this._entities.splice(index, 1)
    }
  }
}
