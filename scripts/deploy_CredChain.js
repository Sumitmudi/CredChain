async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());
  const userContractAddress = "0x6D5F904A40Ac6fDb639e48a3ef8643Ae022B0797";
  // Deploy the contract
  const NewContract1 = await ethers.getContractFactory("CredChain");
  const contract1 = await NewContract1.deploy(userContractAddress);
  await contract1.deployed();

  console.log("NewContract1 deployed to:", contract1.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
