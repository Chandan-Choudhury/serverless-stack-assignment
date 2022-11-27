import AWS from "aws-sdk";

export async function handler() {
  var regionNames = [
    // Enabled region in my AWS account
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
    "ap-south-1",
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-northeast-3",
    "ap-southeast-1",
    "ap-southeast-2",
    "ca-central-1",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "eu-north-1",
    "sa-east-1",
  ];

  regionNames.forEach(function (region) {
    getInstances(region);
  });

  function getInstances(region: any) {
    var regionName = region;
    var info = {
      region: "",
    };
    info.region = regionName;
    // console.log("Region: " + info.region);
    var EC2 = new AWS.EC2(info);
    var params = {};
    EC2.describeInstances(params, function (err: any, data: any) {
      var Ids: any = [];
      if (err) {
        return console.log("Error", err);
      }
      data.Reservations.forEach(function (reservation: any) {
        var localData = {
          InstanceName: "", // Name of the instance
          InstanceId: "", // Instance ID
          State: "", // State of the instance.
          InstanceType: "", // Type of instance (t2.micro).
          KeyName: "", // Pem file name.
          AvailabilityZone: "", // Object contains availability zone.
          LaunchTime: "", // Time when instance was launched.
          PublicIpAddress: "", // Public IP address of the instance.
          Region: "", // Region of the instance.
        };

        reservation.Instances.forEach(function (instance: any) {
          if (instance.InstanceId[0] !== undefined) {
            localData.InstanceName = instance.Tags[0].Value;
            localData.InstanceId = instance.InstanceId;
            localData.State = instance.State.Name;
            localData.InstanceType = instance.InstanceType;
            localData.KeyName = instance.KeyName;
            localData.AvailabilityZone = instance.Placement.AvailabilityZone;
            localData.LaunchTime = instance.LaunchTime.toISOString();
            localData.PublicIpAddress = instance.PublicIpAddress;
            localData.Region = regionName;
            Ids.push(localData);
          }
        });
      });
      // console.log("Data from ec2 instances", Ids);
      putItemIntoTable(Ids);
    });
  }
  function putItemIntoTable(data: any) {
    // console.log("Data from ec2 instances in put function", data);
    // AWS.config.update({ region: "ap-south-1" });
    var dynamodb = new AWS.DynamoDB();
    data.forEach(function (item: any) {
      var params = {
        TableName: "EC2_Data",
        Item: {
          InstanceId: { S: item.InstanceId },
          InstanceName: { S: item.InstanceName },
          State: { S: item.State },
          InstanceType: { S: item.InstanceType },
          KeyName: { S: item.KeyName },
          AvailabilityZone: { S: item.AvailabilityZone },
          LaunchTime: { S: item.LaunchTime },
          PublicIpAddress: { S: item.PublicIpAddress },
          Region: { S: item.Region },
          LastSyncedAt: { S: new Date().toISOString() },
        },
      };
      dynamodb.putItem(params, function (err: any) {
        if (err) {
          console.log("Error", err);
        } else {
          const timestamp = new Date();
          console.log("Success at", String(timestamp));
        }
      });
    });
  }
}
