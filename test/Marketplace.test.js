const { assert } = require("chai");

const Marketplace = artifacts.require('./Marketplace.sol')

require("chai")
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace;

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, " ")
            assert.notEqual(address, undefined)
            assert.notEqual(address, null)
        })

        it('should have a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, "Bob's Marketplace")
        })
    })


    describe('products', async () => {
        let result, productCount

        before(async () => {
            result = await marketplace.createProducts("Samsung A21", web3.utils.toWei("2", "Ether"), { from: seller })
            productCount = await marketplace.productCount()
        })
        it('create products', async () => {
            // Sucess
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'ID is correct!!')
            assert.equal(event.name, "Samsung A21", 'name is correct!!')
            assert.equal(event.price, "2000000000000000000", 'price is correct!!')
            assert.equal(event.owner, seller, ' is correct!!')
            assert.equal(event.purchased, false, 'purhcase is correct!!')

            // FAILURE:
            // check for name
            await marketplace.createProducts("", web3.utils.toWei("2", "Ether"), { from: seller }).should.be.rejected;

            // check for price
            await marketplace.createProducts("Samsung A21", 0, { from: seller }).should.be.rejected;

        })
    })
})
