import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";

const client = new RDSDataClient({ region: process.env.AWS_REGION });

export async function executeSQL<T = any>(
  sql: string,
  parameters?: { name: string; value: any }[]
): Promise<T[]> {
  const resp = await client.send(new ExecuteStatementCommand({
    resourceArn:           process.env.AURORA_CLUSTER_ARN!,
    secretArn:             process.env.AURORA_SECRET_ARN!,
    database:              process.env.DB_NAME!,
    sql,
    parameters,
    includeResultMetadata: true,
  }));

  const cols    = resp.columnMetadata ?? [];
  const records = resp.records         ?? [];

  return records.map(row => {
    const obj: any = {};
    row.forEach((field, idx) => {
      const name = cols[idx]?.name ?? `col${idx}`;
      obj[name]  =
        field.stringValue ??
        field.longValue  ??
        field.booleanValue ??
        field.doubleValue ??
        null;
    });
    return obj as T;
  });
}