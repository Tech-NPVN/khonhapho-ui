export type ToolBarClassNames = {
  nav_next?: string;
  nav_prev?: string;
  zoom_in?: string;
  zoom_out?: string;
  count?: string;
  close?: string;
  rotate?: string;
  download?: string;
  thumbnail?: string;
  thumbnail_slider?: string;
  fullscreen?: string;
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
};
