import Instance from "../Instance";
import listInstances from "../listInstances";
import getInstanceByInstanceId from "../getInstanceByInstanceId";
import getInstanceByName from "../getInstanceByName";
import getInstanceByState from "../getInstanceByState";
import getInstanceByType from "../getInstanceByType";
import getInstanceByKeyName from "../getInstanceByKeyName";
import getInstanceByZone from "../getInstanceByZone";
import getInstanceByLaunchTime from "../getInstanceByLaunchTime";
import getInstanceByPublicIpAddress from "../getInstanceByPublicIpAddress";
import getInstanceByRegion from "../getInstanceByRegion";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    instance: Instance;
    InstanceId: string;
    InstanceName: string;
    InstanceState: string;
    InstanceType: string;
    KeyName: string;
    AvailabilityZone: string;
    LaunchTime: string;
    PublicIpAddress: string;
    InstanceRegion: string;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | Instance | string | null | undefined> {
  switch (event.info.fieldName) {
    case "listInstances":
      return await listInstances();
    case "getInstanceByInstanceId":
      return await getInstanceByInstanceId(event.arguments.InstanceId);
    case "getInstanceByName":
      return await getInstanceByName(event.arguments.InstanceName);
    case "getInstanceByState":
      return await getInstanceByState(event.arguments.InstanceState);
    case "getInstanceByType":
      return await getInstanceByType(event.arguments.InstanceType);
    case "getInstanceByKeyName":
      return await getInstanceByKeyName(event.arguments.KeyName);
    case "getInstanceByZone":
      return await getInstanceByZone(event.arguments.AvailabilityZone);
    case "getInstanceByLaunchTime":
      return await getInstanceByLaunchTime(event.arguments.LaunchTime);
    case "getInstanceByPublicIpAddress":
      return await getInstanceByPublicIpAddress(
        event.arguments.PublicIpAddress
      );
    case "getInstanceByRegion":
      return await getInstanceByRegion(event.arguments.InstanceRegion);
    default:
      return null;
  }
}
