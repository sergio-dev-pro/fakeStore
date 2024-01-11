import * as NextLink from "next/link";
import React, { ReactNode } from "react";
import './link.scss'

type Props = {
  href: string;
  children: ReactNode;
};

export const Link = ({ href, children }: Props) => {
  return <NextLink.default href={href}>{children}</NextLink.default>;
};
