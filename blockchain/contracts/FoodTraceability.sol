// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTraceability {
    struct Event {
        string productName;
        string actor;
        string location;
        string step;
        string qualityStatus;
        string details;
        uint256 timestamp;
    }

    mapping(string => Event[]) private productEvents;
    string[] private productIds;

    function addEvent(
        string memory productId,
        string memory productName,
        string memory actor,
        string memory location,
        string memory step,
        string memory qualityStatus,
        string memory details
    ) public {
        Event memory newEvent = Event({
            productName: productName,
            actor: actor,
            location: location,
            step: step,
            qualityStatus: qualityStatus,
            details: details,
            timestamp: block.timestamp
        });

        if (productEvents[productId].length == 0) {
            productIds.push(productId);
        }

        productEvents[productId].push(newEvent);
    }

    function getEvents(string memory productId) public view returns (Event[] memory) {
        return productEvents[productId];
    }

    function getAllProductIds() public view returns (string[] memory) {
        return productIds;
    }
}
