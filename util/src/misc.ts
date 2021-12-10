import assert from "assert"


export function assertNotNull<T>(val: T | undefined | null, msg?: string): T {
    assert(val != null, msg)
    return val
}


/**
 * Method decorator, which when applied caches the result of the first invocation and returns it
 * for all subsequent calls.
 */
export function def(proto: any, prop: string, d: PropertyDescriptor): PropertyDescriptor {
    let {value: fn, ...options} = d
    let is_ready = Symbol(prop + '_is_ready')
    let is_active = Symbol(prop + '_is_active')
    let cache = Symbol(prop + '_cache')

    let value = function(this: any) {
        if (this[is_ready]) return this[cache]
        if (this[is_active]) throw new Error('Cycle detected involving ' + prop)
        this[is_active] = true
        try {
            this[cache] = fn.call(this)
            this[is_ready] = true
        } finally {
            this[is_active] = false
        }
        return this[cache]
    } as any

    value._def_cache_symbol = cache

    return {value, ...options}
}


export function unexpectedCase(val?: unknown): Error {
    return new Error(val ? `Unexpected case: ${val}` : `Unexpected case`)
}