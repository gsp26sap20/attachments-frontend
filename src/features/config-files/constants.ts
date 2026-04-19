export const API = {
  endpoint: '/AttCfg',
};

export const MUTATION_API = {
  create: '/AttCfg',
  update: (fileExt: string) => `/AttCfg(FileExt='${fileExt}')`,
  enable: (fileExt: string) => `/AttCfg(FileExt='${fileExt}')/com.sap.gateway.srvd.zui_att_cfg.v0001.enable`,
  disable: (fileExt: string) => `/AttCfg(FileExt='${fileExt}')/com.sap.gateway.srvd.zui_att_cfg.v0001.disable`,
};
