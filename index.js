const EC = require('elliptic').ec;
const ec = new EC('curve25519'); // curve

// alice and bob's keys
const aliceKey = ec.genKeyPair(); // generate key pair
const bobKey = ec.genKeyPair(); // generate key pair

// generate shared keys
const aliceSharedKey = aliceKey.derive(bobKey.getPublic());
const bobSharedKey = bobKey.derive(aliceKey.getPublic());

console.log(aliceSharedKey.toString(16));
console.log(bobSharedKey.toString(16));