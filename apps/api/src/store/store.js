// Store em memoria - sem Redis no Shappire
export default class Store {
    constructor(name) {
        this.name = name;
        this.cache = new Map();
    }

    async get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (item.expiry && item.expiry < Date.now()) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }

    async set(key, value, ttl) {
        this.cache.set(key, {
            value,
            expiry: ttl ? Date.now() + ttl * 1000 : null,
        });
    }

    async delete(key) {
        this.cache.delete(key);
    }
}
