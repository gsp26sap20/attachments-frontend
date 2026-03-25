import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { DynamicPage } from '@ui5/webcomponents-react/DynamicPage';
import { DynamicPageHeader } from '@ui5/webcomponents-react/DynamicPageHeader';
import { DynamicPageTitle } from '@ui5/webcomponents-react/DynamicPageTitle';
import { AnalyticalTable } from '@ui5/webcomponents-react/AnalyticalTable';
import type { AnalyticalTableColumnDefinition } from '@ui5/webcomponents-react/AnalyticalTable';
import { Toolbar } from '@ui5/webcomponents-react/Toolbar';
import { ToolbarButton } from '@ui5/webcomponents-react/ToolbarButton';
import { ToolbarSpacer } from '@ui5/webcomponents-react/ToolbarSpacer';
import { Title } from '@ui5/webcomponents-react/Title';
import { Icon } from '@ui5/webcomponents-react/Icon';
import { FlexBox } from '@ui5/webcomponents-react/FlexBox';
import { BusyIndicator } from '@ui5/webcomponents-react/BusyIndicator';
import { MessageStrip } from '@ui5/webcomponents-react/MessageStrip';
import { IllustratedMessage } from '@ui5/webcomponents-react/IllustratedMessage';
import '@ui5/webcomponents-fiori/dist/illustrations/NoData.js';
import '@ui5/webcomponents-icons/refresh.js';
import '@ui5/webcomponents-icons/navigation-left-arrow.js';
import '@ui5/webcomponents-icons/document.js';
import { getBizObjectLinkedAttachmentsQueryOptions } from '@/features/biz-object/options/query';

type LinkedAttachmentRow = {
	Title: string;
	FileId: string;
	CurrentVersion: string;
	IsActive: boolean;
	LinkedOn: string;
	LinkedBy: string;
	AttachmentCreatedOn: string;
};

const columns: AnalyticalTableColumnDefinition[] = [
	{ Header: 'Title', accessor: 'Title', width: 280 },
	{ Header: 'File ID', accessor: 'FileId', width: 290 },
	{ Header: 'Version', accessor: 'CurrentVersion', width: 110 },
	{
		Header: 'Status',
		accessor: 'IsActive',
		width: 120,
		Cell: ({ value }: any) => (
			<span
				className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
					value ? 'border-emerald-500/25 bg-emerald-500/15 text-emerald-700' : 'border-slate-500/25 bg-slate-500/15 text-slate-700'
				}`}
			>
				{value ? 'Active' : 'Inactive'}
			</span>
		),
	},
	{ Header: 'Linked On', accessor: 'LinkedOn', width: 170 },
	{ Header: 'Linked By', accessor: 'LinkedBy', width: 140 },
	{ Header: 'Attachment Created', accessor: 'AttachmentCreatedOn', width: 180 },
];

function formatDate(date?: string | null, time?: string | null) {
	if (!date && !time) return '-';
	if (!date) return time || '-';
	if (!time) return date;
	return `${date} ${time}`;
}

export function BoWListAttchmentView() {
	const navigate = useNavigate();
	const params = useParams<{ boId: string }>();
	const boId = params.boId || '';

	const { data, isFetching, isLoading, error, refetch } = useQuery(
		getBizObjectLinkedAttachmentsQueryOptions(boId, {
			'sap-client': 324,
			$expand: '_Links($expand=_Attach)',
		}),
	);

	const linkedAttachments = React.useMemo<LinkedAttachmentRow[]>(() => {
		return (data?._Links ?? []).map((link) => {
			const attachment = link._Attach;

			return {
				Title: attachment.Title,
				FileId: attachment.FileId,
				CurrentVersion: attachment.CurrentVersion,
				IsActive: attachment.IsActive,
				LinkedOn: formatDate(link.Erdat, link.Erzet),
				LinkedBy: link.Ernam || '-',
				AttachmentCreatedOn: formatDate(attachment.Erdat, attachment.Erzet),
			};
		});
	}, [data]);

	const activeCount = linkedAttachments.filter((item) => item.IsActive).length;
	const inactiveCount = linkedAttachments.length - activeCount;

	return (
		<DynamicPage
			titleArea={
				<DynamicPageTitle
					className="p-3"
					heading={
						<div className="flex items-center gap-3">
							<span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600/10 text-sky-700">
								<Icon name="document" />
							</span>
							<div>
								<div className="text-lg font-semibold text-slate-900">Linked Attachments</div>
								<div className="text-sm text-slate-500">Attachments linked to BO {boId || '-'}</div>
							</div>
						</div>
					}
					style={{ minHeight: '0px' }}
				/>
			}
			headerArea={
				<DynamicPageHeader>
					<div className="p-4">
						<div className="rounded-3xl border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.92))] p-4 shadow-sm">
							<div className="grid gap-4 md:grid-cols-3">
								<div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
									<div className="text-xs uppercase tracking-[0.2em] text-slate-500">Linked attachments</div>
									<div className="mt-2 text-3xl font-semibold text-slate-900">{linkedAttachments.length}</div>
								</div>
								<div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
									<div className="text-xs uppercase tracking-[0.2em] text-slate-500">Active</div>
									<div className="mt-2 text-3xl font-semibold text-slate-900">{activeCount}</div>
								</div>
								<div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
									<div className="text-xs uppercase tracking-[0.2em] text-slate-500">Inactive</div>
									<div className="mt-2 text-3xl font-semibold text-slate-900">{inactiveCount}</div>
								</div>
							</div>

							<Toolbar className="mt-4 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm">
								<Title level="H2">BO Attachment List</Title>
								<ToolbarSpacer />
								<ToolbarButton design="Transparent" icon="navigation-left-arrow" text="Back to BO" onClick={() => navigate('/BO')} />
								<ToolbarButton design="Transparent" icon="refresh" text="Refresh" onClick={() => refetch()} />
							</Toolbar>
						</div>
					</div>
				</DynamicPageHeader>
			}
			style={{
				height: '100dvh',
				overflow: 'hidden',
				position: 'relative',
				background: 'linear-gradient(180deg,rgba(242,247,251,0.98) 0%,rgba(231,240,248,0.98) 100%)',
			}}
		>
			<div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4 p-4">
				{error ? (
					<MessageStrip design="Negative" hideCloseButton>
						{error instanceof Error ? error.message : 'Cannot load linked attachments.'}
					</MessageStrip>
				) : null}

				<div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
					{linkedAttachments.length > 0 ? (
						<AnalyticalTable
							data={linkedAttachments}
							columns={columns}
							sortable
							groupable
							selectionMode="None"
							loading={isFetching || isLoading}
							visibleRowCountMode="Auto"
							rowHeight={44}
							scaleWidthMode="Smart"
							noDataText="No attachments linked to this BO."
							style={{ height: '100%' }}
						/>
					) : (
						<div className="grid h-full place-items-center p-10">
							<IllustratedMessage name="NoData" />
						</div>
					)}
				</div>
			</div>

			{isLoading ? (
				<FlexBox alignItems="Center" justifyContent="Center" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
					<BusyIndicator delay={0} active size="L" />
				</FlexBox>
			) : null}
		</DynamicPage>
	);
}
