// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract TokenV2a is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    ERC20PermitUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public _maxSupply;
    mapping(address => bool) public bs;
    mapping(address => bool) public ws;

    function initialize(
        string memory name,
        string memory symbol,
        uint256 maxSupply
    ) public initializer {
        __ERC20_init(name, symbol);
        __ERC20Burnable_init();
        __Pausable_init();
        __AccessControl_init();
        __ERC20Permit_init(name);
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
        _maxSupply = maxSupply * 10 ** 18;
        _mint(msg.sender, maxSupply * 10 ** 18);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setBl(address a, bool t) public onlyRole(PAUSER_ROLE) {
        bs[a] = t;
    }

    function setWl(address a, bool t) public onlyRole(PAUSER_ROLE) {
        ws[a] = t;
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(
            totalSupply() + amount <= _maxSupply,
            "ERC20: mint amount exceeds max supply"
        );
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        if (bs[from] == true) revert("Transfer wrong address");
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {}

    function version() public pure returns (string memory _version) {
        return "20230518.2";
    }
}
