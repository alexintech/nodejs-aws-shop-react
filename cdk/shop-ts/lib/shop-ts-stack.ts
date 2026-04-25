import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as cdk from "aws-cdk-lib/core";
import { CfnOutput } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import path from "path";

export class ShopTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket
    const websiteBucket = new s3.Bucket(this, "shop-bucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      // removalPolicy: RemovalPolicy.DESTROY,
      // autoDeleteObjects: true,
    });

    new CfnOutput(this, "Bucket", { value: websiteBucket.bucketName });
    new CfnOutput(this, "StaticSiteUrl", {
      value: websiteBucket.bucketWebsiteUrl,
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "SiteDistribution", {
      defaultBehavior: {
        origin: new cloudfront_origins.S3StaticWebsiteOrigin(websiteBucket),
      },
    });

    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    new CfnOutput(this, "CloudFrontUrl", {
      value: distribution.distributionDomainName,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../../../dist"))],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
