// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Twitter {
    struct Tweat {
        address uploader;
        string content;
        uint timestamp;
    }
    Tweat[] public tweats;

    event tweatCreated(address indexed uploader, string content, uint timestamp);

    function createTweat(string memory _content) external {
        require(bytes(_content).length > 0, "the tweat should not be empty");
        require(bytes(_content).length <= 280, "the tweat is too long");
        tweats.push(Tweat(msg.sender, _content, block.timestamp));

        emit tweatCreated(msg.sender, _content, block.timestamp);
    }

    function getAllTweat() external view returns (Tweat[] memory) {
        return tweats;
    }
}
