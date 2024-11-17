async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  // Deploy the contract
  const NewContract1 = await ethers.getContractFactory("User");
  const contract1 = await NewContract1.deploy(); // No arguments passed
  await contract1.deployed();

  console.log("NewContract1 deployed to:", contract1.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
