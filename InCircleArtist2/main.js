// MetaMask is our 'provider' in this case
const provider = new ethers.providers.Web3Provider(window.ethereum);

// You (whoever is signed into MetaMask) is the 'signer'
const signer = provider.getSigner();

// the 'contract' object allows us to call functions from our smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// the 'contractWithSigner' object allows us to call smart contract functions that
// require us to send a transaction (like changing a number on the blockchain)
const contractWithSigner = contract.connect(signer);

async function init() {
  await provider.send("eth_requestAccounts", []);
}

init();

// EVENT LISTENERS

// when I click on the setNum button...
$('#setArtistButton').click(function(){
  setInfo();
})


// checks the blockchain for the current number every 2 seconds
// so that the page can be updated automatically if the number
// is changed.
setInterval(function(){
  getUserInfo();
}, 2000)

// FUNCTIONS

// CHANGING THE BLOCKCHAIN
async function getUserInfo() {

  // grab the number from the contract
  const currentName = await contract.getName();
  const currentAddress = await contract.getAddress();
  
  console.log(currentName)
  console.log(currentAddress)
  // currentName[0],currentName[1]

  // iterate through currentName and currentAddress, concat all items
  var nameAndAddressArray = [];
  for (var i=0; i < currentName.length ; i++) {
    nameAndAddressArray += "<div class='list'>"+currentName[i] + "   " + currentAddress[i] + "   " +"</div>"
  }

  // display the current nvvumber to your web page
  //$('#currentArtist').innerHTML = nameAndAddressArray
  console.log(nameAndAddressArray)
  document.getElementById("currentArtist").innerHTML = nameAndAddressArray
  // $('#currentAddress').text(currentAddress)
}


// READING FROM THE BLOCKCHAIN

function setInfo() {
  // grab the user input from the input text box
  const nameToSet = $('#setArtistInput').val();
  const addressToSet = $('#setAddressInput').val();

  // pass the converted number to the contract
  contractWithSigner.nameInput(addressToSet, nameToSet);
}

