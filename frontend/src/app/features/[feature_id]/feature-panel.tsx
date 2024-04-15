"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchFeatureByIdWithComments, postCommnet } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  feature_id: string;
};

export default function FeaturePanel({ feature_id }: Props) {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const featureQuery = useQuery({
    queryKey: ["feature", feature_id],
    queryFn: () => fetchFeatureByIdWithComments(feature_id),
  });

  const commentMutation = useMutation({
    mutationFn: () => postCommnet(feature_id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature", feature_id] });
      setComment('');
    },
  });

  function handleSubmitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (comment.length < 10) return;
    commentMutation.mutate();
  }

  return (
    <div>
      {featureQuery.isLoading ? (
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-4">
          <Skeleton className="w-96 h-80" />
          <Skeleton className="w-96 h-80" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-4">
          {/*Feature Info*/}
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle>Feature {featureQuery.data?.feature.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="font-semibold">Title: </label>
                <span>{featureQuery.data?.feature.title}</span>
              </div>
              <div>
                <label className="font-semibold">Magnitud: </label>
                <span>{featureQuery.data?.feature.magnitude}</span>
              </div>
              <div>
                <label className="font-semibold">Magnitud type: </label>
                <span>{featureQuery.data?.feature.mag_type}</span>
              </div>
              <div>
                <label className="font-semibold">Place: </label>
                <span>{featureQuery.data?.feature.place}</span>
              </div>
              <div>
                <label className="font-semibold">Tsunami: </label>
                <span>
                  {featureQuery.data?.feature.tsunami
                    ? "With tsunami"
                    : "No tsunami"}
                </span>
              </div>
              <div>
                <label className="font-semibold">Longitude: </label>
                <span>{featureQuery.data?.feature.coordinates.longitude}</span>
              </div>
              <div>
                <label className="font-semibold">Latitude: </label>
                <span>{featureQuery.data?.feature.coordinates.latitude}</span>
              </div>
            </CardContent>
            <CardFooter>
              <form
                className="flex w-full max-w-sm items-center space-x-2"
                onSubmit={handleSubmitComment}
              >
                <Input
                  type="text"
                  placeholder="New Comment"
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <Button type="submit" disabled={comment.length < 10}>
                  Submit
                </Button>
              </form>
            </CardFooter>
          </Card>

          {/*Feature comments*/}
          <Card className="w-96 h-80 overflow-y-auto">
            <CardHeader>
              <CardTitle>Feature Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-item">
                {featureQuery.data?.featureComments.length === 0 ? (
                  <div>No comments yet.</div>
                ) : (
                  featureQuery.data?.featureComments.map((comment) => (
                    <li key={comment.id} className="pb-2">
                      <div className="flex gap-x-1">
                        <ChevronRight />
                        <span>{comment.body}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="pt-4 flex justify-center items-center">
        <Button variant={"secondary"}>
          <Link href="/">Go back</Link>
        </Button>
      </div>
    </div>
  );
}
