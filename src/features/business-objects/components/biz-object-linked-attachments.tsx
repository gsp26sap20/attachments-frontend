import * as React from 'react';
import { Link } from 'react-router';
import { Bar } from '@ui5/webcomponents-react/Bar';
import { Title } from '@ui5/webcomponents-react/Title';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@ui5/webcomponents-react/Button';
import { Toolbar } from '@ui5/webcomponents-react/Toolbar';
import { ToolbarSpacer } from '@ui5/webcomponents-react/ToolbarSpacer';
import { bizObjectLinkedAttachmentsQueryOptions } from '../options/query';
import { AnalyticalTable } from '@ui5/webcomponents-react/AnalyticalTable';
import type { AnalyticalTableCellInstance } from '@ui5/webcomponents-react/AnalyticalTable';

type BizObjectLinkedAttachmentsProps = {
  boId: string;
  disable?: boolean;
};

const rawColumns = [
  {
    Header: 'Attachment ID',
    accessor: '_Attach.FileId',
    Cell: (props: AnalyticalTableCellInstance) => (
      <Link to={`/attachments/${props.value}`} className="text-primary hover:underline cursor-pointer">
        {props.value}
      </Link>
    ),
  },
  {
    Header: 'Title',
    accessor: '_Attach.Title',
  },
  {
    Header: 'Version',
    accessor: '_Attach.CurrentVersion',
  },
  {
    Header: 'Is Active',
    accessor: '_Attach.IsActive',
    Cell: (props: AnalyticalTableCellInstance) => (props.value ? 'Yes' : 'No'),
  },
  {
    Header: 'Linked At',
    Cell: (props: AnalyticalTableCellInstance) => `${props.row.original.Erdat} ${props.row.original.Erzet}`,
  },
  {
    Header: 'Linked By',
    accessor: 'Ernam',
  },
];

export function BizObjectLinkedAttachments({ boId, disable }: BizObjectLinkedAttachmentsProps) {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    bizObjectLinkedAttachmentsQueryOptions(boId, {
      'sap-client': 324,
      $count: true,
      $expand: '_Attach',
      $skip: 0,
      $top: 5,
    }),
  );

  const linkedAttachments = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.value) ?? [];
  }, [data?.pages]);
  const totalCount = data?.pages[0]['@odata.count'] ?? 0;

  const columns = React.useMemo(
    () => [
      ...rawColumns,
      {
        Header: 'Actions',
        Cell: (props: AnalyticalTableCellInstance) => (
          <Button
            design="Negative"
            className="h-6.5"
            onClick={(e) => {
              e.stopPropagation();
              alert(props.row.original.FileId);
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <AnalyticalTable
        data={linkedAttachments}
        columns={columns}
        loading={isFetching || isFetchingNextPage}
        rowHeight={36}
        selectionMode="None"
        visibleRows={10}
        sortable
        groupable
        scaleWidthMode="Smart"
        header={
          <Toolbar className="py-2 px-4 rounded-t-xl">
            <Title level="H4">Attachments {totalCount ? `(${totalCount})` : ''}</Title>
            <ToolbarSpacer />
            <Button design="Transparent" onClick={() => {}} disabled={!boId || disable} className="h-8">
              Create new Link
            </Button>
          </Toolbar>
        }
      />
      {hasNextPage && (
        <Bar>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            More [{linkedAttachments.length}/{totalCount}]
          </Button>
        </Bar>
      )}
    </>
  );
}
