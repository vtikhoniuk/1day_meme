// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract AidleToken is ERC1155, Ownable, ERC1155Supply {

    uint256 public maxIdTotalSupply = 10;
    uint256 public mintPrice = 0;
    uint256 private _protocolStartTimestamp;

    error ProtocolAlreadyStarted();
    error StartTimestampShouldBeInFuture();
    error MaxIdTotalSupplyExceeded();
    error TokenIdNotMatchingDate();

    event MaxIdTotalSupplyChanged(uint256 indexed previousValue, uint256 indexed newValue);
    event MintPriceChanged(uint256 indexed previousValue, uint256 indexed newValue);

    constructor(address initialOwner)
        ERC1155("http://localhost/")
        Ownable(initialOwner)
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setMaxIdTotalSupply(uint256 newMaxIdTotalSupply) public onlyOwner {
        uint256 oldMaxIdTotalSupply = maxIdTotalSupply;
        maxIdTotalSupply = newMaxIdTotalSupply;
        emit MaxIdTotalSupplyChanged(oldMaxIdTotalSupply, newMaxIdTotalSupply);
    }

    function setMintPrice(uint256 newMintPrice) public onlyOwner {
        uint256 oldMintPrice = mintPrice;
        mintPrice = newMintPrice;
        emit MintPriceChanged(oldMintPrice, newMintPrice);
    }

    function startProtocol(uint256 startTimestamp) public onlyOwner {
        if(_protocolStartTimestamp != 0) {
            revert ProtocolAlreadyStarted();
        }
        if (startTimestamp <= block.timestamp){
            revert StartTimestampShouldBeInFuture();
        }
        _protocolStartTimestamp = startTimestamp;
    }

    function claim() public {
        address account = _msgSender();
        uint256 id = block.timestamp / 1 days - _protocolStartTimestamp / 1 days;
        bytes memory data = '0x0';
        if (totalSupply(id) >= maxIdTotalSupply) {
            revert MaxIdTotalSupplyExceeded();
        }
        safeTransferFrom(account, address(this), id, mintPrice, data);
        _mint(account, id, 1, data);
    }

    // The following functions are overrides required by Solidity
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
