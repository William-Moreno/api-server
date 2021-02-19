'use strict';

class FoodInterface {

  constructor(model) {
    this.model = model;
  }

  read(id) {
    if(id) {
      return this.model.find({_id: id});
    }
    return this.model.find({});
  }

  create(obj) {
    const document = new this.model(obj);
    return document.save();
  }

  update(id, obj) {
    for(let i = 0 ; i < this.db.length ; i++) {
      if(this.db[i].id === id) {
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }

  delete(id) {
    for(let i = 0 ; i < this.db.length ; i++) {
      if(this.db[i].id === id) {
        this.db[i].data = null;
        return this.db[i];
      }
    }
  }
}

module.exports = FoodInterface;