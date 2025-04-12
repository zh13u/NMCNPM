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
    string[] private productIds; // lưu id đã tạo

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
        if (productEvents[_productId].length == 0) {
            productIds.push(_productId); // thêm nếu là lần đầu id được sử dụng
        }

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

    //Lấy tất cả ID
    function getAllProductIds() public view returns (string[] memory) {
        return productIds;
    }
}
