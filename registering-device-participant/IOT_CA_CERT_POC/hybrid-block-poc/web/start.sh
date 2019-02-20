#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0
# This code is based on code written by the Hyperledger Fabric community. 
# Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/fabcar/startFabric.sh
#
# Exit on first error

set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

starttime=$(date +%s)

#
printf "\nRemoving old keys... \n\n"
rm -rf ~/.hfc-key-store/*
printf "\nRemoved '~/.hfc-key-store/*' \n\n"

#
if [ ! -d ~/.hfc-key-store/ ]; then
	mkdir ~/.hfc-key-store/
fi

# launch network; create channel and join peer to channel
cd ../private-network
./start.sh

# Now launch the CLI container in order to install, instantiate chaincode
# and prime the ledger with our 10 tuna catches
docker-compose -f ./docker-compose.yml up -d cli


#
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode install -n tempratures -v 5.0 -p github.com/hybrid-block
#
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n tempratures -v 5.0 -c '{"Args":[""]}' -P "OR ('Org1MSP.member','Org2MSP.member')"
#
sleep 10
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n tempratures -v 5.0 -c '{"function":"init","Args":[""]}'

#
printf "\nTotal execution time : $(($(date +%s) - starttime)) secs ...\n\n"

cd ../web
printf "\nChecking node installed or not..? \n\n"

if which node > /dev/null
then
    printf "\nnode is installed, enjoy programming :) \n"

	sleep 5
	printf "\n"
	node ./registerAdmin.js

	sleep 5
	printf "\n"	
	node ./registerUser.js

	sleep 5
	printf "\n application running ... \n\n "
	env TZ='Asia/India' ENV=development PORT=8000 node server.js 		# indian standard time-zone (IST)	
else
    printf "\n\nnode is not installed, visit http://nodejs.org/download"
fi

printf "\n\nAccess application on localhost:8443 \n\n"
