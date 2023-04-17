import AWSAppSyncClient  from "aws-appsync";

const HTTP_URL = "https://7tyxu6ywgfdcneb4yzs76o2eyy.appsync-api.eu-central-1.amazonaws.com/graphql";
const API_KEY = "da2-gl6t4hwaibe5xkfhjuk5srj6qe";

export default function(token: string) {
  return new AWSAppSyncClient({
    url: HTTP_URL,
    region: "eu-central-1",
    auth: {
      type: "AWS_LAMBDA",
      token: token,
    },
  })
};
