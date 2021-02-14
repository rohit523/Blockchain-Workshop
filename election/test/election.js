var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {

    var electionsInstance;

    it("Initializes with two candidates", function() {

        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });

    });

    it("It initializes the candidates with correct values", function() {
        return Election.deployed().then(function(instance) {
            electionsInstance = instance;
            return electionsInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "Contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "Contains the correct name");
            assert.equal(candidate[2], 0, "Contains the correct value of vote count");
            return electionsInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "Contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "Contains the correct name");
            assert.equal(candidate[2], 0, "Contains the correct value of vote count");
        });
    });

    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "the voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
    });

});