import { expect } from 'chai'
import { warn, info, error, debug } from '../../src/libs/core/hook-stdout'
import Log from "../../src/libs/core/log"
import sinon, { SinonFakeTimers } from 'sinon'

var now = new Date(new Date().toUTCString());

describe('Log', ()=> {

    var clock: SinonFakeTimers

    before(() => {
        clock = sinon.useFakeTimers(now.getTime());
    });

    after(() => {
        clock.restore();
    });

    it('it should log a string without arguments as warning', () => {

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'

        const unhook = warn((value) => {
            expect(value).to.equal(expected)
        })

        Log.warning('Teste 123')

        unhook()
    })

    it('it should log a string with arguments as warning', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'

        const unhook = warn((value) => {
            expect(value).to.equal(expected)
        })

        Log.warning('%s %d', 'Teste', 123)

        unhook()
    })

    it('it should log many values as warning', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'

        const unhook = warn((value) => {
            expect(value).to.equal(expected)
        })

        Log.warning('Teste', 123)

        unhook()
    })

    it('it should log a object as warning', () => {
        const obj = {
            a: 'test',
            b: 123
        }

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":{"a":"test","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'

        const unhook = warn((value) => {
            expect(value).to.equal(expected)
        })

        Log.warning(obj)

        unhook()
    })

    it('it should log a object and a text as warning', () => {
        const obj = {
            a: 'Teste',
            b: 123
        }

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":{"a":"Teste","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'

        const expected2 = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":"X",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'

        const unhook = warn((value, params) => {
            expect(value).to.equal(expected)
            expect(params).to.equal(expected2)
        })

        Log.warning(obj, 'X')

        unhook()
    })

    it('it should log a string with tags', () => {

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"warning",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test",'+
            '"tags":["test1","test2"]'+
        '}'

        const unhook = warn((value) => {
            expect(value).to.equal(expected)
        })

        Log.taggedWarning(['test1', 'test2'], 'Teste 123')

        unhook()
    })

    it('it should log a string without arguments as info', () => {

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = info((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.info('Teste 123')
    
        unhook()
    })
    
    it('it should log a string with arguments as info', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = info((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.info('%s %d', 'Teste', 123)
    
        unhook()
    })
    
    it('it should log many values as info', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = info((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.info('Teste', 123)
    
        unhook()
    })
    
    it('it should log a object as info', () => {
        const obj = {
            a: 'test',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":{"a":"test","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = info((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.info(obj)
    
        unhook()
    })
    
    it('it should log a object and a text as info', () => {
        const obj = {
            a: 'Teste',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":{"a":"Teste","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const expected2 = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":"X",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = info((value, params) => {
            expect(value).to.equal(expected)
            expect(params).to.equal(expected2)
        })
    
        Log.info(obj, 'X')
    
        unhook()
    })
    
    it('it should log a string with tags', () => {
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"info",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test",'+
            '"tags":["test1","test2"]'+
        '}'
    
        const unhook = info((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.taggedInfo(['test1', 'test2'], 'Teste 123')
    
        unhook()
    })

    it('it should log a string without arguments as debug', () => {

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = debug((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.debug('Teste 123')
    
        unhook()
    })
    
    it('it should log a string with arguments as debug', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = debug((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.debug('%s %d', 'Teste', 123)
    
        unhook()
    })
    
    it('it should log many values as debug', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = debug((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.debug('Teste', 123)
    
        unhook()
    })
    
    it('it should log a object as debug', () => {
        const obj = {
            a: 'test',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":{"a":"test","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = debug((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.debug(obj)
    
        unhook()
    })
    
    it('it should log a object and a text as debug', () => {
        const obj = {
            a: 'Teste',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":{"a":"Teste","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const expected2 = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":"X",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = debug((value, params) => {
            expect(value).to.equal(expected)
            expect(params).to.equal(expected2)
        })
    
        Log.debug(obj, 'X')
    
        unhook()
    })
    
    it('it should log a string with tags', () => {
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"debug",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test",'+
            '"tags":["test1","test2"]'+
        '}'
    
        const unhook = debug((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.taggedDebug(['test1', 'test2'], 'Teste 123')
    
        unhook()
    })

    it('it should log a string without arguments as critical', () => {

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.critical('Teste 123')
    
        unhook()
    })
    
    it('it should log a string with arguments as critical', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.critical('%s %d', 'Teste', 123)
    
        unhook()
    })
    
    it('it should log many values as critical', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.critical('Teste', 123)
    
        unhook()
    })
    
    it('it should log a object as critical', () => {
        const obj = {
            a: 'test',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":{"a":"test","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.critical(obj)
    
        unhook()
    })
    
    it('it should log a object and a text as critical', () => {
        const obj = {
            a: 'Teste',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":{"a":"Teste","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const expected2 = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":"X",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value, params) => {
            expect(value).to.equal(expected)
            expect(params).to.equal(expected2)
        })
    
        Log.critical(obj, 'X')
    
        unhook()
    })
    
    it('it should log a string with tags', () => {
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"critical",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test",'+
            '"tags":["test1","test2"]'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.taggedCritical(['test1', 'test2'], 'Teste 123')
    
        unhook()
    })

    it('it should log a string without arguments as fatal', () => {

        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.fatal('Teste 123')
    
        unhook()
    })
    
    it('it should log a string with arguments as fatal', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.fatal('%s %d', 'Teste', 123)
    
        unhook()
    })
    
    it('it should log many values as fatal', () => {
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.fatal('Teste', 123)
    
        unhook()
    })
    
    it('it should log a object as fatal', () => {
        const obj = {
            a: 'test',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":{"a":"test","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.fatal(obj)
    
        unhook()
    })
    
    it('it should log a object and a text as fatal', () => {
        const obj = {
            a: 'Teste',
            b: 123
        }
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":{"a":"Teste","b":123},'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const expected2 = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":"X",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test"'+
        '}'
    
        const unhook = error((value, params) => {
            expect(value).to.equal(expected)
            expect(params).to.equal(expected2)
        })
    
        Log.fatal(obj, 'X')
    
        unhook()
    })
    
    it('it should log a string with tags', () => {
    
        const expected = '{'+
            '"timestamp":'+JSON.stringify(now)+','+
            '"level":"fatal",'+
            '"message":"Teste 123",'+
            '"channel":"stdout",'+
            '"application":"'+process.env.npm_package_name+'",'+
            '"environment":"test",'+
            '"tags":["test1","test2"]'+
        '}'
    
        const unhook = error((value) => {
            expect(value).to.equal(expected)
        })
    
        Log.taggedFatal(['test1', 'test2'], 'Teste 123')
    
        unhook()
    })

})