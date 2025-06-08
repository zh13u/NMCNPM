// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTraceability {
    struct Product {
        string name;
        string origin;
        uint256 createdAt;
        address createdBy;
        bool exists;
    }

    struct ProductStep {
        string actor;
        string location;
        string step;
        string qualityStatus;
        string details;
        uint256 timestamp;
    }

    mapping(bytes32 => Product) public products;
    mapping(bytes32 => ProductStep[]) public productHistory;
    bytes32[] public productIds;

    event ProductAdded(bytes32 indexed productId, string name, address createdBy);
    event StepAdded(bytes32 indexed productId, string step, string actor);

    function addProduct(string memory _id, string memory _name, string memory _origin) public {
        bytes32 productId = keccak256(abi.encodePacked(_id));
        require(!products[productId].exists, "Product already exists");
        
        products[productId] = Product({
            name: _name,
            origin: _origin,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            exists: true
        });
        
        productIds.push(productId);
        emit ProductAdded(productId, _name, msg.sender);
    }

    function addStep(string memory _id, string memory _actor, string memory _location, 
                    string memory _step, string memory _qualityStatus, string memory _details) public {
        bytes32 productId = keccak256(abi.encodePacked(_id));
        require(products[productId].exists, "Product does not exist");
        
        ProductStep memory newStep = ProductStep({
            actor: _actor,
            location: _location,
            step: _step,
            qualityStatus: _qualityStatus,
            details: _details,
            timestamp: block.timestamp
        });
        
        productHistory[productId].push(newStep);
        emit StepAdded(productId, _step, _actor);
    }

    function getProduct(string memory _id) public view returns (Product memory) {
        bytes32 productId = keccak256(abi.encodePacked(_id));
        require(products[productId].exists, "Product does not exist");
        return products[productId];
    }

    function getProductHistory(string memory _id) public view returns (ProductStep[] memory) {
        bytes32 productId = keccak256(abi.encodePacked(_id));
        require(products[productId].exists, "Product does not exist");
        return productHistory[productId];
    }

    function getProductCount() public view returns (uint256) {
        return productIds.length;
    }
}
