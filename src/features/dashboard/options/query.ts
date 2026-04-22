import { ODATA_SERVICE } from '@/app-constant';
import type { DashboardCollection } from '../types';
import { queryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios-instance';
import { API, DASHBOARD_QUERY_PARAMS, QUERY_KEYS } from '../constants';
import type { FileConfigOverviewItem, AttachmentOverviewItem } from '../types';
import type { ConfigOverviewItem, AuthOverviewItem, LinkOverviewItem, RecentAuditLogItem } from '../types';
import type { AdminDashboardStatsItem, AttachmentStatsByTypeItem, BusinessObjectOverviewItem } from '../types';

function fetchDashboardCollection<T>(endpoint: string, params: Record<string, string | number>) {
  return axiosInstance.get<DashboardCollection<T>>(`${ODATA_SERVICE.DASHBOARD}${endpoint}`, {
    params,
  });
}

export function dashboardAdminDashboardStatsQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.adminDashboardStats(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<AdminDashboardStatsItem>(
        API.adminDashboardStats,
        DASHBOARD_QUERY_PARAMS.adminDashboardStats,
      );

      return res.value[0] ?? null;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardAttachmentOverviewQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.attachmentOverview(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<AttachmentOverviewItem>(
        API.attachmentOverview,
        DASHBOARD_QUERY_PARAMS.attachmentOverview,
      );

      return res.value[0] ?? null;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardAttachmentStatsByTypeQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.attachmentStatsByType(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<AttachmentStatsByTypeItem>(
        API.attachmentStatsByType,
        DASHBOARD_QUERY_PARAMS.attachmentStatsByType,
      );

      return res.value;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardAuthOverviewQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.authOverview(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<AuthOverviewItem>(
        API.authOverview,
        DASHBOARD_QUERY_PARAMS.authOverview,
      );

      return res.value[0] ?? null;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardBusinessObjectOverviewQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.businessObjectOverview(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<BusinessObjectOverviewItem>(
        API.businessObjectOverview,
        DASHBOARD_QUERY_PARAMS.businessObjectOverview,
      );

      return res.value[0] ?? null;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardConfigOverviewQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.configOverview(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<ConfigOverviewItem>(
        API.configOverview,
        DASHBOARD_QUERY_PARAMS.configOverview,
      );

      return res.value[0] ?? null;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardFileConfigListQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.fileConfigList(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<FileConfigOverviewItem>(
        API.fileConfigList,
        DASHBOARD_QUERY_PARAMS.fileConfigList,
      );

      return res.value;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardLinkOverviewQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.linkOverview(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<LinkOverviewItem>(
        API.linkOverview,
        DASHBOARD_QUERY_PARAMS.linkOverview,
      );

      return res.value[0] ?? null;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function dashboardRecentAuditLogsQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.recentAuditLogs(),
    queryFn: async () => {
      const res = await fetchDashboardCollection<RecentAuditLogItem>(
        API.recentAuditLogs,
        DASHBOARD_QUERY_PARAMS.recentAuditLogs,
      );

      return res.value;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
