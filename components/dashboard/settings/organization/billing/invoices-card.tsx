import * as React from 'react';

import { InvoiceList } from '@/components/dashboard/settings/organization/billing/invoice-list';
import { Card, CardContent, type CardProps } from '@/components/ui/card';
import { EmptyText } from '@/components/ui/empty-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { InvoiceDto } from '@/types/dtos/invoice-dto';

export type InvoicesCardProps = CardProps & {
  invoices: InvoiceDto[];
};

export function InvoicesCard({
  invoices,
  className,
  ...other
}: InvoicesCardProps): React.JSX.Element {
  return (
    <Card
      className={cn('flex h-full flex-col', className)}
      {...other}
    >
      <CardContent className="max-h-72 flex-1 overflow-hidden p-0">
        {invoices.length > 0 ? (
          <ScrollArea className="h-full">
            <InvoiceList invoices={invoices} />
          </ScrollArea>
        ) : (
          <EmptyText className="p-6">No invoices received yet.</EmptyText>
        )}
      </CardContent>
    </Card>
  );
}
