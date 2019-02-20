# Insurance DApp


#### Empowering Insurance industry by leveraging Blockchain Technology

> The potential for blockchain to deliver substantial value to financial services is enormous.

> Not only does blockchain offer the promise of cost reduction and efficiency, but it could also enable revenue growth, as insurers attract new business through higher-quality service.

> Blockchain technologies can help the wholesale insurance sector fulfil its role in underpinning the global economy more effectively. Just as blockchain is being pursued as a force for positive change in other areas of society – from identification for refugees to better public service delivery – it can also help wholesale insurance to discharge its responsibilities for the common good.

#### Blockchain Technology

“The blockchain is an incorruptible digital ledger of economic transactions that can be programmed to record not just financial transactions but virtually everything of value.”

"Blockchain technology is like the internet in that it has a built-in robustness. By storing blocks of information that are identical across its network, the blockchain cannot:
  - Be controlled by any single entity.
  - Has no single point of failure.

"Bitcoin was invented in 2008. Since that time, the Bitcoin blockchain has operated without significant disruption. (To date, any of problems associated with Bitcoin have been due to hacking or mismanagement. In other words, these problems come from bad intention and human error, not flaws in the underlying concepts.)"

# Hyperledger Fabric!
    Hyperledger Fabric is a blockchain framework implementation and one of the Hyperledger projects hosted by The Linux Foundation.
    
    Hyperledger Fabric is a platform for distributed ledger solutions underpinned by a modular architecture delivering high degrees of confidentiality, resiliency, flexibility and scalability. It is designed to support pluggable implementations of different components and accommodate the complexity and intricacies that exist across the economic ecosystem.

### Setup instructions :

DApp uses a number of open source technoglogy to build properly:

* [Node](https://nodejs.org/en/) - HTML enhanced for web apps!
* [Docker](https://www.docker.com/) - awesome web-based text editor
* [Docker compose](https://docs.docker.com/compose/) - Markdown parser done right. Fast and easy to extend.

### Installation

Clong repository...

```sh
mahendra@detominuntsrc:~/n$ git clone https://easypay-mahendra@bitbucket.org/easypay-mahendra/insurance-dapp.git
Cloning into 'insurance-dapp'...
Password for 'https://easypay-mahendra@bitbucket.org':mahendra@123
remote: Counting objects: 240, done.
remote: Compressing objects: 100% (199/199), done.
remote: Total 240 (delta 57), reused 188 (delta 29)
Receiving objects: 100% (240/240), 1.49 MiB | 837.00 KiB/s, done.
Resolving deltas: 100% (57/57), done.
```

Install the dependencies and devDependencies...

```sh
mahendra@detominuntsrc:~/n$ cd insurance-dapp/smart-insurance-web/
mahendra@detominuntsrc:~/n/insurance-dapp/smart-insurance-web$ dir
app  client  controller.js  erl_crash.dump  package.json  package-lock.json  README.md  registerAdmin.js  registerUser.js  routes.js  run-dapp-insurance.sh  server.js  src
mahendra@detominuntsrc:~/n/insurance-dapp/smart-insurance-web$ npm install
npm WARN ajv-keywords@3.1.0 requires a peer of ajv@^6.0.0 but none was installed.
npm WARN Fabric-tuna-app@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.1.3 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 2567 packages in 185.883s
```
Start server...
```sh
mahendra@detominuntsrc:~/n/insurance-dapp/smart-insurance-web$ sudo ./run-dapp-insurance.sh
.
.
. you will see here logs
.
[27/02/2018 12:13:40.506] [LOG]   DApp environment : development
[27/02/2018 12:13:40.513] [LOG]   Live on port: 8000
```
### Access DApp page url <domain/ip>:8000
### Access CouchDB url <domain/ip>:5984/_utils/#_all_dbs

## 	Admin credential details
#### 	Admin insurance credential
		emailId  : admin@insurance.com
		password : test
#### 	Police
		emailId  : admin@police.com
		password : test
####   Service center
		emailId  : admin@servicecenter.com
		password : test
   
   

### Due to IPFS internet disconnection issue we are disable ipfs temporarily
### To disable IPFS 
#### ~/ go to private-nework directory

#### open start.sh file
```sh
#
#
# docker-compose -f docker-compose.yml up -d ipfs ca.example.com orderer.example.com peer0.org1.example.com couchdb 	//	< Only comment this line while running in local, uncomment while running in production >
docker-compose -f docker-compose.yml up -d ca.example.com orderer.example.com peer0.org1.example.com couchdb 		//	< Only comment this line while running in production, uncomment while running in local >
```
// End section _to disable IPFS
   
   
   
   ![alt text](https://easypay.in/wp-content/uploads/2016/04/EasyPay_Logo.png)
