export type ToolBarClassNames = {
  count?: string;
  close?: string;
  rotate?: string;
  zoom_in?: string;
  zoom_out?: string;
  nav_next?: string;
  download?: string;
  nav_prev?: string;
  thumbnail?: string;
  fullscreen?: string;
  time_update?: string;
  thumbnail_slider?: string;
};
export type ToolBarOptions = {
  nav?: boolean;
  zoom?: boolean;
  count?: boolean;
  close?: boolean;
  rotate?: boolean;
  download?: boolean;
  thumbnail?: boolean;
  fullscreen?: boolean;
  classNames?: ToolBarClassNames;
  time_update?: boolean;
};
