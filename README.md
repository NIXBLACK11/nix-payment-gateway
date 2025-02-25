https://station.jup.ag/docs/swap-api/payments-through-swap
https://station.jup.ag/docs/swap-api/send-swap-transaction#prepare-transaction
https://chatgpt.com/c/67bca99c-e758-800b-9d69-3baa91a96992




add buyer

const handleAddBuyer = async () => {
  const success = await addBuyer("saasId123", "user@example.com", "Pro", new Date());
  
  if (success) {
    console.log("Buyer added successfully!");
  } else {
    console.log("Failed to add buyer.");
  }
};
