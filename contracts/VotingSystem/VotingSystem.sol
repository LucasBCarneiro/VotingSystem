// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public immutable owner ;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    uint private leadingCandidateIndex;
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => bool) private candidateExists;

    function addCandidate(string calldata name) external onlyOwner {
        require(bytes(name).length > 0, "Invalid name");
        bytes32 nameHash = keccak256(abi.encodePacked(name));
        require(!candidateExists[nameHash], "Already registered candidate");

        candidateExists[nameHash] = true;
        candidates.push(Candidate({ name: name, voteCount: 0 }));
    }

    function vote(uint candidateIndex) external {
        require(candidates.length > 0, "No registered candidates");
        require(!hasVoted[msg.sender], "You already voted!");
        require(candidateIndex < candidates.length, "Invalid candidate");

        candidates[candidateIndex].voteCount += 1;
        hasVoted[msg.sender] = true;
        if (
            candidates[candidateIndex].voteCount >
            candidates[leadingCandidateIndex].voteCount
        ) {
            leadingCandidateIndex = candidateIndex;
        }
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() external view returns (string memory winnerName) {
        require(candidates.length > 0, "No registered candidates");

        return candidates[leadingCandidateIndex].name;
    }

    
}
