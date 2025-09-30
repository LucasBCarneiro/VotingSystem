# 🗳️ Solidity Voting System

A decentralized voting system built with **Solidity**, designed to ensure fairness, transparency, and security in the voting process using smart contract logic.

## 📽️ Demonstration

In the demo video, the following functionalities were showcased:

- ✅ **Adding candidates** to the voting system
- 📋 **Listing all registered candidates**
- 🏆 **Displaying the winner** after voting
- 🛡️ **Security validations** during candidate registration and voting
- 🚫 **Unique vote restriction** — each address can vote only once

---

## ⚙️ Features

### 👤 Candidate Registration

Only the **owner** of the contract can register candidates, enforced via the `onlyOwner` modifier. The owner is set through an `immutable` variable at the time of contract deployment.

Candidate registration includes:
- ✅ Name length validation (to prevent empty/invalid names)
- 🔁 Duplicate name check (ensures a candidate can't be added twice)

### 🗳️ Voting Logic

The voting process includes multiple validations to ensure integrity:
- 🧾 Checks if there is at least **one candidate** registered
- 🧍 Verifies if the **voter has already voted**
- 🔢 Validates the **candidate index** to prevent out-of-bounds errors

If any of these checks fail, the transaction is reverted, protecting the contract from misuse or unintended behavior.

### 🚫 One Vote per Address

Each Ethereum address is allowed to vote **only once**. In the demo, this validation was shown in action: after the first successful vote, a second attempt from the same address was blocked with an error.

Sepolia Contract Address 0xDDD7be497e4cd5a411B05e7eb0f146236D1C8958
---

## 🔐 Security

- `onlyOwner` modifier ensures only the contract owner can:
  - Register new candidates
- Owner is set once and permanently during deployment using:
  ```solidity
  address public immutable owner;
