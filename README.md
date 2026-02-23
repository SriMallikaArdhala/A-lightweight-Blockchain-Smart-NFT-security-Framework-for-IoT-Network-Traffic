[IoT_Blockchain_NFT_Security_PPT.pptx](https://github.com/user-attachments/files/25492185/IoT_Blockchain_NFT_Security_PPT.pptx)
IoT devices such as smart sensors, industrial controllers, and connected medical devices continuously generate large volumes of network traffic.
When a cyberattack occurs, these traffic logs become critical digital evidence for investigation and auditing.
However, IoT devices usually have limited memory, low processing power, and constrained battery capacity. 
Traditional security mechanisms that use heavy encryption and full blockchain storage are not suitable for such environments because they increase computational load and storage overhead.
So we felt there should be a lightweight and efficient framework that can secure IoT traffic logs without overburdening the devices.

To address this, we developed a system called a Lightweight Blockchain and Smart NFT-Based Security Framework for IoT Network Traffic. 
The system works after attack detection. Once malicious or suspicious traffic is identified, the traffic records are first preprocessed and then compressed to reduce data size. 
Next, the logs are encrypted using lightweight cryptographic encyption alogirthm to ensure confidentiality. 
After encryption,  Network supported digital signatures are generated to guarantee integrity and authenticity. 
Instead of storing full data on-chain, only cryptographic hashes are stored in a lightweight blockchain structure using hash chaining and Merkle roots. 
Each secured traffic record is then associated with a Smart NFT that defines ownership and role-based access control for Admin, Data Owner, Authorized User, and Auditor.

We also designed an interactive dashboard that provides visualization of traffic statistics, encryption performance, blockchain records, and access logs. 
This system is not meant to replace intrusion detection systems but to securely preserve and manage digital evidence after attacks occur. 
It is especially useful for smart factories, healthcare IoT systems, cloud environments, and smart city infrastructures where secure, tamper-proof, and resource-efficient log management is essential.
