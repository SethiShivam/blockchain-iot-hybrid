package main

// import
import (
	"fmt"
//	"time"
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
//	"errors"
//	"strings"
	pb "github.com/hyperledger/fabric/protos/peer"
)

// constant declaration
// TEST
// {"lat":46.5546,"long":109.7436,"x":0.9925836514873132,"y":0.8536322205794464,"label":"DlYK9","probe":0.23088599739025906}
const prefixTemparature = "temparature";

// Data
// Temp
type temparature struct {
	UUID     	string   	`json:"uuid"`
	Latlong     float32   	`json:"latlong"`
	Longitude   float32   	`json:"longiture"`
	XAux     	float32   	`json:"x_aux"`
	YAux      	float32   	`json:"y_aux"`
	Label   	string 	  	`json:"label"`
	Probe   	float32 	`json:"probe"`
} 

// log
var logger = shim.NewLogger("main")

// chaincode initialization
type SmartContract struct {

}

// Methods
var smartContractMethods = map[string]func(shim.ChaincodeStubInterface, []string) pb.Response{
	// Temp Data
	"store_temp": storeTemp,
	"list_temp": listTemp,
}	

// Initialization
func (t *SmartContract) Init(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Printf("SmartContract : Init")
	return shim.Success(nil)
}

// Invocation
func (t *SmartContract) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()

	if function == "init" {
		return t.Init(stub)
	}
	_smartContractMethod := smartContractMethods[function]
	if _smartContractMethod == nil {
		return shim.Error("Invalid invoke function requested.")
	}
	return _smartContractMethod(stub, args)
}

// store Temp
func storeTemp(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	// 
	if len(args) != 1 {
		return shim.Error("Invalid argument count.")
	}
	//
	temparature := temparature{}
	err := json.Unmarshal([]byte(args[0]), &temparature)
	if err != nil {
		return shim.Error(err.Error())
	}

	key, err := stub.CreateCompositeKey(prefixTemparature, []string{temparature.UUID})
	if err != nil {
		return shim.Error(err.Error())
	}

	// Check if the temparature already exists
	tempratureAsBytes, _ := stub.GetState(key)
	
	// temparature does not exist, attempting creation
	if len(tempratureAsBytes) == 0 {
		tempratureAsBytes, err = json.Marshal(temparature)
		if err != nil {
			return shim.Error(err.Error())
		}

		err = stub.PutState(key, tempratureAsBytes)
		if err != nil {
			return shim.Error(err.Error())
		}

		// Return nil, if temparature is newly created
		return shim.Success(nil)
	}

	err = json.Unmarshal(tempratureAsBytes, &temparature)
	if err != nil {
		return shim.Error(err.Error())
	}

	// 
	return shim.Success(nil)
}

// list Temp
func listTemp(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	resultsIterator, err := stub.GetStateByPartialCompositeKey(prefixTemparature, []string{})
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	results := []interface{}{}
	for resultsIterator.HasNext() {
		kvResult, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		temparature := temparature{}
		err = json.Unmarshal(kvResult.Value, &temparature)
		if err != nil {
			return shim.Error(err.Error())
		}
		
		result := struct {
			UUID     	string   	`json:"uuid"`
			Latlong     float32   	`json:"latlong"`
			Longitude   float32   	`json:"longiture"`
			XAux     	float32   	`json:"x_aux"`
			YAux      	float32   	`json:"y_aux"`
			Label   	string 	  	`json:"label"`
			Probe   	float32 	`json:"probe"`	
		}{}
		err = json.Unmarshal(kvResult.Value, &result)
		if err != nil {
			return shim.Error(err.Error())
		}
		//
		results = append(results, result)
	}

	resultsAsBytes, err := json.Marshal(results)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(resultsAsBytes)
}

// chaincode execution start from here
func main() {
	logger.SetLevel(shim.LogInfo)

	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
