import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
    // @ts-ign
    client: MongoClient,
    uri: null as string,

    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(url)
    },

    async disconnect() {
        await this.client.close()
        this.client=null
    },

    async getCollection(name: string): Promise<Collection> {
      if(!this.client?.isConnected()){
        await this.connect(this.uri)
      }
        return this.client.db().collection(name)
    },

    map: (collection: any): any => {
        const { _id, ...collectionWithoutId } = collection
        return Object.assign({}, collectionWithoutId, { id: _id })
    }

}