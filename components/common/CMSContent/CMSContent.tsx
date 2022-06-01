import React, { FC, HTMLAttributes } from 'react';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

interface Props extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

const CMSContent: FC<Props> = ({ content, ...props }) => {
  return <div {...props} dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />;
};

export default CMSContent;
