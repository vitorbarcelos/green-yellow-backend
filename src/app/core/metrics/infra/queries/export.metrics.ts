export const ExportMetricsSQL = `
SELECT DISTINCT
  "M"."metric_id" AS "metricId",
  TO_CHAR("M"."date_time", 'DD/MM/YYYY') AS date,
  "Day".value AS "aggregatedDay",
  "Month".value AS "aggregatedMonth",
  "Year".value AS "aggregatedYear"
FROM "Metrics" AS "M"
  RIGHT JOIN (SELECT "MetricsDay"."metric_id" AS metricId, TO_CHAR("MetricsDay"."date_time", 'YYYY-MM-DD') AS date, SUM("MetricsDay".value) AS value
  FROM "Metrics" AS "MetricsDay" GROUP BY "MetricsDay"."metric_id", TO_CHAR("MetricsDay"."date_time", 'YYYY-MM-DD')) AS "Day"
  ON  "M"."metric_id" = "Day".metricId AND TO_CHAR( "M"."date_time", 'YYYY-MM-DD') = "Day".date
  RIGHT JOIN (SELECT "MetricsMonth"."metric_id" AS metricId, TO_CHAR("MetricsMonth"."date_time", 'YYYY-MM') AS date, SUM("MetricsMonth".value) AS value
  FROM "Metrics" AS "MetricsMonth" GROUP BY "MetricsMonth"."metric_id", TO_CHAR("MetricsMonth"."date_time", 'YYYY-MM')) AS "Month"
  ON  "M"."metric_id" = "Month".metricId AND TO_CHAR( "M"."date_time", 'YYYY-MM') = "Month".date
  RIGHT JOIN (
  SELECT "MetricsYear"."metric_id" AS metricId, TO_CHAR("MetricsYear"."date_time", 'YYYY') AS date, SUM("MetricsYear".value) AS value
  FROM "Metrics" AS "MetricsYear" GROUP BY "MetricsYear"."metric_id", TO_CHAR("MetricsYear"."date_time", 'YYYY')) AS "Year"
  ON  "M"."metric_id" = "Year".metricId AND TO_CHAR( "M"."date_time", 'YYYY') = "Year".date
`;
