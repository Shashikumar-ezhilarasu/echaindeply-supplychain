import { STACKS_TESTNET } from "@stacks/network";
import {
  BooleanCV,
  cvToValue,
  fetchCallReadOnlyFunction,
  ListCV,
  OptionalCV,
  PrincipalCV,
  stringUtf8CV,
  stringAsciiCV,
  TupleCV,
  uintCV,
  UIntCV,
} from "@stacks/transactions";

const CONTRACT_ADDRESS = "STHK32FSHBAWT513Y7806RME1BCH44QJKRN2XRQB";
const CONTRACT_NAME = "product-traceability1";



export async function getAllGames() {
  // Fetch the latest-game-id from the contract
  const latestGameIdCV = (await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-latest-game-id",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  }));

  // Convert the uintCV to a JS/TS number type
  const latestGameId = parseInt(latestGameIdCV.value.toString());

  // Loop from 0 to latestGameId-1 and fetch the game details for each game
  const games= [];
  for (let i = 0; i < latestGameId; i++) {
    const game = await getGame(i);
    if (game) games.push(game);
  }
  return games;
}

export async function getProduct(productId) {
  // Use the get-game read only function to fetch the game details for the given productId
  const gameDetails = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-product",
    functionArgs: [uintCV(productId)],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });

  const responseCV = gameDetails;
  // If we get back a none, then the game does not exist and we return null
  if (responseCV.type === "none") return null;
  // If we get back a value that is not a tuple, something went wrong and we return null
  if (responseCV.value.type !== "tuple") return null;

  // If we got back a GameCV tuple, we can convert it to a Game object
  const productCV = responseCV.value.value;

  
  return productCV;
}

export async function createNewProduct(
  productId,
  productName,
  sku,
  gtin,
  ingredients,
  certifications,
  manufacturerName,
  manufacturingLocation,
  producingDate,
  expirationDate,
  batch
) {
  // Defensive: ensure all values are defined and valid
  const parsedProductId = typeof productId === 'string' ? parseInt(productId, 10) : Number(productId);
  const parsedProducingDate = typeof producingDate === 'string' ? parseInt(producingDate, 10) : Number(producingDate);
  const parsedExpirationDate = typeof expirationDate === 'string' ? parseInt(expirationDate, 10) : Number(expirationDate);
  const safeProductName = productName ?? '';
  const safeSku = sku ?? '';
  const safeGtin = gtin ?? '';
  const safeIngredients = typeof ingredients === 'string' ? ingredients : (Array.isArray(ingredients) ? ingredients.join(',') : '');
  const safeCertifications = typeof certifications === 'string' ? certifications : (Array.isArray(certifications) ? certifications.join(',') : '');
  const safeManufacturerName = manufacturerName ?? '';
  const safeManufacturingLocation = manufacturingLocation ?? '';
  const safeBatch = batch ?? '';

  // Log all arguments for debugging
  console.log('[createNewProduct] Args:', {
    parsedProductId,
    safeProductName,
    safeSku,
    safeGtin,
    safeIngredients,
    safeCertifications,
    safeManufacturerName,
    safeManufacturingLocation,
    parsedProducingDate,
    parsedExpirationDate,
    safeBatch
  });

  if (
    isNaN(parsedProductId) ||
    isNaN(parsedProducingDate) ||
    isNaN(parsedExpirationDate)
  ) {
    throw new Error('Invalid productId or date values for contract call');
  }

  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "create-product",
    functionArgs: [
      uintCV(parsedProductId),
      stringUtf8CV(safeProductName),
      stringAsciiCV(safeSku),
      stringAsciiCV(safeGtin),
      stringUtf8CV(safeIngredients),
      stringUtf8CV(safeCertifications),
      stringUtf8CV(safeManufacturerName),
      stringUtf8CV(safeManufacturingLocation),
      uintCV(parsedProducingDate),
      uintCV(parsedExpirationDate),
      stringAsciiCV(safeBatch)
    ],
  };
  return txOptions;
}

export async function joinGame(gameId, moveIndex, move) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "join-game",
    functionArgs: [uintCV(gameId), uintCV(moveIndex), uintCV(move)],
  };

  return txOptions;
}

export async function play(gameId, moveIndex, move) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "play",
    functionArgs: [uintCV(gameId), uintCV(moveIndex), uintCV(move)],
  };

  return txOptions;
}