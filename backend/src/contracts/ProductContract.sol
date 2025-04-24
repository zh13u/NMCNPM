// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
    struct Product {
        string id;
        string name;
        string description;
        string productionDate;
        string expiryDate;
        string batchNumber;
        string supplierId;
        bool exists;
    }

    mapping(string => Product) private products;
    string[] private productIds;

    event ProductAdded(
        string indexed productId,
        string name,
        string description,
        string productionDate,
        string expiryDate,
        string batchNumber,
        string supplierId
    );

    function addProduct(
        string memory _id,
        string memory _name,
        string memory _description,
        string memory _productionDate,
        string memory _expiryDate,
        string memory _batchNumber,
        string memory _supplierId
    ) public {
        require(!products[_id].exists, "Product already exists");
        
        Product memory newProduct = Product({
            id: _id,
            name: _name,
            description: _description,
            productionDate: _productionDate,
            expiryDate: _expiryDate,
            batchNumber: _batchNumber,
            supplierId: _supplierId,
            exists: true
        });

        products[_id] = newProduct;
        productIds.push(_id);

        emit ProductAdded(
            _id,
            _name,
            _description,
            _productionDate,
            _expiryDate,
            _batchNumber,
            _supplierId
        );
    }

    function getProduct(string memory _id) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        require(products[_id].exists, "Product does not exist");
        Product memory product = products[_id];
        return (
            product.id,
            product.name,
            product.description,
            product.productionDate,
            product.expiryDate,
            product.batchNumber,
            product.supplierId
        );
    }

    function getAllProducts() public view returns (string[] memory) {
        return productIds;
    }
} 