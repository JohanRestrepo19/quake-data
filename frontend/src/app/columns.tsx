"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Feature } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";
import Link from "next/link";

const Header = ({ title }: { title: string }) => {
  return <div className="text-center">{title}</div>;
};

export const columns: ColumnDef<Feature>[] = [
  { accessorKey: "external_id", header: () => <Header title="External id" /> },
  { accessorKey: "title", header: () => <Header title="Title" /> },
  { accessorKey: "place", header: () => <Header title="Place" /> },
  { accessorKey: "magnitude", header: () => <Header title="Magnitude" /> },
  { accessorKey: "mag_type", header: () => <Header title="Magnitude Type" /> },
  { accessorKey: "tsunami", header: () => <Header title="Tsunami" /> },
  { accessorKey: "time", header: () => <Header title="Time" /> },
  // TODO: Pending to show coordinates.
  {
    accessorKey: "longitude",
    header: () => <Header title="Longitude" />,
    cell: ({ row }) => row.original.coordinates.longitude,
  },
  {
    accessorKey: "latitude",
    header: () => <Header title="Latitude" />,
    cell: ({ row }) => row.original.coordinates.latitude,
  },

  {
    header: () => <Header title="Actions" />,
    id: "actions",
    cell: ({ row }) => {
      const feature = row.original;
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <ListCollapse className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(feature.external_id)
                }
              >
                Copy feature external id
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={feature.external_url} target="_blank">
                  View external information
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={`/features/${feature.id}`}>
                  View feature information
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
