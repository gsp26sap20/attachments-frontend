import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnalyticalTable } from "@ui5/webcomponents-react/AnalyticalTable";
import { Title } from "@ui5/webcomponents-react/Title";
import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarSpacer } from "@ui5/webcomponents-react/ToolbarSpacer";
import { getAttachmentAuditsQueryOptions } from "../options/query";

const auditColumns = [
  {
    Header: "Action",
    accessor: "Action",
  },
  {
    Header: "Note",
    accessor: "Note",
  },
  {
    Header: "Performed By",
    accessor: "Ernam",
  },
  {
    Header: "Performed On",
    accessor: "Erdat",
  },
  {
    Header: "Performed At",
    accessor: "Erzet",
  },
];

export function AttachmentAudit({ fileId }: { fileId: string }) {
  const { data: auditsData, isFetching: isAuditsFetching } = useQuery(
    getAttachmentAuditsQueryOptions(fileId, {
      "sap-client": 324,
      $count: true,
      $select: "Action,Erdat,Ernam,Erzet,FileId,Note,Uname",
      $skip: 0,
      $top: 10,
    }),
  );

  const audits = auditsData?.value ?? [];

  const memoizedAuditColumns = React.useMemo(() => auditColumns, []);

  return (
    <AnalyticalTable
      header={
        <Toolbar className="py-2 px-4 rounded-t-xl">
          <Title level="H4">
            Audit{" "}
            {auditsData?.["@odata.count"]
              ? `(${auditsData["@odata.count"]})`
              : ""}
          </Title>
          <ToolbarSpacer />
        </Toolbar>
      }
      data={audits}
      columns={memoizedAuditColumns}
      loading={isAuditsFetching}
      rowHeight={36}
      selectionMode="None"
      visibleRows={10}
      sortable
      groupable
      scaleWidthMode="Smart"
    />
  );
}
