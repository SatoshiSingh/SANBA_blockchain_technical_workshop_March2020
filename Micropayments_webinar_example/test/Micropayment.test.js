const Micropayments = artifacts.require('./Micropayments.sol')

contract('Micropayments', ([contractee1, contractee2]) => {
    before(async() => {
        this.Micropayments = await Micropayments.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await this.Micropayments.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('deploys with a balance of 0', async() => {
            assert.equal(await this.Micropayments.getBalance(), 0)
        })
    })


    describe('assigns contractees', async() => {
        it('Assigns contractees correctly', async() => {
            await this.Micropayments.addContractees(contractee1, contractee2);
            assert.equal(await this.Micropayments.contractee1(), "0x2E338D51020F3b7d3A2837c970A4737a44cbcc5E")
            assert.equal(await this.Micropayments.contractee2(), "0xb8703a97c1849C87a7588e7796A199C83772893f")
        })
    })

    describe('contract interactions', async() => {
        it('Locks funds in contract correctly', async() => {
            await this.Micropayments.lockFunds({from: contractee1, value: 1000});
            await this.Micropayments.lockFunds({from: contractee2, value: 2000});
            assert.equal(await this.Micropayments.balance1(), 1000)
            assert.equal(await this.Micropayments.balance2(), 2000)
            assert.equal(await this.Micropayments.getBalance(), 3000)
        })

        it('Allows contractees to pay each other', async() => {
            await this.Micropayments.pay(1000, {from: contractee1});
            assert.equal(await this.Micropayments.balance1(), 0)
            assert.equal(await this.Micropayments.balance2(), 3000)
            await this.Micropayments.pay(1000, {from: contractee2});
            assert.equal(await this.Micropayments.balance1(), 1000)
            assert.equal(await this.Micropayments.balance2(), 2000)
            assert.equal(await this.Micropayments.getBalance(), 3000)
        })

        it('Allows funds to be withdrawn from the contract', async() => {
            await this.Micropayments.withdraw();
            assert.equal(await this.Micropayments.balance1(), 0)
            assert.equal(await this.Micropayments.balance2(), 0)
            assert.equal(await this.Micropayments.getBalance(), 0)
        })
    })
})