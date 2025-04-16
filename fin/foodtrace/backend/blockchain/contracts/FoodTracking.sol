// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTracking {
    struct Product {
        string productId;
        string name;
        string origin;
        uint256 harvestDate;
        string supplierId;
        bool exists;
    }
    
    struct TrackingPoint {
        string location;
        uint256 timestamp;
        string action;
        int256 temperature;
        int256 humidity;
    }
    
    mapping(string => Product) private products;
    mapping(string => TrackingPoint[]) private trackingPoints;
    
    event ProductAdded(string productId, string name, string origin, uint256 harvestDate, string supplierId);
    event ProductUpdated(string productId, string name, string origin, uint256 harvestDate);
    event TrackingPointAdded(string productId, string location, uint256 timestamp, string action);
    
    function addProduct(
        string memory _productId,
        string memory _name,
        string memory _origin,
        uint256 _harvestDate,
        string memory _supplierId
    ) public {
        require(!products[_productId].exists, "Product already exists");
        
        products[_productId] = Product({
            productId: _productId,
            name: _name,
            origin: _origin,
            harvestDate: _harvestDate,
            supplierId: _supplierId,
            exists: true
        });
        
        emit ProductAdded(_productId, _name, _origin, _harvestDate, _supplierId);
    }
    
    function updateProduct(
        string memory _productId,
        string memory _name,
        string memory _origin,
        uint256 _harvestDate
    ) public {
        require(products[_productId].exists, "Product does not exist");
        
        Product storage product = products[_productId];
        product.name = _name;
        product.origin = _origin;
        product.harvestDate = _harvestDate;
        
        emit ProductUpdated(_productId, _name, _origin, _harvestDate);
    }
    
    function addTrackingPoint(
        string memory _productId,
        string memory _location,
        uint256 _timestamp,
        string memory _action,
        int256 _temperature,
        int256 _humidity
    ) public {
        require(products[_productId].exists, "Product does not exist");
        
        TrackingPoint memory newPoint = TrackingPoint({
            location: _location,
            timestamp: _timestamp,
            action: _action,
            temperature: _temperature,
            humidity: _humidity
        });
        
        trackingPoints[_productId].push(newPoint);
        
        emit TrackingPointAdded(_productId, _location, _timestamp, _action);
    }
    
    function getProduct(string memory _productId) public view returns (
        string memory productId,
        string memory name,
        string memory origin,
        uint256 harvestDate,
        string memory supplierId,
        bool exists
    ) {
        Product storage product = products[_productId];
        return (
            product.productId,
            product.name,
            product.origin,
            product.harvestDate,
            product.supplierId,
            product.exists
        );
    }
    
    function getTrackingPointsCount(string memory _productId) public view returns (uint256) {
        return trackingPoints[_productId].length;
    }
    
    function getTrackingPoint(string memory _productId, uint256 _index) public view returns (
        string memory location,
        uint256 timestamp,
        string memory action,
        int256 temperature,
        int256 humidity
    ) {
        require(_index < trackingPoints[_productId].length, "Index out of bounds");
        
        TrackingPoint storage point = trackingPoints[_productId][_index];
        return (
            point.location,
            point.timestamp,
            point.action,
            point.temperature,
            point.humidity
        );
    }
}