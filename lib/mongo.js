const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mongo');
const config = require('../config');

const MONGO_URI = config.db.URI;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    );
    this.dbName = config.db.Name;
    this.connection = undefined;
  }

  async connect() {
    if (this.connection) return this.connection;

    try {
      let client = await this.client.connect();
      this.connection = client.db(this.dbName)
      debug('[DB] -> connected successfully.')
      return this.connection;
    } catch (error) {
      console.error(`[db] -> Error: ${error}`)
      process.exit(1);
    }
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect();
      return db.collection(collection).find(query).toArray();
    }
    catch (error) {
      return error;
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect();
      return db.collection(collection).findOne({ _id: ObjectID(id) });
    } catch (error) {
      return error;
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect();
      const newItem = await db.collection(collection).insertOne(data);
      return newItem.insertedId;
    } catch (error) {
      return error;
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect();
      const updatedItem = await db.collection(collection).updateOne(
        { _id: ObjectID(id) },
        { $set: data },
        { upsert: true },
      );

      return updatedItem.upsertedId || id;
    } catch (error) {
      return error;
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect();
      const deletedItem = await db.collection(collection).deleteOne({ _id: ObjectID(id) });
      return deletedItem.upsertedId || id;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MongoLib;
