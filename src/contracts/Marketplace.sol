pragma solidity ^0.5.0;

contract Marketplace {
    string public name;

    // for counting total products
    uint public productCount = 0;

    mapping(uint => Product) public products;

    // Blockchain data structure
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    constructor() public {
        name = "Bob's Marketplace";
    }

    // events used just like console.log for logging the result
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    function createProducts(string memory _name, uint _price) public {
        // Check for valid name
        require(bytes(_name).length > 0);

        // Check for valid price
        require(_price > 0);

        // Increment productCount
        productCount++;

        // Create the product
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender, // Eth Address of the sender who runs this function
            false
        );

        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}
