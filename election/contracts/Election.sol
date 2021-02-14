// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address=>bool) public voters;
    mapping(uint => Candidate) public candidates;

    string public candidate;
    uint public candidatesCount;

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {

        // Require not voted
        require(!voters[msg.sender]);

        // Validate candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // Vote should be recorded
        voters[msg.sender] = true;

        // votecount should increase 
        candidates[_candidateId].voteCount++;

    }

    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

}