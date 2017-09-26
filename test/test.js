/* global describe, it */

const {expect} = require('chai')
const EntityManager = require('../src/EntityManager.js')
const Entity = require('../src/Entity.js')

describe('EntityManager', function () {
  it('Stores entities', function () {
    let entities = new EntityManager()
    let entity = entities.create()
    expect(entities._entities).includes(entity)
  })

  it('Removes entities', function () {
    let entities = new EntityManager()
    let entity = entities.create()
    entities.remove(entity)
    expect(entities._entities).not.includes(entity)
  })

  it('Removes all entities', function () {
    let entities = new EntityManager()
    let entity = entities.create()
    let entity2 = entities.create()
    entities.removeAll()
    expect(entities._entities).not.includes(entity).and.includes(entity2)
  })

  it('Retrieves entities', function () {
    let entities = new EntityManager()
    let entity = entities.create()
    class TestComponent {}
    entity.addComponent(TestComponent)
    expect(entities.getWith([TestComponent])).includes(entity)
  })
})

describe('Entity', function () {
  it('Adds component', function () {
    let entity = new Entity()
    class TestComponent {}
    entity.addComponent(TestComponent)
    expect(entity._components).includes(new TestComponent())
  })

  it('Removes component', function () {
    let entity = new Entity()
    class TestComponent {}
    entity.addComponent(TestComponent)
    entity.removeComponent(TestComponent)
    expect(entity._components).not.have.property('testComponent')
  })

  it('Names component property correctly', function () {
    let entity = new Entity()
    class TestComponent {}
    entity.addComponent(TestComponent)
    expect(entity._components).have.property('testComponent')
  })

  it('Retrieves component from type', function () {
    let entity = new Entity()
    class TestComponent {}
    entity.addComponent(TestComponent)
    expect(entity.get(TestComponent)).to.be.equal(
      entity._components.testComponent
    )
  })

  it('Retrieves component from prop name', function () {
    let entity = new Entity()
    class TestComponent {}
    entity.addComponent(TestComponent)
    expect(entity.get('testComponent')).to.be.equal(
      entity._components.testComponent
    )
  })

  it('Retrieves component from class name', function () {
    let entity = new Entity()
    class TestComponent {}
    entity.addComponent(TestComponent)
    expect(entity.get('TestComponent')).to.be.equal(
      entity._components.testComponent
    )
  })
})
