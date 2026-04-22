import * as React from 'react';
import { cn } from '@/libs/utils';
import { Link } from 'react-router';
import { Link as UI5Link } from '@ui5/webcomponents-react/Link';
import { formatShortId, normalizeUuid } from '@/libs/helpers/id';

type EntityType = 'attachment' | 'business-object';

type EscapedEntityLinkTextProps = {
  text?: string | null;
  className?: string;
  fallback?: React.ReactNode;
  shortIdLength?: number;
};

type TokenMatch = {
  type: EntityType;
  id: string;
  raw: string;
  start: number;
  end: number;
};

const ATTACHMENT_TOKEN_REGEX = /\$\\([0-9a-fA-F-]+)\$\\/;
const BO_TOKEN_REGEX = /\\\$([0-9a-fA-F-]+)\\\$/;

function buildEntityLink(entityType: EntityType, id: string, shortIdLength: number) {
  const normalizedId = normalizeUuid(id);

  if (!normalizedId) {
    return id;
  }

  const to = entityType === 'attachment' ? `/attachments/${normalizedId}` : `/business-objects/${normalizedId}`;

  return (
    <Link key={`${entityType}-${normalizedId}`} to={to}>
      <UI5Link title={normalizedId}>
        {formatShortId(normalizedId, { head: 4, tail: shortIdLength }).toLowerCase()}
      </UI5Link>
    </Link>
  );
}

function findToken(text: string, type: EntityType, regex: RegExp): TokenMatch | null {
  const match = text.match(regex);

  if (!match || match.index === undefined) {
    return null;
  }

  return {
    type,
    id: match[1],
    raw: match[0],
    start: match.index,
    end: match.index + match[0].length,
  };
}

export function EscapedEntityLinkText({
  text,
  className,
  fallback = '-',
  shortIdLength = 8,
}: EscapedEntityLinkTextProps) {
  const content = React.useMemo(() => {
    if (!text) {
      return [fallback];
    }

    const matches = [
      findToken(text, 'attachment', ATTACHMENT_TOKEN_REGEX),
      findToken(text, 'business-object', BO_TOKEN_REGEX),
    ]
      .filter((match): match is TokenMatch => !!match)
      .sort((left, right) => left.start - right.start);

    if (matches.length === 0) {
      return [text];
    }

    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    for (const match of matches) {
      if (match.start > cursor) {
        nodes.push(text.slice(cursor, match.start));
      }

      if (normalizeUuid(match.id)) {
        nodes.push(buildEntityLink(match.type, match.id, shortIdLength));
      } else {
        nodes.push(match.raw);
      }

      cursor = match.end;
    }

    if (cursor < text.length) {
      nodes.push(text.slice(cursor));
    }

    return nodes;
  }, [fallback, shortIdLength, text]);

  return (
    <span className={cn('inline whitespace-pre-wrap wrap-break-word', className)}>
      {content.map((node, index) => (
        <React.Fragment key={typeof node === 'string' ? `${index}-${node}` : index}>{node}</React.Fragment>
      ))}
    </span>
  );
}
