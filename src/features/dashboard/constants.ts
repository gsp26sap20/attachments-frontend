export const API = {
  adminDashboardStats: '/AdminDashboardStats',
  attachmentOverview: '/AttachmentOverview',
  attachmentStatsByType: '/AttachmentStatsByType',
  authOverview: '/AuthOverview',
  businessObjectOverview: '/BusinessObjectOverview',
  configOverview: '/ConfigOverview',
  fileConfigList: '/FileConfigList',
  linkOverview: '/LinkOverview',
  recentAuditLogs: '/RecentAuditLogs',
};

export const DASHBOARD_QUERY_PARAMS = {
  adminDashboardStats: {
    $top: 1,
  },
  attachmentOverview: {
    $top: 1,
  },
  attachmentStatsByType: {
    $orderby: 'TotalSize desc,VersionCount desc,FileExt asc',
  },
  authOverview: {
    $top: 1,
  },
  businessObjectOverview: {
    $top: 1,
  },
  configOverview: {
    $top: 1,
  },
  fileConfigList: {
    $orderby: 'IsActive desc,FileExt asc',
  },
  linkOverview: {
    $top: 1,
  },
  recentAuditLogs: {
    $top: 8,
    $orderby: 'Erdat desc,Erzet desc',
  },
} as const;

export const QUERY_KEYS = {
  dashboard: () => ['dashboard'],
  adminDashboardStats: () => ['dashboard', 'admin-stats'],
  attachmentOverview: () => ['dashboard', 'attachment-overview'],
  attachmentStatsByType: () => ['dashboard', 'attachment-stats-by-type'],
  authOverview: () => ['dashboard', 'auth-overview'],
  businessObjectOverview: () => ['dashboard', 'business-object-overview'],
  configOverview: () => ['dashboard', 'config-overview'],
  fileConfigList: () => ['dashboard', 'file-config-list'],
  linkOverview: () => ['dashboard', 'link-overview'],
  recentAuditLogs: () => ['dashboard', 'recent-audit-logs'],
};
