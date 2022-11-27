# SST App for fetching data of EC2 Instances across all regions

## Setup project & run on local machine

#### 1. Clone the repository :

```
git clone https://github.com/Chandan-Choudhury/serverless-stack-assignment.git
```

#### 2. Setup npm :

```
npm i
```

#### 3. Setup AWS CLI (Reference Link) :

```
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```

#### 4. Configure AWS CLI (Provide AWS Access Key ID, AWS Secret Access Key & Default region) :

```
aws configure
```

#### 5. Run the project in local :

```
npm start
```

#### 6. Test all stacks, functions, APIs on SST Consloe on browser with URL :

```
console.sst.dev
```

### Some GraphQL Queries to test :

#### 1. Fetch all data from table :

```
query listInstances {
  listInstances{
    InstanceId
    InstanceName
    InstanceState
    InstanceType
    KeyName
    AvailabilityZone
    LaunchTime
    PublicIpAddress
    InstanceRegion
  }
}
```

#### 2. Fetch instance data by InstanceID :

```
query getInstancesByInstanceId {
  getInstanceByInstanceId(InstanceId: "i-07654797b9d8f4de1") {
    InstanceId
    InstanceName
    InstanceState
    InstanceType
    KeyName
    AvailabilityZone
    LaunchTime
    PublicIpAddress
    InstanceRegion
  }
}
```

#### 3. Fetch instance data by InstanceName :

```
query getInstanceByName {
  getInstanceByName(InstanceName: "Testing in Mumbai") {
    InstanceId
    InstanceName
    InstanceState
    InstanceType
    KeyName
    AvailabilityZone
    LaunchTime
    PublicIpAddress
    InstanceRegion
  }
}
```

#### 4. Fetch instance data by InstanceState :

```
query getInstanceByState{
  getInstanceByState(InstanceState: "running") {
    InstanceId
    InstanceName
    InstanceState
    InstanceType
    KeyName
    AvailabilityZone
    LaunchTime
    PublicIpAddress
    InstanceRegion
  }
}
```

#### 5. Fetch instance data by InstanceRegion :

```
query getInstanceByRegion{
  getInstanceByRegion(InstanceRegion: "ap-south-1") {
    InstanceId
    InstanceName
    InstanceState
    InstanceType
    KeyName
    AvailabilityZone
    LaunchTime
    PublicIpAddress
    InstanceRegion
  }
}
```
