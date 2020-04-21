class Cache{
    constructor(){
        this._cache = Object.create(null);
    }

    getKeys(){
        return Object.keys(this._cache);
    }

    put(key, value, ttl){
        console.debug("Adding data to cache");
        const oldData = this._cache[key];

        if(oldData){
            clearTimeout(oldData.timeout);
        }

        const data = {
            value,
            expire: Date.now() + ttl,
        };

        data.timeout = setTimeout(() => {
            this.delete(key);
        }, ttl);

        this._cache[key] = data;
        console.debug('Data added to cache');
    }

    delete(key) {
        console.debug("Deleting data from cache");
        const oldData = this._cache[key];

        if(oldData){
            clearTimeout(oldData.timeout);
        }

        delete this._cache[key];
        console.debug("Data deleted from cache");
    }

    get(key){
        console.debug("Getting data from cache");
        let data = this._cache[key];
        if(data){
            return data.value;
        }

        return null;
    }

    clear(){
        console.debug("Clearing cache");
        Object.keys(this._cache).forEach((key) => {
            clearTimeout(this._cache[key].timeout);
        });
        this._cache = Object.create(null);
    }
}

module.exports = new Cache();