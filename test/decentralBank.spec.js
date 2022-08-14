// The First thing is bringing in our contracts in JavaScript files using artifacts.require() method
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

// The Second thing is bringing in Chai which is an Assertion Library
require("chai");

// Remember this is a test file for the decentralBank contract (the skeleton)
// With assertions we can check different kinds of things.
contract("DecentralBank", ([owner, customer]) => {
	// All of the code goes here for unit testing
	let tether, reward, decentralBank;

	// A function which returns every number you pass in Wei
	let convertToWei = (number) => web3.utils.toWei(number);

	// What before can actually do for us is that any code that we add to before for our tests will essentially run first before anything.
	// We actually use the before method to initialize our contracts
	// and you can put the before pretty much anywhere in the code.
	before(async () => {
		// This is essentially where we're loading our contracts | Load Contracts
		// We're creating a new instance of the Tether contract to work within our JavaScript files using the new() or deployed() methods
		tether = await Tether.new();

		// We're creating a new instance of the RWD contract to work within our JavaScript files using the new() or deployed() methods
		reward = await RWD.new();

		// We're creating a new instance of the DecentralBank Contract to work within our JavaScript files using the new() or deployed() methods
		decentralBank = await DecentralBank.new(reward.address, tether.address);

		// We're transferring all RWD tokens to our decentralBank contract
		await reward.transfer(decentralBank.address, convertToWei("1000000"));

		// Transferring 100 Tether tokens to investor (customer)
		await tether.transfer(customer, convertToWei("100"), {
			from: owner,
		});
	});

	// it's a description of our test
	describe("Tether Deployment", async () => {
		it("matches name successfully", async () => {
			// we use the "await" keyword here to tell Truffle, Hey Truffle, Please wait a minute, I want you to wait for this line of code until it returns the result
			// I don't want you Truffle to run this block of code asynchronously! I want you to run it synchronously
			const name = await tether.name(); // will run synchronously and stop here to get the result

			assert.equal(name, "Tether");
		});
	});

	describe("Reward Deployment", async () => {
		it("matches name successfully", async () => {
			// After importing our contract, we must create an instance of that contract to work within our JS files, Otherwise there is no way to work with contracts in JS files

			// we use the "await" keyword here to tell Truffle, Hey Truffle, Please wait a minute, I want you to wait for this line of code until it returns the result
			// I don't want you Truffle to run this block of code asynchronously! I want you to run it synchronously
			const name = await reward.name();

			assert.equal(name, "Reward Token");
		});
	});
});
