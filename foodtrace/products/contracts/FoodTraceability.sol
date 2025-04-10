// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTraceability {
    struct Event {
        string productId;
        string productName;
        string actor;
        string location;
        string step;
        string qualityStatus;
        string details;
        uint256 timestamp;
    }
    
    mapping(string => Event[]) private productEvents;
    
    event NewEvent(
        string productId,
        string productName,
        string actor,
        string location,
        string step,
        string qualityStatus,
        string details,
        uint256 timestamp
    );
    
    function addEvent(
        string memory _productId,
        string memory _productName,
        string memory _actor,
        string memory _location,
        string memory _step,
        string memory _qualityStatus,
        string memory _details
    ) public {
        Event memory newEvent = Event({
            productId: _productId,
            productName: _productName,
            actor: _actor,
            location: _location,
            step: _step,
            qualityStatus: _qualityStatus,
            details: _details,
            timestamp: block.timestamp
        });
        productEvents[_productId].push(newEvent);
        emit NewEvent(_productId, _productName, _actor, _location, _step, _qualityStatus, _details, block.timestamp);
    }
    
    function getEvents(string memory _productId) public view returns (Event[] memory) {
        return productEvents[_productId];
    }
}
