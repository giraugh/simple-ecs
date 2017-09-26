const _ = require('lodash')

module.exports = class Entity {
  constructor () {
    this._components = {}
  }

  getComponentIndex (Component) {
    if (typeof Component === 'string') {
      return _.lowerFirst(Component)
    } else {
      return _.lowerFirst(Component.name)
    }
  }

  get (Component) {
    let componentIndex = this.getComponentIndex(Component)
    return this._components[componentIndex]
  }

  addComponent (Component) {
    let componentIndex = _.lowerFirst(Component.name)
    this._components[componentIndex] = new Component()
    return this
  }

  hasComponents (components) {
    return components.every(query =>
      Object.keys(this._components).some(componentName =>
        this._components[componentName] instanceof query
      )
    )
  }

  removeComponent (Component) {
    let componentIndex = this.getComponentIndex(Component)
    delete this._components[componentIndex]
  }
}
