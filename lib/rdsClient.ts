import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";

const client = new RDSDataClient({ region: process.env.AWS_REGION });

export async function executeSQL<T = any>(
  sql: string,
  parameters?: { name: string; value: any }[]
) {
  const resp = await client.send(new ExecuteStatementCommand({
    resourceArn: process.env.AURORA_CLUSTER_ARN,
    secretArn:   process.env.AURORA_SECRET_ARN,
    database:    process.env.DB_NAME,
    sql,
    parameters,
  }));
  return resp.records as T[];
}
